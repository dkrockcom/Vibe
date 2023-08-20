import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import api from '../../util/api';

class SmartSensors extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name', selector: row => row.Name },
            { key: 'MacAddress', name: 'Mac Address', selector: row => row.MacAddress },
            { key: 'Location', name: 'Location', selector: row => row.Location }
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

    onRowClick = (row) => {
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

export default SmartSensors;
