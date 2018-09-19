const fs = require('fs');

// exports.readStaticFile = (path,response) => {
//     return new Promise ((resolve, reject)=>{
//         try{
//             console.log(path);
//             console.log("promise");
//             const fileStreamer = fs.createReadStream(path);
//             fileStreamer.pipe(response);
//             resolve(true);
//         }

//         catch (err) {
//             console.log(path);
//             reject(err);}

//     })
// }

exports.readStaticFile = path => {
    return new Promise ((resolve, reject)=>{
        try{
            console.log("fstat:"+fs.statSync(path));
            const fileStreamer = fs.createReadStream(path);
            let fileData="";
            fileStreamer.on("data", chunk=>{ fileData+=chunk;});
            fileStreamer.on("end",()=>resolve(fileData));}

        catch (err) {
            reject(err);}

    })
};

