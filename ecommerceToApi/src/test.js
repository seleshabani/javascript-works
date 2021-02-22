const btn = document.querySelector("button");

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    const inp = document.querySelector("[type=file]");
    const form = document.querySelector("[data_form]");
    const id = document.querySelector("[name=id_produit_id]");
    const label = document.querySelector("[name=label]");
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ()=>{
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                console.log(JSON.parse(xhr.responseText));
            }else{
                console.log(xhr);
            }
        }
    }
    let fd = new FormData(form);

    //fd.append('file',inp);
     //fd.append("label",label.value);
    // fd.append("location","biscuit");
     //fd.append("id_produit_id",id.value);

    xhr.open("POST","http://localhost:8000/api/images",true);
    xhr.send(fd);


})