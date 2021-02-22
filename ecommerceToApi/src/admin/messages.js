import messages from "../entities/messages.js";
import {LOADER} from "../config.js";

const btnlist = document.querySelector("[data-messages-list]");
const overlay = document.querySelector('.overlay');
const viewZone = document.querySelector('#view');
const singleMsgZone = document.querySelector('#single-msg-zone');
const msgObj = new messages();

btnlist.addEventListener("click",async (e)=>{
    overlay.innerHTML = LOADER;
    overlay.style.display = "flex";
    let messges = await msgObj.all();
    viewZone.innerHTML = templateListMessage(messges)
    btnViewMsgListener();
    overlay.style.display = "none";
});

const btnViewMsgListener = ()=>{
    const btns = document.querySelectorAll('[data-message-item]');
    btns.forEach(btn=>{
        btn.addEventListener('click',async (e)=>{
            let id = e.currentTarget.attributes[0].value;
            overlay.style.display = "flex";
            let message = await msgObj.byId(id);
            singleMsgZone.innerHTML = templateSingleMessage(message);
            overlay.style.display = "none";
            // console.log(message);
        })
    })
}

const templateListMessage = (messages)=>{
    let text = '';
    messages.forEach(message=>{
        text += 
        /*html*/
        `<li data-message-item="${message.id}"><span>${message.expTelephone}</span><button class="form-item-input btn">lire</button></li>`;
    });
    return (
        /*html*/
        `<ul class="message-item">
            ${text}
        </ul>
        `
    );
}

const templateSingleMessage = (message)=>{
    return(
       /*html*/
        `<div class="single-msg">
            <h2>${message.expTelephone} | ${message.nomExpediteur}</h2>
            <p>${message.content}</p>
        </div>`
    );
}