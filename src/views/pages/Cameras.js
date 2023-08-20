import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import api from './../../util/api';

class Cameras extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name', selector: row => row.Name },
            { key: 'Ip', name: 'Ip', selector: row => row.Ip },
            { key: 'Port', name: 'Port', selector: row => row.Port },
            { key: 'Brand', name: 'Brand', selector: row => row.Brand },
            { key: 'Connected', name: 'Connected', selector: row => row.Connected },
            { key: 'IsDetectionEnabled', name: 'Detection Enabled', selector: row => row.IsDetectionEnabled },
            { key: 'IsRecordingEnabled', name: 'Recording Enabled', selector: row => row.IsRecordingEnabled }
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

    onRowClick = (row) => {
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
                    <DataTable
                        onRowClicked={this.onRowClick}
                        columns={columns}
                        data={rows}
                    />
                </CardBody>
            </Card>
        )
    }
}

export default Cameras;
