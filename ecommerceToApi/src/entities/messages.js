import {ROOT_URL,get,post} from "../config.js";

class messages
{
    RessourceUrl;
    constructor()
    {
        this.RessourceUrl = ROOT_URL+"messages";
    }
    async send(data){
        let resultat = await post(this.RessourceUrl,data);
        return resultat;
    }
    async all(){
        let resultats = await get(this.RessourceUrl);
        return resultats["hydra:member"];
    }
    async byId(id){
        let resultat = await get(this.RessourceUrl+`/${id}`);
        return resultat;
    }
}
export default messages;