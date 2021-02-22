import {ROOT_URL,get,post, put} from "../config.js";
class stock
{
    RessourceUrl;
    constructor(){
        this.RessourceUrl = ROOT_URL+"stocks";
    }
    /**
     * 
     */
    async create(idProduit,prixUnit,stockInit){
        prixUnit = parseInt(prixUnit);
        stockInit = parseInt(stockInit);
        let totalStockInit = prixUnit * stockInit;
        let data = {
            "stockRest": idProduit,
            "prixUnitaire": prixUnit,
            "totalStockInit": totalStockInit,
            "idProduit": "api/produits/"+idProduit,
            "stockInit": stockInit,
            "totalStockRest": totalStockInit
          }
          let resultat = await post(this.RessourceUrl,data);
          return resultat;
    }
    async update(id,idProduit,prix){
        let produit = await this.getForOne(id);
        let stockRest = produit.stockRest * parseInt(prix);
        let data = {
            "prixUnitaire": parseInt(prix),
            "idProduit": "api/produits/"+idProduit,
            "totalStockRest": stockRest
        }
        let resultat = await put(this.RessourceUrl+`/${id}`,data);
        return resultat;
    }
    async getForOne(id){
        let resultat = await get(this.RessourceUrl+`/${id}`);
        return resultat;
    }
    /**
     * Récupère les produits,leurs informations des stocks et leurs images
     */
    async getWithProduct(){
        let resultat = await get(this.RessourceUrl+`_withproducts`);
        return resultat["hydra:member"];
    }
}
export default stock;