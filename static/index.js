const form = document.querySelector("form"),
    fileInputElement = document.querySelector('#fileInput'),
    submitEvent = new Event("submit");


// fileInputElement.addEventListener("change",event=>{

//     const fileReader = new FileReader();
//     fileReader.readAsText(fileInputElement.files[0]); //Add multiple file support later

//     let dataFromFile="";
//     fileReader.onload=()=>{
//         dataFromFile=fileReader.result;
        
//         postFetchResponse = fetch("http://localhost/upload",
//         {
//             "method":"POST",
//             "headers":{
//                 "Content-Type":"text/plain"
//             },
//             body:dataFromFile
//             });


//     };

//     event.preventDefault();
// });

// form.addEventListener("submit",event=>{
//     const fileReader = new FileReader();
//     event.target.files[0].
// })


