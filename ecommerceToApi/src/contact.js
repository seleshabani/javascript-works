import messages from "./entities/messages.js";
import {LOADER} from "./config.js";

const form = document.querySelector('.form');
const msgObj = new messages();
const overlay = document.querySelector(".overlay");

form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    overlay.innerHTML = LOADER;
    overlay.style.display = "flex";
    let inptnom = document.querySelector('[data-nom]').value;
    let inptel = document.querySelector('[data-tel]').value;
    let inptcontent = document.querySelector('[data-content]').value;
    let message = {
        "nomExpediteur":inptnom,
        "expTelephone":inptel,
        "content":inptcontent
    }
    let resultat = await msgObj.send(message);
    overlay.style.display = "none";
    // console.log(resultat);
})