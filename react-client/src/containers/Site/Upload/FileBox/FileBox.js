import React from 'react';
import './FileBox.css';

const fileBox = props =>{
    console.log(props);
    return (
        <div className="fileBox">
            <p>{props.fileName.slice(0,20)+"..."}</p>
            <p>{(Math.round((parseFloat(props.size)/1000000)*100)/100).toString()+" MB"}</p>{/* Shows size in MBs with two digits after point*/}
        </div> 

    );
}


export default fileBox;