import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import DataGrid from 'react-data-grid';
import api from '../../util/api';

class SmartSensors extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name' },
            { key: 'MacAddress', name: 'Mac Address' },
            { key: 'Location', name: 'Location' },
        ],

        rows: [

        ]
    }

    componentDidMount() {
        api.post("/SmartSensors", {}, (res) => {
            if (res.success) {
                this.setState({ rows: res.data })
            }
        });
    }

    onRowClick = (index, row) => {
        this.props.history.push(`/SmartSensor/${row.Id}`);
    }

    onAdd = () => {
        this.props.history.push(`/SmartSensor/0`);
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

export default SmartSensors;
