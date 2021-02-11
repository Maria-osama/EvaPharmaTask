import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '../../shared/grid/grid';
import axios from 'axios';

const TOKEN = localStorage.getItem('TOKEN');
const BASE_URL = "https://taskapi2021.azurewebsites.net/api/";


class cities extends Component {

    state = {
        data: []
    }
    
    componentDidMount = () => {

        this.getAllCitiesForSelectedCountry();
    }

    getAllCitiesForSelectedCountry = () => {

        var countryId = this.props.match.params.id;
        axios.get(BASE_URL + 'city/getcities/' + countryId, {
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

    onRowInserted = (args) => {

        var countryId = this.props.match.params.id;

        axios.post(BASE_URL + 'city',  {"Name":args.data.name,"CountryId":parseInt(countryId)}, {
            headers: {
                'authorization': TOKEN
            }
        })
            .then(res => {
                this.getAllCitiesForSelectedCountry();
            })

    }

    onDelete = (args) => {
        axios.delete(BASE_URL + 'city/' + args.data.id, {
            headers: {
                'authorization': TOKEN
            }
        })
    }

    onEdit = (args) => {
        axios.put(BASE_URL+'city',  {"Id":args.data.id,"Name":args.data.name,"CountryId":args.data.countryId}, {
            headers: {
                'authorization': TOKEN
            }
        })
    }
    
    onRowClicked = (args) => {
          console.log(args)
    }


    render() {
        return (
            <div>
                <div>
                    <div className="text-center head">

                        <Link to="/countries" className="back">Back to Countries</Link>
                        <h3 className="title">Cities</h3>
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
            </div>
        )
    }
}

export default cities;