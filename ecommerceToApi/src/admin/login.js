import agent from "../entities/agent.js";
import {BASE_URL} from "../config.js";

const form = document.querySelector('.form');
const notify = document.querySelector('.notify');

const agentObj = new agent();
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let inpmail = document.querySelector("[name=mail]").value; 
    let inpword = document.querySelector("[name=pass]").value;
    let agent = await agentObj.login(inpmail,inpword);
     if (agent==false) {
         notify.innerHTML = "Mot de passe ou E-mail incorrecte";
     }else{
        localStorage.setItem("agent",JSON.stringify(agent));
        window.location = BASE_URL+"admin/dashboard.html";
    }
})