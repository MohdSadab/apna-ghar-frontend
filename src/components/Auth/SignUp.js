import React ,{Component} from 'react';
import { Input } from '../Input/Input';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import  {Redirect} from 'react-router-dom'
class SignUp extends Component{


    state = {
        "firstname": "",
        "lastname": "",
        "email": "",
        "phoneno":"",
        "password": "",
        emailError:false,
        passError:false,
        disable:false,
    }

    inputChangeHandler = async (e) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.name === 'email') {

            this.setState({
                ...this.state,
                [e.target.name]: e.target.value,
                emailError: !re.test(e.target.value),
                disable: !re.test(e.target.value)
            });

        }
        else if (e.target.name === "password") {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value,
                passError: !e.target.value.length > 0,
                disable: !e.target.value.length > 0
            });
        }

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    }

    submitHandler = async (e) => {
        e.preventDefault();


        console.log(this.props,">>>props");
        this.setState({
            ...this.state,
            loading: true
        })

        const { emailError, passError } = this.state;
        const {email,firstname,lastname,password,phoneno}=this.state;
        console.log("state", this.state);
        const data = {
           email,firstname,lastname,password,phoneno
        };
        console.log(data);

        if (!emailError && !passError) {
            axios
                .post("http://localhost:8080/user/signup", data)
                .then(res => {
                    console.log(res, ">>>");
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                    this.props.history.push('/login');
                }
                ).catch(error => console.log(error));
            //  console.log(result);
        }

    }


    render(){


        return(

            <div className="row">
                <div className="col-md-3"/>

                <div className="col-md-6">
                    <div className="card">
                    <div className="card-header">SignUp</div>
                    <div className="card-body">
                    <form>
                        <label htmlFor="firstName" className="mt-2">
                            First Name:
                      </label>
                        <Input
                            type="text"
                            name="firstname"
                            changeHandler={e => this.inputChangeHandler(e)}
                            value={this.state.firstname}
                        />
                        <label htmlFor="lastname" className="mt-2">
                            Last Name:
                      </label>
                        <Input

                            type="text"
                            name="lastname"
                            changeHandler={e => this.inputChangeHandler(e)}
                            value={this.state.lastname}
                        />

                       <label htmlFor="email" className="mt-2">Email:</label>
                        <Input
                            type="email"
                            name="email"
                            changeHandler={e => this.inputChangeHandler(e)}
                            value={this.state.email}
                            emailError={this.state.emailError}
                        />

                        <label htmlFor="phoneno" className="mt-2">
                            Phone No:
                      </label>
                        <Input
                            type="number"
                            name="phoneno"
                            changeHandler={e => this.inputChangeHandler(e)}
                            value={this.state.phoneno}
                        />

                        <label htmlFor="pass" className="mt-2">
                            Password:
                      </label>
                        <Input
                            type="password"
                            name="password"
                            changeHandler={e => this.inputChangeHandler(e)}
                            value={this.state.password}
                        />

                                <Button
                                    type="primary"
                                    className="btn-block mt-2"
                                    size="large"
                                    onClick={this.submitHandler}
                                    loading={this.state.loading}
                                    disabled={this.state.disable}
                                >
                                    Login
                      </Button>

                    </form>
                    </div>
                    </div>

                </div>
            </div>

        )



    }

}

export default SignUp;