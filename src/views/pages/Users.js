import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import api from './../../util/api';
import DataTable from 'react-data-table-component';

class Users extends Component {

    state = {
        columns: [
            { key: 'Name', name: 'Name', selector: row => row.Name, },
            { key: 'Username', name: 'Username', selector: row => row.Username, },
            { key: 'Role', name: 'Role', selector: row => row.Role, },
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

    onRowClick = (row) => {
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

export default Users;
