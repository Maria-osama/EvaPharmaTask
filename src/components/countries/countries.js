import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '../../shared/grid/grid';
import axios from 'axios';

const TOKEN = localStorage.getItem('TOKEN');
const BASE_URL = "https://taskapi2021.azurewebsites.net/api/"


class countries extends Component {

    state = {
        data: []
    }

    componentDidMount = () => {
      
        this.getAllCountries();
    }

    getAllCountries = () => {
        axios.get(BASE_URL + 'country', {
            headers: {
                'authorization': localStorage.getItem('TOKEN')
            }
        })
            .then(res => {

                this.setState({
                    data: res.data
                })

            })
            .catch(error => this.props.history.push("/"))
    }

    onRowClicked = (args) => {

        this.props.history.push(`countries/${args.data.id}`);
    }

    onRowInserted = (args) => {
        axios.post(BASE_URL + 'country', { "Name": args.data.name }, {
            headers: {
                'authorization': TOKEN
            }
        })
            .then(res => {
                this.getAllCountries();
            })

    }

    onEdit = (args) => {
        axios.put(BASE_URL+'country', args.data, {
            headers: {
                'authorization': TOKEN
            }
        })
    }

    onDelete = (args) => {
        axios.delete(BASE_URL+'country/' + args.data.id, {
            headers: {
                'authorization': TOKEN
            }
        })
    }
   

    render() {
        return (
            <div>
                <div className="text-center head">
                    <h3 className="title">Coutries</h3>
                    <Link to="/" className="logout">Logout</Link>
                </div>

                <Grid
                    data={this.state.data}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                    onRowInserted={this.onRowInserted}
                    onRowClicked={this.onRowClicked}
                />
            </div>
        )
    }
}

export default countries;