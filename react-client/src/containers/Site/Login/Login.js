import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';


class Login extends Component {

    state = {
        username:'',
        password:'',
        submitted:false,
        errors:''
    }

    handleSubmit = (event) => {

        let postData = {
            username: this.state.username,
            password: this.state.password,
        }

        this.setState({submitted:true});

        axios.post('/users/login', postData)
        .then(response=>{
            if (response.status === 200){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user._id);
                localStorage.setItem("userName", response.data.user.username);
                this.props.loadUser();
            }

        })
        .catch(err=>{
            if (err.response.status === 401){
                this.setState({errors:"Incorrect username or password!"})
            }
            else{
                this.setState({errors:"Something went wrong..."})

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


    shouldComponentUpdate(){
        return this.state.submitted;
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table className="login-tbl">
                    <tbody>
                        <tr>
                            <th>
                                Username:
                            </th>
                            <td>
                                <input type="text" className="signin-input" onChange={this.handleUsernameChange} name="username"/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Password:
                            </th>
                            <td>
                                <input type="password" className="signin-input" onChange={this.handlePasswordChange} name="password"/>
                            </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <input type="submit" className="submit-btn" value="Submit"></input>
                                </td>
                            </tr>
                      
                        </tbody>
                        <div className="error-div">{this.state.errors}</div>

                    </table>
                    



                </form>
            </div>
        );
    }
}

export default Login;
