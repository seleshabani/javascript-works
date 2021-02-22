import ProduitHandler  from "./produit.js";
import {ROOT_URL,LOADER,IMG_URL} from "./config.js";
import Basket from "./basket.js";

const cardZone = document.querySelector(".section-itemCard-zone");
const countItemBasketEl = document.querySelectorAll(".basket-nbr-item");
const priceZoneText = document.querySelectorAll(".menu-item-basket-price");
const selectCategoriesEl = document.querySelector("[data_select_categorie]");
const overlay = document.querySelector('.overlay');
const prodH = new ProduitHandler(ROOT_URL);
const BasketObj = new Basket();
const produitsArr = [];//zone affichage des produits
let CardHtml = ""; //les cards des produits 
let selectCategoriesOptions = ""; //Elements de la liste déroulante des catégories
// selection et affichage des produits

overlay.innerHTML = LOADER;

overlay.style.display = "flex";

prodH.getAll().then((produits)=>{
    showProduits(produits);
});

// Détail d'un produit via le tooltip
const tootltipHandler = () => {
    const tooltipItemDetail = document.querySelectorAll("[data_item_detail]");
    tooltipItemDetail.forEach(tooltipItem => {
        tooltipItem.addEventListener("mouseover",(e) => {
            (target=>{
                const id = target.attributes.data_item_detail.value;
                target.attributes.data_tooltip.value = "Patientez...";
                // met les infos en caches dans localstorage pour une meilleur experience utilisateur
                if (localStorage.getItem(ROOT_URL+"stocks/"+id) !== null) {
                    target.attributes.data_tooltip.value = localStorage.getItem(ROOT_URL+"stocks/"+id) + " fc";
                }else{
                    prodH.getStockForOne(id).then((data)=>{
                        let text = `Stock restant :${data.stockRest} ; \n 
                        Prix : ${data.prixUnitaire} fc`;
                        //data.prixUnitaire+" fc"
                        target.attributes.data_tooltip.value = text;
                        localStorage.setItem(ROOT_URL+"stocks/"+id,text);
                    },()=>{})
                }
            })(e.currentTarget)
        })
    })
};
// tooltip ajout panier
const tooltipAddToBasketHandler = (produitsArr)=>{
    const tooltipAddToBasket = document.querySelectorAll("[data_add_to_basket]");
    tooltipAddToBasket.forEach(item=>{
        item.addEventListener("click",(e)=>{
            (target=>{
                e.preventDefault()
                const id = target.attributes.data_add_to_basket.value;
                overlay.innerHTML = LOADER;
                overlay.style.display = "flex";
                prodH.getStockForOne(id).then((stock)=>{
                    BasketObj.addLocal(produitsArr[id],stock);
                    BasketObj.setCountView(countItemBasketEl)
                    let total = BasketObj.getTotal();
                    priceZoneText[0].innerHTML = total;
                    priceZoneText[1].innerHTML = total;
                    overlay.innerHTML = "";
                    overlay.style.display = "none";
                    //console.log(total);
                })
            })(e.currentTarget) //la closure sert à isoler un item pour une action asynchrone
        })
    })
};
// affichage des categories dans la lites deroulante
prodH.getCategories().then((categories)=>{
   // console.log(categories)
    categories.forEach(categorie => {
        selectCategoriesOptions += `<option data_select_categorie_option="" value="${categorie.id}">${categorie.nom}</option>`;
    })
    selectCategoriesOptions += `<option data_select_categorie_option="" value="-1">Tout</option>`
    selectCategoriesEl.innerHTML = selectCategoriesOptions;
  
})

// affichages des produits par catégories 
selectCategoriesEl.addEventListener("change",(e)=>{
    e.preventDefault();
    cardZone.innerHTML = `<div class="overlay">${LOADER}</div>`;
    const overlay = document.querySelector(".overlay");
    let cat_id = selectCategoriesEl.options[selectCategoriesEl.selectedIndex].value;
    // console.log(cat_id);
    overlay.style.display = "flex";
    if(cat_id !== "-1"){
        //console.log(overlay)
        prodH.getByCategorie(cat_id).then((produits)=>{
            showProduits(produits);
        })
    }else{
        prodH.getAll().then((produits)=>{
            showProduits(produits);
        });
    }
})

const showProduits = async (produits)=>{
    // cardZone.innerHTML = ""
    CardHtml = "";
   
    produits.map(produit=>{ 
        //console.log(produit)
        produitsArr[produit.id] = produit;//contient les produits actuellement affiché
        CardHtml = CardHtml + prodH.cardRender(produit.nom,produit.id,produit.image);        
      
    })
    cardZone.innerHTML = "";
    cardZone.innerHTML = CardHtml;
    tootltipHandler();
    tooltipAddToBasketHandler(produitsArr);

    produitsArr.map(produit=>{
        //console.log(produit);
        
        prodH.getImageForOne(produit.images).then(image=>{
            let imgEl = document.querySelector(`[data-cardId-${produit.id}] .card-image .card-image-img`);
            imgEl.src = IMG_URL+image.contentUrl;          
        })
    })
    overlay.style.display = "none";
}

// const asyncShow = async (produits)=>{
//     let CardHtml = "";
//     await produits.map((produit)=>{
//         //console.log(produit)
//         let image = prodH.getImageForOne(produit.images)
//         produitsArr[produit.id] = produit;//contient les produits actuellement affiché
//         CardHtml = CardHtml + prodH.cardRender(produit.nom,produit.id,image.contentUrl);        
//     })
//     return CardHtml;
// }