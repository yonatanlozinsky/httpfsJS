const express = require('express');
const path = require('path');
const router = express.router();



router.get('/static/css/:dir', (request, response)=>{
    try{
        console.log("got into");
        const pt = path.join(__dirname,"public", "build","static","css",request.params.dir);
        console.log(pt);
        response.sendFile(path.join(__dirname,"public", "build","static","css",request.params.dir));
        
    }
    catch (err){        
        console.log(err);
        response.writeHead(404,"Not found");
        response.end();
    }
});

router.get('/static/js/:dir', (request, response)=>{
    try{
        console.log("got into");
        const pt = path.join(__dirname,"public", "build","static","js",request.params.dir);
        console.log(pt);
        response.sendFile(path.join(__dirname,"public", "build","static","js",request.params.dir));
        
    }
    catch (err){
        console.log(err);
        response.writeHead(404,"Not found");
        response.end();
    }
});

module.exports = router;
