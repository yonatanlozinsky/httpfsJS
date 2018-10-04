import React, {Component} from 'react';
import axios from 'axios';


class Upload extends Component{

    state={
        file: '',
        description: ''

    }

    fileInputChangedHandler = (event) =>{
        this.setState({file: event.target.files[0]});
        console.log(this.state.file.toString());
    }

    render(){

        return (
            <div className="upload-form">

                <form onSubmit={this.submitFilesHandler}>
                    <table>
                    <tbody>
                        <tr><th>File:</th>
                        <td><input type="file" onChange={this.fileInputChangedHandler}></input></td></tr>
                        <tr><th>Description:</th><td><input type="text" onChange={this.descriptionChangedHandler}></input></td></tr>
                        <tr><td><input type="submit" value="Upload!"></input></td></tr>
                    </tbody>
                    </table>
                </form>

            </div>

        );
    }
}


export default Upload;