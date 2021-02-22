import {ROOT_URL,get,put} from "../config.js";
class panier 
{
    RessourceUrl;
    constructor(){
        this.RessourceUrl = ROOT_URL+"paniers";
    }
    async getValide(){
        let resultats = await get(this.RessourceUrl+"_valide");
        return resultats["hydra:member"];
    }
    /**
     * 
     * @param {number} idPanier 
     * @param {number} idAgent
     */
    async setValide(idPanier,idAgent){
        let dte = new Date(Date.now());
        dte = dte.toDateString();
        let panier = {
            "idAgent":idAgent,
            "valide":true,
            "dateValidation":dte
        };
        let resultat = await put(this.RessourceUrl+`/${idPanier}`,panier);
        if (resultat.id !== null) {
            return true;
        }
    }
    async getInvalide(){
        let resultats = await get(this.RessourceUrl+"_invalide");
        return resultats["hydra:member"];
    }
    async getTotalventes(){
        let resultats = await get(this.RessourceUrl+"_totalVentes");
        return resultats;
    }
    /**
     * 
     * @param {string} secret 
     * @param {string} tel 
     * @param {boolean} valide
     */
    async bySecretAndUser(secret,tel,valide){
        let resultat = await get(this.RessourceUrl+"/tel/secret"+"?secret="+secret+"&tel="+tel+"&valide="+valide);
        if (resultat == "false") {
            return false;
        }else{
            return resultat["hydra:member"][0];
        }
    }
}
export default panier;