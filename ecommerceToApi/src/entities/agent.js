import {ROOT_URL,get,post} from "../config.js";

class agent
{
    RessourceUrl;

    constructor(){
        this.RessourceUrl = ROOT_URL+"agents";
    }
    async byMail(mail){
        let resultat = await get(this.RessourceUrl+`?mail=${mail}`);
        if (resultat == '0') {
            return false;
        }else{
            return resultat["hydra:member"];
        }
    }
    async login(mail,password){
        let resultat = await get(this.RessourceUrl+`_login?mail=${mail}&password=${password}`);
        return resultat;
    }
}
export default agent;