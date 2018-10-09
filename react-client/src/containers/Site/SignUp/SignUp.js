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
        errors:''
    }

    handleSubmit = event => {

        let postData = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        }

        this.setState({submitted:true});

        axios.post('/users/signup', postData)
        .then(response=>{

            if (response.data.msg === "Success - user created!"){
                this.setState({errors:"Woohoo! user created ^_^"},()=>{setTimeout(()=>window.location.href="/",1000)});
            }
        })
        .catch(err=>{
            if (err.response.status === 409){
                let newErrorsArr = err.response.data.errors.map(error=>error.msg);
                let newErrorsString = newErrorsArr.join("\n");
            this.setState({errors:newErrorsString});
            }
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
        return (this.state.submitted || nextState.errors !== this.state.errors);
    }

    render(){
        return (
            <div className="signup-top-div">
                <form onSubmit={this.handleSubmit}>
                    <table className="signup-tbl">
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
                            <th>

                            </th>
                            <td>
                            <input type="submit" className="submit-btn" value="Submit"></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </form>

                <div className="signup-error-div">{this.state.errors}</div>
            </div>
        );
    }
}

export default SignUp;
