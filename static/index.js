const form = document.querySelector("form");
const fileInputElement = document.querySelector('#fileInput');

fileInputElement.addEventListener("change", event=>{
    var reader = new FileReader();
    reader.readAsText(fileInputElement.files[0],'utf-8');
    reader.onloadend = event=>{
        document.querySelector("#preview").textContent = event.target.result;
    }
})
