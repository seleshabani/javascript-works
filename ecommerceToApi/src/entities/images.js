import {ROOT_URL,get,post} from "../config.js";
class images
{
    RessourceUrl;
    constructor(){
        this.RessourceUrl = ROOT_URL+"images";
    }
    /**
     * 
     * @param {FormData} form 
     */
    async create(form){
        let resultat = await post(this.RessourceUrl,form,true);
        return resultat;
    }
    /**
     * 
     * @param {Int} id 
     */
    async byId(id){
        let resultat = await get(this.RessourceUrl+"/"+id);
        return resultat;
    }
    async byUri(uri){
        let resultat = await get(this.RessourceUrl+"/"+uri);
        return resultat;
    }
}
export default images;