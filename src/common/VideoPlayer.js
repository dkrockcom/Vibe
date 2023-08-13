import React, { PureComponent } from 'react';
import { ReactFlvPlayer } from 'react-flv-player'

// const loader = require('./../../assets/img/loader.gif');
class VideoPlayer extends PureComponent {
    handleError(err) {
        console.log(err);
    }
    render() {
        const { camId, url } = this.props;
        return (
            <ReactFlvPlayer
                type="flv"
                id={`video-${camId}`}
                url={url}
                heigh="800px"
                width="800px"
                isLive={true}
                isMuted={true}
                handleError={(err) => {
                    switch (err) {
                        case 'NetworkError':
                            // todo
                            console.log('network error');
                            break;
                        case 'MediaError':
                            console.log('network error');
                            break;
                        default:
                            console.log('other error');
                    }
                }}
            />
        )
    }
}
export default VideoPlayer;