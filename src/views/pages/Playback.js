import React, { Component } from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import api from '../../util/api';
import { connect } from 'react-redux';
// import swal from 'sweetalert';
import FLVPlayer from '../../common/FLVPlayer';
import moment from 'moment';
import { cameraRecord, selectedCamera as selectCamera } from './../../redux/actions'

class Playback extends Component {

    constructor(props) {
        super(props);

        this.groups = new window.vis.DataSet();
        this.groups.add({ id: 1, content: "" }) // Bookmark Panel
        this.groups.add({ id: 0, content: "" }) // Video panel

        this.visOptions = Object.assign({ // create time line config
            stack: false,
            groupOrder: 'content',
            orientation: 'top',
            autoResize: true,
            tooltip: {
                followMouse: true,
                overflowMethod: 'flip'
            },
            // template: function (item, element, data) { // Show bookmark template like green box
            //     if (item && item.bookmark && !(Object.keys(item.bookmark).length === 0) && item.bookmark.constructor === Object && item.bookmark.bookmarkName) {
            //         return '<div class="bookmark"><i class="fa fa-bookmark"></i></div>';
            //     }
            //     else {
            //         return `<div></div>`;
            //     }
            // }
        }, {});
    }
    state = {
        camData: [],
        streamId: 0,
        camId: 1,
        timelineData: [],
        videoUrl: null,
        requestId: Date.now()
    }

    get headerFooterHeight() {
        let footer = document.getElementsByClassName("app-footer")[0];
        let header = document.getElementsByClassName("app-header")[0];
        if (!footer && !header) {
            return 0;
        }
        return footer.clientHeight + header.clientHeight;
    }

    componentWillUnmount() {
        const { requestId } = this.state;
        api.post("/StopPlayback", {
            requestId: requestId
        });
    }

    componentDidMount() {
        let page = document.getElementById("page-content");
        let visualization = document.getElementById("visualization");
        this.setState({ height: page.clientHeight - this.headerFooterHeight - visualization.clientHeight });
        api.post("/cameras", {}, (res) => {
            if (res.success) {
                // this.props.dispatch(selectedCamera({ camera: {} }))
                // this.setState({ camData: res.data })
                if (res.data.length > 0) {
                    this.props.dispatch(selectCamera({ camera: { value: res.data[0].Id, label: res.data[0].Name } }))
                    this.props.dispatch(cameraRecord({ camData: res.data }));
                }
            }
        }, this.props.dispatch);
    }

    timelineRequest = () => {
        api.post("/timeline", {
            cameraId: this.state.camId
        }, (res) => {
            if (res.success) {
                // this.setState({ timelineData: res.data });

                let items = res.data.map((e, index) => Object.assign({}, {
                    id: index,
                    group: 1,
                    type: "background",
                }, e));

                let time = items.length > 0 ?
                    moment(items[items.length - 1].start).format("YYYY-MM-DD HH:mm") :
                    moment().format("YYYY-MM-DD HH:mm")
                this.loadTimeline(new window.vis.DataSet(items), res.data, time);
            }
        }, this.props.dispatch);
    }

    componentWillReceiveProps(nextProps) {
        const { selectedCamera } = this.props;
        if (nextProps.selectedCamera !== selectedCamera) {
            const { camera } = nextProps.selectedCamera;
            this.setState({
                camId: camera.value
            }, () => {
                this.timelineRequest();
            })
        }
    }

    loadTimeline = (items, rowData, time) => {
        let container = document.getElementById('visualization');
        if (this.timeline) {
            this.timeline.destroy();
        }
        this.timeline = new window.vis.Timeline(container, items, this.groups, this.visOptions);
        this.timeline.on("click", (props) => {
            const { camId, requestId } = this.state;
            let newRequestId = Date.now();
            let playbackUrl = `${api.baseUrl}/api/playback?requestId=${newRequestId}&cameraId=${camId}&time=${moment(props.time).format("YYYY-MM-DD HH:mm")}&oldRequestId=${requestId}`;
            this.setState({ requestId: newRequestId, videoUrl: playbackUrl });
        });
        // if (!this.timeline) {
        //     this.timeline = new window.vis.Timeline(container, items, this.groups, this.visOptions);
        //     this.timeline.on("click", (props) => {
        //         this.setState({ videoUrl: this.playbackUrl + moment(props.time).format("YYYY-MM-DD HH:mm") });
        //     });
        // } else {
        //     this.timeline.itemsData.remove(this.timeline.itemsData.get());
        //     // this.timeline.setData(items);
        //     this.timeline.itemsData.add(items);
        // }
        // let startTime = moment(time);
        // this.timeline.addCustomTime(startTime, 't1');
        // this.timeline.setCustomTime(startTime, 't1');
        // this.timeline.setCustomTimeMarker(startTime.format('LTS'), 't1');
        this.timeline.moveTo(time);
        this.setState({
            timelineData: rowData,
            videoUrl: this.playbackUrl + time//"2021-05-18 01:40"
        });
    }

    get playbackUrl() {
        const { camId, requestId } = this.state;
        return `${api.baseUrl}/api/playback?requestId=${requestId}&cameraId=${camId}&time=`
    }

    // onSave = (values) => {
    //     api.post("addEditUser", values, (res) => { swal({ text: res.message, icon: res.success ? 'success' : 'error' }); });
    // }

    render() {
        const { height, camId, videoUrl, requestId } = this.state
        return (
            <Row lg="12">
                <Col id="playback-container">
                    <Row lg="12">
                        {/* <Col lg="2">
                            <ListGroup>
                                <ListGroupItem>Cras justo odio</ListGroupItem>
                                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                                <ListGroupItem>Morbi leo risus</ListGroupItem>
                                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            </ListGroup>
                        </Col> */}
                        <Col lg="12" style={{ padding: 0 }}>
                            {videoUrl ? <FLVPlayer requestId={requestId} isTimeline={true} height={height} controls={false} url={videoUrl} camId={camId} /> : <div style={{ backgroundColor: "#000", height: height }} />}
                        </Col>
                    </Row>
                    <Row lg="12">
                        {/* <Col lg="2">

                        </Col> */}
                        <Col lg="12" style={{ padding: 0 }}>
                            <div id="visualization" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

// Playback.defaultProps = {
//     camId: 1
// }

export default connect((state) => {
    return {
        selectedCamera: state.selectedCamera
    }
})(Playback);