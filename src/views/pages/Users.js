import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import DataGrid from 'react-data-grid';
import api from './../../util/api';

class Users extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name' },
            { key: 'Username', name: 'Username' },
            { key: 'Role', name: 'Role' },
        ],

        rows: [

        ]
    }

    componentDidMount() {
        api.post("/users", {}, (res) => {
            if (res.success) {
                this.setState({ rows: res.data })
            }
        });
    }

    onRowClick = (index, row) => {
        this.props.history.push(`/user/${row.Id}`);
    }

    onAdd = () => {
        this.props.history.push(`/user/0`);
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

export default Users;
