const fs = require('fs');


/**
Reads file with a streamer, pipes chunks to response param.
@param path {string} the full file path to read from
@param response {ServerResponse} the response object from the http-server to pipe chunks to.
@return void
*/
exports.readStaticFile = (path,response) => {
        try{
            console.log(path);
            console.log("promise");
            console.log("fstat:"+fs.statSync(path));
            const fileStreamer = fs.createReadStream(path);
            fileStreamer.pipe(response);
        }

        catch (err) {
            console.log(path);

    
}
}


//The code below uses stream with promises, but I later found out that streaming is async,
//even if it doesn't take a callback.


// exports.readStaticFile = path => {
//     return new Promise ((resolve, reject)=>{ //promised
//         try{
//             console.log("fstat:"+fs.statSync(path));
//             const fileStreamer = fs.createReadStream(path);
//             let fileData="";
//             fileStreamer.on("data", chunk=>{ fileData+=chunk;});
//             fileStreamer.on("end",()=>resolve(fileData));}

//         catch (err) {
//             reject(err);}

//     })
// };

