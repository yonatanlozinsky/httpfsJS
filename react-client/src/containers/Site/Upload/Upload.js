import React, {Component} from 'react';
import './Upload.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import FileBox from './FileBox/FileBox';

class Upload extends Component{

    state={
        files: [],
        description: ''
        }

    descriptionChangedHandler = event =>{
        this.setState({description:event.target.value});
    }

    submitFilesHandler = event =>{

        event.preventDefault();

        let headers = {
           "Type": "formData",
           'Authorization' : this.props.tokenProp,
           "UploadDescription": this.state.description
        }

        let formData = new FormData();
        console.log("[Files]:",this.state.files);
        this.state.files.forEach(file=>{
            formData.append("files",file);
        })
        console.log("[Before post form data]", formData.getAll("files"));
        axios.post('http://localhost/files/upload', formData, {headers:headers})
        .then(response=>{
            console.log(response);
        })
        .catch(err=>{
            console.log("[Logout]",err);
            this.props.logout();
        })

    }


    onDrop = files=>{
        let tempFiles = this.state.files.slice();
        tempFiles.push(files);
        console.log(this.state.files);
        console.log(tempFiles)
        this.setState({files:files});


    }

    fileInputChangedHandler = (event) =>{
        this.setState({files: event.target.files});
        console.log(this.state.file.toString());
    }

    render(){

        return (
            <div className="upload-form">

                <form onSubmit={this.submitFilesHandler} encType="multipart/form-data">
                    <table className="upload-tbl">
                    <tbody>
                        <tr><th>File:</th>
                        <td>
                            <Dropzone onDrop={this.onDrop.bind(this)}>
                            {this.state.files.length===0?(
                                <p>Try dropping some files here, or click to select files to upload.</p>
                            )
                                :(<div>
                                    {
                                    this.state.files.map(f => <FileBox
                                        key={f.name}
                                        fileName={f.name}
                                        size={f.size}
                                        />)
                                    }
                                </div>)}

                            </Dropzone>
                            
                            </td></tr>
                        <tr><th>Description:</th><td><input type="text" onChange={this.descriptionChangedHandler}></input></td></tr>
                        <tr><th></th><td><input type="submit" value="Upload!"></input></td></tr>
                    </tbody>
                    </table>
                </form>

            </div>

        );
    }
}


export default Upload;