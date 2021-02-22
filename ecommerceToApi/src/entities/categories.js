import {ROOT_URL,get} from "../config.js";

class categories
{
    RessourceUrl;
    constructor()
    {
        this.RessourceUrl = ROOT_URL + "categories";
    }
    async getAll(){
        let resultats = await get(this.RessourceUrl);
        return resultats["hydra:member"];
    }

}
export default categories;