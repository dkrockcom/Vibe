import React, { Component } from 'react';
import {
    Row, Col,
} from 'reactstrap';
import FLVPlayer from './../../common/FLVPlayer';
import api from '../../util/api';

const cameraScreenMinHeight = 200;

class Video extends Component {
    state = {
        height: 0,
        camLayoutCal: { layout: '3x4', col: '3', row: 3 },
        camData: []
    }

    componentDidMount() {
        let page = document.getElementById("page-content");
        this.setState({ height: page.clientHeight - this.headerFooterHeight });
        api.post("/cameras", {}, (res) => {
            if (res.success) {
                const { camData } = this.state;
                if (camData.length === 0) {
                    this.setState({ camData: res.data })
                }
            }
        });
    }

    get headerFooterHeight() {
        let footer = document.getElementsByClassName("app-footer")[0];
        let header = document.getElementsByClassName("app-header")[0];
        if (!footer && !header) {
            return 0;
        }
        return footer.clientHeight + header.clientHeight;
    }

    getCameraView = (item, index, options) => {
        let { camLayoutCal, height } = this.state;
        let minHeight = height,
            rowValue = null,
            winHeight = (window.innerHeight - this.headerFooterHeight), camHeight = '';
        switch (camLayoutCal.row) {
            case 1:
                rowValue = "site-video-row-one";
                height = winHeight;
                break;
            case 2:
                rowValue = "site-video-row-two";
                height = (winHeight / 2) - 11;

                break;
            case 3:
                rowValue = "site-video-row-three";
                height = 3;
                camHeight = '25.6em';
                break;
            default:
                break;
        }
        camLayoutCal.col = minHeight ? 6 : camLayoutCal.col;
        rowValue = minHeight ? "site-video-row-one" : rowValue;
        let className = ("col-sm-12 col-md-12 " + rowValue);

        let minHeightComp = (height < cameraScreenMinHeight ? cameraScreenMinHeight : height) + "px";
        let styleObj = { minHeight: minHeightComp };

        let url = `${api.baseUrl}:8000/live/${item.Id}.flv`;
        return (
            <Col style={styleObj} className={className}>
                {
                    item.isBlank
                        ?
                        <div style={{ height: camHeight, backgroundColor: "#000", color: "#fff" }}>Camera Not Setup</div> :
                        <FLVPlayer height={camHeight} controls={false} url={url} camId={index} />
                }
            </Col>
        );
    }

    get cameraData() {
        const { camData } = this.state;
        //console.log(camData);
        let data = [...camData];
        let maxLimit = 8;

        if (maxLimit == camData.length) {
            return camData;
        }

        let remaning = maxLimit - camData.length;
        for (let i = 0; i < remaning; i++) {
            data.push({ isBlank: true });
        }
        return data;
    }

    render() {
        // return (
        //     <Card style={{ height: height }}>
        //         <CardBody>
        //             <Row>
        //                 <Col xs="6">
        //                     <FLVPlayer controls={false} url="http://localhost:8000/live/1.flv" camId="1" />
        //                 </Col>
        //                 <Col xs="6">
        //                     <FLVPlayer controls={false} url="http://localhost:8000/live/1.flv" camId="2" />
        //                 </Col>
        //             </Row>
        //         </CardBody>
        //     </Card>
        // )

        return (
            <div className="live-video-screen">
                <Row>
                    {

                        this.cameraData.slice(0, 4).map((ele, index) => {
                            return <div key={index} className={'site-video site-video-padding card-body cam-layout-body'}>
                                {this.getCameraView(ele, index)}
                            </div>
                        })

                    }
                </Row>
                <Row>
                    {

                        this.cameraData.slice(4, 8).map((ele, index) => {
                            return <div key={index} className={'site-video site-video-padding card-body cam-layout-body'}>
                                {this.getCameraView(ele, index)}
                            </div>
                        })

                    }
                </Row>
            </div>
        )
    }
}

export default Video;
