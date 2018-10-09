const express = require('express');
const path = require('path');
const router = express.Router();



router.get('/css/:dir', (request, response)=>{
    try{
        response.sendFile(path.join(__dirname,"../public", "build","static","css",request.params.dir));
        
    }
    catch (err){        
        console.log(err);
        response.writeHead(404,"Not found");
        response.end();
    }
});

router.get('/js/:dir', (request, response)=>{
    try{
        response.sendFile(path.join(__dirname,"../public", "build","static","js",request.params.dir));
        
    }
    catch (err){
        console.log(err);
        response.writeHead(404,"Not found");
        response.end();
    }
});

module.exports = router;
