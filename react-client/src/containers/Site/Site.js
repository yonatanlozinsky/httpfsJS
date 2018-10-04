import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SignUp from './SignUp/SignUp'
import Login from './Login/Login';
import Upload from './Upload/Upload'
class Site extends Component {
    
    state = {
        user: "sdfsdf"
    }

    noUserRoutes = (
        <div>
            <Route path="/" exact render={()=><Login/>}></Route>
                    <Route path="/signup" exact render={()=><SignUp/>}></Route>

        </div>
    )

    render(){
        return(
        <div>
            <Navbar user={this.state.user}/>
            { (this.state.user) ? (
                <Route path="/" exact render={()=><Upload/>}></Route>)
                :(this.noUserRoutes)
                }
            
            <Route path="/luztapuz" exact render={()=><h1>Luztapuz</h1>}></Route>


    </div>
    );
}


}

export default Site;