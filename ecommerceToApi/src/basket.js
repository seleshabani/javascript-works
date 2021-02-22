import {BASE_URL} from "./config.js";
/**
 * @property {Object} BasketItems 
 */
class Basket 
{
    items;
    BasketItemsObj;
    //BasketItems;
    location;
    total = 0;
    constructor() {
        this.BasketItems = JSON.parse(localStorage.getItem("panier"));
        if (this.BasketItems == null) {
            this.BasketItems = [];
            localStorage.setItem("panier",JSON.stringify(this.BasketItems));
        }
       // this.BasketItemsObj = [];
        this.location = window.location;
      //  console.log(JSON.parse(localStorage.getItem("panier")));
    }
    /**
     * Ajoute un Article(produit) au panier,le touts enregistré dans le localstorage
     * @param { Object } item  Elèment à ajouter au panier
     * @param {Object} stockITem Information de stock sur l'item à ajouter
     */
    addLocal(item,stockITem){
      if(this.BasketItems[item.id]==undefined){
        item.prixUnitaire = stockITem.prixUnitaire;
        item.quantite = 1;
        item.idProduit = stockITem.idProduit;
        this.BasketItems[item.id] = item;
      }else{
          this.BasketItems[item.id].quantite =  this.BasketItems[item.id].quantite + 1;
      } 
      localStorage.setItem("panier",JSON.stringify(this.BasketItems));
    }
    /**
     * Récupère la liste des items du panier enregistré localement sans répetition|parse les items enregistré dans panier en localstorageb
     */
    getItemsLocal() {
        let parsedArr = this.BasketItems.filter((item)=>{
            if (item !== null) {
                return item;
            }
        })
        return parsedArr;
    }
    /**
     * supprime un item depuis le localstorage(panier)
     * @param {Int} id
     */
    deleteItemsLocal(id){

    }
    /**
     * 
     * @param {Int} id 
     */
    getItem(id) {
        return this.BasketItems[id];
    }
    /**
     * compte les items du paniers
     */
    countItem(){
        let counter = 0;
        if (this.BasketItems !== null) {
            this.BasketItems.forEach((item)=>{
                if (item !== null) {
                    counter = counter + item.quantite;
                }
            })
        }
        return counter;
       //return JSON.parse(localStorage.getItem("panier")).length;
    }
    /**
     * le prix total du panier
     */
    getTotal() {
       //console.log(this.BasketItems)
         let total = 0;
            if (this.BasketItems !== null) {
                this.BasketItems.forEach((item)=>{
                    if (item !== null) {
                        total = total + (item.quantite * item.prixUnitaire);
                    }
                });
            }
         return total;
    }
    /**
     * 
     * @param {Int} total 
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Affiche à l'écran le prix total du panier
     * @param {*} El HtmlElement
     */
    setCountView(El) {
        //console.log(this.BasketItems.user)
        let nbr = this.countItem();
        El[0].innerText = nbr;
        El[1].innerText = nbr;
    }
    /**
     * supprime un item ou diminue la quantite dans le tablau this.items(parsé)
     * @param {Object} item élèment à supprimé
     */
    delete(item) {
        if (this.BasketItems[item.id].quantite > 1) {
            this.BasketItems[item.id].quantite = this.BasketItems[item.id].quantite - 1;
        }else{
            this.BasketItems[item.id] = null;
        }
        localStorage.setItem("panier",JSON.stringify(this.BasketItems));
        return this.BasketItems;
    }
    /**
     * 
     * @param {*} url 
     * @param {*} formEl 
     * @param {*} addrId 
     */
    sendUser(url,{name,sexe,telephone,mail,adress}) {
        
        let user = {
            "nom":name,
            "sexe":sexe,
            "telephone":telephone,
            "mail":mail,
            "idAddress":adress,
        }

        return new Promise((resolve,reject)=>{
            this.post(url,user).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })

    }

    /**
     * 
     * @param {*} url 
     * @param {String} addressInput 
     */
    sendUserAdress(url,addressInput) {
        let addr = addressInput.value;
        let arr = addr.split(",");
        let addrs = {
            "ville":arr[0],
            "commune":arr[1],
             "quartier":arr[2],
             "avenue":arr[3],
             "numero":arr[4]
        }

        return new Promise((resolve,reject)=>{
            this.post(url,addrs).then((data)=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        })
    }

    /**
     * 
     * @param {String} url 
     */
    sendBasket(url,{userId,total,items}) {
        let panier = {
            "idclient":userId,
            "prixTotal":total
        }
        //console.log(panier)
        return new Promise((resolve,reject)=>{
            this.post(url,panier).then(data=>{
                this.sendBasketItem("http://localhost:8000/api/item_paniers",data["@id"],items).then(result=>{
                    console.log(result);
                    resolve(data);
                })
            }).catch(err=>{
                reject(err);
            })
        })
    }

    /**
     * @param {} url
     * @param {Array} items 
     */
    async  sendBasketItem(url,idPanier,items) {
        let cmptr = 0;
        let response = [];
        items.map(async (item)=>{
            let itemP = {
                "idPanier": idPanier,
                "idProduit": item.idProduit,
                "quantite": item.quantite
            }
            item.idPanier = idPanier;
            response[cmptr] = await this.post(url,itemP);
            cmptr = cmptr + 1;
        })

        // for await (item of items) {
        //     response[cmptr] =  this.post(url,item);
        //     cmptr = cmptr + 1;
        // }
        return response;
    }
    post(url,formData) {
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 201) {
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr);
                    }
                }
            }
            xhr.open("POST",url,true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(formData));
        });
    }
}
export default Basket;