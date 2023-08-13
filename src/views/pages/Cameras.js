import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import DataGrid from 'react-data-grid';
import api from './../../util/api';

class Cameras extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name' },
            { key: 'Ip', name: 'Ip' },
            { key: 'Port', name: 'Port' },
            { key: 'Brand', name: 'Brand' },
            { key: 'Connected', name: 'Connected' },
            { key: 'IsDetectionEnabled', name: 'Detection Enabled' },
            { key: 'IsRecordingEnabled', name: 'Recording Enabled' }
        ],
        rows: []
    }

    componentDidMount() {
        api.post("/cameras", {}, (res) => {
            if (res.success) {
                this.setState({ rows: res.data })
            }
        })
    }

    onRowClick = (index, row) => {
        this.props.history.push(`/camera/${row.Id}`);
    }

    onAdd = () => {
        this.props.history.push(`/camera/0`);
    }

    render() {
        const { columns, rows } = this.state;
        return (
            <Card>
                <CardHeader>
                    <Button color="success" onClick={this.onAdd} >Add</Button>
                </CardHeader>
                <CardBody>
                    <DataGrid onRowClick={this.onRowClick} columns={columns} rows={rows} />
                </CardBody>
            </Card>
        )
    }
}

export default Cameras;
