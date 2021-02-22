import {ROOT_URL,IMG_URL,get,post} from "../config.js";

class itemPanier
{
    constructor(){
        this.RessourceUrl = ROOT_URL+"item_paniers";
    }
    async byUri(uri){
        let item = get(IMG_URL+uri);
        return item;
    }
}
export default itemPanier;