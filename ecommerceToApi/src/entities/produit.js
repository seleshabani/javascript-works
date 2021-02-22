import {ROOT_URL,IMG_URL,get,post,sup, put} from "../config.js";
class produits
{
    RessourceUrl;
    constructor(){
        this.RessourceUrl = ROOT_URL+"produits";
    }
    async all(){
        let produits = await get(this.RessourceUrl);
        return produits["hydra:member"];
    }
    async byName(nom){
        let produits = await get(this.RessourceUrl+"?nom="+nom)
        return produits["hydra:member"];
    }
    async byId(id){
        let produit = await get(this.RessourceUrl+"/"+id);
        return produit;
    }
    async byCategorie(categorieId){
        let produits = await get(this.RessourceUrl+"/"+categorieId+"/posts");
        return produits["hydra:member"];
    }
    async create(idCategorie,nom){
        let data = {
            "nom": nom,
            "idCategories": idCategorie
          }
          let resultat = await post(this.RessourceUrl,data);
          return resultat;
    }
    async update(idproduit,nom){
        let data = {
            "nom":nom
        }
        let resultat = await put(this.RessourceUrl+"/"+idproduit,data);
        return resultat;
    }
    async delete(id){
        let resultat = sup(this.RessourceUrl+"/"+id);
        return resultat;
    }
    async getTop3() {
        let products = await get(ROOT_URL+"top_produits");
        return products;
    }
    async byUri(uri){
        let item = await get(IMG_URL+uri);
        return item;
    }
    formAdd(categories){
        let selectCategoriesOptions = "";
        categories.forEach(categorie => {
            selectCategoriesOptions += `<option data_select_categorie_option="" value="${categorie["@id"]}">${categorie.nom}</option>`;
        })
        return (
            /*html*/
            `
            <h2>Ajouter un nouveau produit</h2>
             <form enctype="multipart/form-data" class="form" action=""> 
                <div class="form-item"><label for="">nom</label>
                   <input name="nom" class="form-item-input" type="text">
                </div>
                <div class="form-item">
                    <label for="">categorie</label>
                    <select name="categorie" data_select_categorie class="select-input" name="" id="">
                            ${selectCategoriesOptions}
                    </select>
                </div>
                <div class="form-item">
                    <label for="">Prix</label>
                    <input name="prix" class="form-item-input" type="text">
                </div>
                <div class="form-item">
                    <label for="">Stock initial</label>
                    <input name="stockInit" class="form-item-input" type="text">
                </div>
                <div class="form-item">
                    <label for="">Image</label>
                    <input name="file" class="form-item-input" type="file">
                </div>
                <div class="form-item">
                    <button class="form-item-input btn">Envoyer</button>
                </div>
            </form>
        `
        );
    }
    formUpdate(produit){
        return(
            /*html */
            `
            <h2>Vous modifier le produit ${produit.nom}</h2>
            <form data-form-update class="form" action=""> 
                <div class="form-item"><label for="">nom</label>
                   <input name="nom" class="form-item-input" type="text">
                </div>
                <div class="form-item">
                    <label for="">Prix</label>
                    <input name="prix" class="form-item-input" type="text">
                </div>
                <div class="form-item">
                    <button class="form-item-input btn">Envoyer</button>
                </div>
            </form>
            <h2 class="notify"></h2>
            `
        )
    }
    list(produits,search=false){

        let text = "";

        produits.forEach(produit=>{
            text += `<li class="view-list-produits-item">
                        <span>${produit.nom}</span>
                        <i data-btn-update="${produit.id}" class="fa fas fa-pencil"></i>
                    </li>`
        })
        if (search==true) {
           return text;
        }else{
            return(
                /*html*/
                  `
                  <div class="form-item-with-icone searchInput">
                      <input data_search_input type="text" name="" id="" class="form-item-input">
                      <button data_search_button><i class="fa fas fa-search"></i></button>
                  </div>
                  <ul class="view-list-produits">
                      ${text}
                  </ul>
                  `
              );
        }
        
    }
}
export default produits;