import React from 'react';
import ReactPlayer from 'reactjs-player';
import { connect } from 'react-redux';
import api from './../util/api';

class RefreshSupport extends React.Component {

    constructor(props) {
        super(props);

        this.retryLimit = 3;
        this.retry = 0;
        this.controller = null;
        this.state = {
            isVideoAvailable: false
        }

        this.clearTimeout = null;
        this.timeoutLimit = 10000;
    }

    componentWillUnmount() {
        let { camId, isTimeline } = this.props;
        clearTimeout(this.clearTimeout);
        let player = document.getElementById(`${isTimeline ? 'TIMELINE_PLAYER_' : 'react-flv-'}${camId}`);
        player.src = "";
        player.load();
        this.setState({ isVideoAvailable: false });
    }

    timeout = (ms, promise) => {
        return new Promise((resolve, reject) => {
            this.clearTimeout = setTimeout(() => {
                reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
        });
    }

    request = (nextUrl) => {
        const { isTimeline } = this.props;
        if (isTimeline) {
            this.setState({
                isVideoAvailable: true
            });
            return this._initPlayer();
        }
        let { url } = this.props;
        if (!nextUrl && !url) {
            return;
        }
        this.controller = new AbortController();
        let requestOption = fetch(url || nextUrl, {
            method: 'GET',
            signal: this.controller.signal
        });
        this.timeout(this.timeoutLimit, requestOption).then(this.onSuccess).catch(this.onFail);
    }

    onSuccess = (response) => {
        this.controller.abort();
        if (response.status === 200) {
            this.setState({ isVideoAvailable: true }, () => {
                this._initPlayer();
            });
        } else {
            this.onFail();
        }
    }

    onFail = (err) => {
        this.controller.abort();
        const { url } = this.props;
        console.log(`Reconnecting: ${url}`);
        this.retry++;
        // if (this.retry > this.retryLimit) {
        //     console.log(`Not able to connect with media server, may be link expired`);
        //     return;
        // }
        //this.request();
    }
}

class FLVPlayer extends RefreshSupport {

    constructor(props) {
        super(props);

        this.alreadyclicked = false;
        this.alreadyclickedTimeout = null;
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.tabVisible !== prevProps.tabVisible) {
    //         console.log(this.props.tabVisible);
    //         if (this.props.tabVisible.isVisible) {
    //             console.log("play");
    //         }
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     const { componentKey } = this.props;
    //     if (nextProps.timelinePlayer !== this.props.timelinePlayer) {
    //         const { isPlay } = nextProps.timelinePlayer;
    //         let player = window.document.getElementById(`react-flv-${componentKey}`);
    //         if (isPlay) {
    //             player.pause();
    //         } else {
    //             player.play().then((res) => {
    //                 //DO Nothing
    //             }).catch(err => {
    //                 console.log("LIVE FEED ERROR: ", err);
    //             });
    //         }

    //         console.log("VIDEO PLAYER PAUSED: " + player.paused);
    //     }
    // }

    componentDidMount() {
        this.request();
        // setTimeout(() => {
        //     this.setState({ val: 11 })
        // }, 2000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url) {
            this.request(nextProps.url);
        }
        if (this.props.tabVisible !== nextProps.tabVisible) {
            if (nextProps.tabVisible.isVisible) {
                this.setState({ isVideoAvailable: false }, this.request);
            } else {
                const { requestId, isTimeline } = nextProps;
                if (isTimeline) {
                    api.post("/StopPlayback", {
                        requestId: requestId
                    });
                }
            }
        }
    }

    _initPlayer() {
        let { is360, camId, isTimeline, onTimeUpdate, onToggle, url } = this.props;
        let player = document.getElementById(`${isTimeline ? 'TIMELINE_PLAYER_' : 'react-flv-'}${camId}`);
        if (is360) {
            var flvPlayer = window.videojs(player, {}, function () { });
            flvPlayer.panorama({
                clickAndDrag: true,
                autoMobileOrientation: true,
                maxLat: -10,
                initLat: -10,
                rotateX: -Math.PI,
                videoType: 'fisheye',
                MouseEnable: true,
            });
        }
        if (onTimeUpdate) {
            player.ontimeupdate = onTimeUpdate;
        }
        if (onToggle) {
            player.onplay = onToggle;
            player.onpause = onToggle;
            player.onclick = (e) => {
                if (e.target.paused) {
                    e.target.play().then(res => {
                        //Playing
                    }).catch(err => {
                        console.log('Not Able to play');
                    })
                } else {
                    e.target.pause();
                }
            }
        }
        if (url) {
            player.onerror = () => {
                console.log('Failed to load video try to forceUpdate the component and restart the video');
                this._initPlayer();
            }
        }
    }

    onVideoClick = (e) => {
        const { isTimeline } = this.props;
        if (!isTimeline) {
            if (this.alreadyclicked) {
                // double
                this.alreadyclicked = false;
                this.alreadyclickedTimeout && clearTimeout(this.alreadyclickedTimeout);
                if (this.onDoubleClick) {
                    this.onDoubleClick(e)
                }
                this.fullScreen();
            } else {
                // single
                if (this.onClick) {
                    this.onClick(e);
                }
                this.alreadyclicked = true;
                this.alreadyclickedTimeout = setTimeout(() => {
                    this.alreadyclicked = false;
                }, 300);
            }
        }
    }

    get player() {
        const { isTimeline, camId } = this.props;
        return document.getElementById(`${isTimeline ? 'TIMELINE_PLAYER_' : 'react-flv-'}${camId}`);
    }

    fullScreen() {
        let elem = this.player;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    render() {
        const { isVideoAvailable } = this.state;
        const { controls, url, camId, isTimeline, height } = this.props;
        return (
            <div style={{ background: "#000", height: height }}>
                {isVideoAvailable ?
                    <div onClick={this.onVideoClick}>
                        <ReactPlayer
                            videoProps={{
                                id: `${isTimeline ? 'TIMELINE_PLAYER_' : 'react-flv-'}${camId}`
                            }}
                            style={{ outerHeight: "100px" }}
                            controls={controls}
                            kernel="flvjs"
                            type="video/x-flv"
                            src={url} //Need to change server url according to multi port
                        >
                        </ReactPlayer>
                    </div> :
                    <video id={`${isTimeline ? 'TIMELINE_PLAYER_' : 'react-flv-'}${camId}`} />
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        // timelinePlayer: state.timelinePlayer,
        tabVisible: state.tabVisible
    };
}
export default connect(mapStateToProps)(FLVPlayer);
