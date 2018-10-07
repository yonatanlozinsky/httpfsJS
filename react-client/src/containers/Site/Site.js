import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SignUp from './SignUp/SignUp'
import Login from './Login/Login';
import Upload from './Upload/Upload'
class Site extends Component {
    
    state = {
        user: localStorage.getItem("userName") || '',
        username: localStorage.getItem("userName") || '',
        userId: localStorage.getItem("userId") || '',
        token: localStorage.getItem("token") || ''
    }

    
    handleLogout = () =>{
        localStorage.clear();
        console.log("[Entered handleLogout]");
        this.setState({user:'', username:'', userId:'', token:''})
    }

    loadUsers = () =>{
        this.setState({
            user: true,
            username: localStorage.getItem("userName"),
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")

        });
    }

    shouldComponentUpdate(){
        console.log("[Entered shouldComponentUpdate]");
        return true;
    }


    noUserRoutes = (
        <div>
            <Route path="/" exact render={()=><Login loadUser={this.loadUsers}/>}></Route>
                    <Route path="/signup" exact render={()=><SignUp/>}></Route>

        </div>
    )


    render(){
        return(
        <div>
            <Navbar user={this.state.username} isUser={this.state.user} logoutHandler={this.handleLogout}/>
            { (this.state.user) ? (
                <Route path="/" exact render={()=><Upload
                    tokenProp={this.state.token}
                    userId={this.state.userId}
                    logout={this.handleLogout}/>}></Route>)
                :(this.noUserRoutes)
                }
            {console.log("[State]",this.state)}

    </div>
    );
}


}

export default Site;