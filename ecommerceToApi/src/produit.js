import {IMG_URL} from "./config.js"
class ProduitHandler 
{
    ROOT_URL;
    constructor(ROOT_URL){
        this.ROOT_URL = ROOT_URL;
    }
    async getTop3() {
        let products = await this.get(this.ROOT_URL+"top_produits");
        return products;
    }
    getStockForOne(id) {
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"stocks/"+id).then((data)=>{
                resolve(data);
            }).catch((xhr)=>reject(xhr))
        })
    }
    getAll(){
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"products?page=1").then((data)=>{
                resolve(data["hydra:member"]);
            }).catch((xhr)=>reject(xhr))
        })
    }
    getByCategorie(catid) {
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"products/categories").then((data)=>{
                resolve(data["hydra:member"]);
            }).catch((xhr)=>reject(xhr))
        })
        // return new Promise((resolve,reject)=>{
        //     this.get(this.ROOT_URL+"categories/"+catid+"/posts").then((data)=>{
        //         resolve(data["hydra:member"]);
        //     }).catch((xhr)=>reject(xhr))
        // })
    }
    getByName(nom) {
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"produits?nom="+nom).then((data)=>{
                resolve(data["hydra:member"]);
            }).catch((xhr)=>reject(xhr))
        })
    }
    getById(id){
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"produits/"+id).then((data)=>{
                resolve(data);
            }).catch((xhr)=>reject(xhr))
        });
    }
    getCategories(){
        return new Promise((resolve,reject)=>{
            this.get(this.ROOT_URL+"products/categories").then((data)=>{
                resolve(data["hydra:member"]);
            }).catch((xhr)=>{console.log(xgr)})
        })
    }
    get(url) {
        return new Promise((resolve,reject)=>{
            let xhr =  new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText))
                    }else {
                        reject(xhr)
                    }
                }
            }
            xhr.open("GET",url,true);
            xhr.send()
        });
        
    }
    async getImageForOne(imageUrl) {
        const image = await this.get(this.ROOT_URL+imageUrl.substr(5));
        return image;        
    }
    cardRender(nom,id,image) {
        
        return (
            `<div data-cardId-${id} class="card">
                <div class="card-title">
                    <a data_item_detail = ${id} data_tooltip="Details de l'article en vente" href="">
                        <span class="circle"><i class="fa fas fa-spinner"></i></span>
                    </a>
                    <a data_add_to_basket=${id} data_tooltip="Ajouter au panier" href="#">
                        <span class="circle"><i class="fa fas fas fa-shopping-cart"></i></span>
                    </a>
                </div>
                <div class="card-image">
                    <img class="card-image-img" src="img/photo2.png" alt=""/>
                </div>
                <div class="card-content">
                    <h2 class="item-name">${nom}</h2>
                    <button data_add_to_basket=${id} class="form-item-input btn btnBoutique">Ajouter au panier <i class="fa fas fas fa-shopping-cart"></i></button>
                    <hr/>
                    <button data_item_detail = ${id} data_tooltip="Details de l'article en vente" class="form-item-input btn btnBoutique">Détail<i class="fa fas fas fa-spinner"></i></button>
                </div>
            </div>`
        )
    }
    cardRenderSearchResult(nom,id,image){
        return (
            `<div data-cardId-${id} class="card-searchResult">
                <div class="card-image">
                    <img class="card-image-img" src="img/photo2.png" alt=""/>
                </div>
                <div class="card-content">
                    <h2 class="item-name">${nom}</h2>
                    <button data_add_to_basket=${id} class="form-item-input btn">Ajouter au panier <i class="fa fas fas fa-shopping-cart"></i></button>
                </div>
            </div>`
        )
    }
    /**
     * 
     * @param {HtmlElement} El 
     * @param {*} products 
     */
    showTopProducts(El,products){

        let text = ` <h2>En Top vente chez nous</h2>`;
        El.innerHtml = "";
        products.forEach(item=>{
            text = text + `<div  data-cardId-${item[0].id} class="card">
                            <div class="card-image">
                                <img class="card-image-img" src="img/photo2.png" alt=""/>
                            </div>
                            <div class="card-content">
                                <h2 class="item-name">${item[0].nom}</h2>
                                <button data_add_to_basket=${item[0].id} class="form-item-input btn btnBoutique">Ajouter au panier <i class="fa fas fas fa-shopping-cart"></i></button>
                                <button  data_tooltip="Details de l'article en vente" class="form-item-input btn btnBoutique">Détail<i class="fa fas fas fa-spinner"></i></button>
                            </div>
                        </div>`
        })
        El.innerHTML = text;

        products.forEach(item=>{
            this.getImageForOne(item[0].images).then(image=>{
                let imgEl = document.querySelector(`[data-cardId-${item[0].id}] .card-image .card-image-img`);
                imgEl.src = IMG_URL+image.contentUrl;          
            })
        })

    }
}
export default ProduitHandler;