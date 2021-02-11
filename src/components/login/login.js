import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://taskapi2021.azurewebsites.net/api/"
class login extends Component {

    state = {
        controles: {
            email: '',
            password: ''
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControles = {
            ...this.state.controles,
            [controlName]: event.target.value
        }

        this.setState({
            controles: updatedControles
        })
    }

    login = () => {

        let email = this.state.controles.email;
        let password = this.state.controles.password;

        axios.post(BASE_URL+'user/login', {
            "Email": email,
            "Password": password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {

                localStorage.setItem('TOKEN', `Bearer ${res.data.token}`);
                this.props.history.push('countries');

            }).catch( error =>  alert("Email or password is not correct. If you don't have an account please sign up") )
    }

    render() {
        return (
            <div className="login-box">

                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="staticEmail" placeholder="email@example.com"
                            onChange={(e) => this.inputChangeHandler(e, "email")} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                            onChange={(e) => this.inputChangeHandler(e, "password")} />
                    </div>
                </div>

                <button className="btn btn-success" onClick={this.login}>Login</button>

            </div>
        )
    }
}


export default login;