import React, {Component} from 'react';
import './SignUp.css';
import axios from 'axios';


class SignUp extends Component {

    state = {
        username:'',
        password:'',
        password2:'',
        email:'',
        submitted:false,
        errors:[]
    }

    handleSubmit = (event) => {
        console.log(event);

        let postData = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        }

        this.setState({submitted:true});

        axios.post('http://localhost:80/users/signup', postData)
        .then(response=>{
            console.log(response);
        })

        event.preventDefault();
    }

    handleUsernameChange = (event)=>{
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        });
    }

    handlePassword2Change = (event) =>{
        this.setState({
            password2: event.target.value
        });
    }

    handleEmailChange = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.state.submitted || nextState.errors.length > 0);
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table className="tbl">
                    <tbody>
                        <tr>
                            <th>
                                Username:
                            </th>
                            <td>
                                <input type="text" className="signup-input" onChange={this.handleUsernameChange} name="username"/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Password:
                            </th>
                            <td>
                                <input type="password" className="signup-input" onChange={this.handlePasswordChange} name="password"/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Confirm Password:
                            </th>
                            <td>
                                <input type="password" className="signup-input" onChange={this.handlePassword2Change} name="password2"/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Email:
                            </th>
                            <td>
                                <input type="text" className="signup-input" onChange={this.handleEmailChange} name="email"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="submit" className="submit-btn" value="Submit"></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </form>
            </div>
        );
    }
}

export default SignUp;
