import Basket from "./basket.js";
import BasketHandler from "./panierHandler.js";
import {ROOT_URL,LOADER} from "./config.js";

const countItemBasketEl = document.querySelectorAll(".basket-nbr-item");
const btn_clear_basket = document.querySelector("[data_clear_basket]");
const btn_valide_basket = document.querySelector("[data_validate_basket]");
const priceZoneText = document.querySelectorAll(".menu-item-basket-price");
const sectionELmts = document.querySelector(".section-panier-items-zone");
const tableContent = document.querySelector(".table-content");
const overlay = document.querySelector('.overlay');
const BasketObj = new Basket();
const BasketHandlerObj = new BasketHandler();
let items = BasketObj.getItemsLocal();
let itemsEL = ""

// efface le panier local actuel
btn_clear_basket.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    countItemBasketEl[0].innerHTML = 0;
    countItemBasketEl[1].innerHTML = 0;
    priceZoneText[0].innerHTML = "0"
    priceZoneText[1].innerHTML = "0"
    tableContent.innerHTML = "";
})

// validation du panier

btn_valide_basket.addEventListener("click",(e)=>{
    e.preventDefault();
    let prixTotal = BasketObj.getTotal();
    let text = BasketHandlerObj.userFormRender(prixTotal);
    sectionELmts.innerHTML = "";
    sectionELmts.innerHTML = text;
    const form = document.querySelector('[data_form_validate_basket]');

    form.addEventListener("submit",(e)=>{
        
        e.preventDefault()
        const addrInput = document.querySelector("[data_address_input]");
        const nom = document.querySelector('input[name="nom"]');
        const sexe = document.querySelector('select[name="sexe"]');
        const telephone = document.querySelector('input[name="telephone"]');
        const mail = document.querySelector('input[name="mail"]');
        overlay.innerHTML = LOADER;
        overlay.style.display = "flex";
        BasketObj.sendUserAdress(ROOT_URL+"addresses",addrInput).then((data)=>{
            const addrUri = data["@id"];
            BasketObj.sendUser(ROOT_URL+"clients",{
                "name":nom.value,
                "sexe":sexe.value,
                "telephone":telephone.value,
                "mail":mail.value,
                "adress":`http://localhost:8000${addrUri}`,
            }).then(data=>{
               BasketObj.sendBasket(ROOT_URL+"paniers",{
                   "userId":data["@id"],
                   "total":BasketObj.getTotal(),
                   "items":BasketObj.getItemsLocal()
               }).then(data=>{
                   let text = "";
                   text = BasketHandlerObj.showBasketInfo(data.secret,data.id);
                   sectionELmts.innerHTML = "";
                   sectionELmts.innerHTML = text;
                   localStorage.clear();
                   countItemBasketEl[0].innerHTML = 0;
                   countItemBasketEl[1].innerHTML = 0;
                   priceZoneText[0].innerHTML = "0"
                   priceZoneText[1].innerHTML = "0"
                   overlay.innerHTML = "";
                   overlay.style.display = "none";
                 //  console.log(data) // afficher le code secret et le numéro de paiement
               }).catch(err=>{
                   console.log(err);
               })
            }).catch(err=>{
                console.log(err)
            });

        }).catch((err)=>{
            console.log(err);
        });
    })
});

/**
 * 
 * @param {*} BtnsDeleteitems listes des bouttons supprimé item
 * @param {} BasketHandlerObj
 */
const btnsEvent = (BtnsDeleteitems,BasketHandlerObj)=>{

    BtnsDeleteitems.forEach((btn)=>{

        btn.addEventListener("click",(e)=>{

            let itemId = e.currentTarget.attributes[0].value;
            let item = BasketObj.getItem(itemId)
            let newItemsArr = BasketObj.delete(item);
            let itemEl = "";
             tableContent.innerHTML = "";
             newItemsArr.forEach((item)=>{
                 if (item !== null) {
                     itemEl = itemEl +  BasketHandlerObj.itemRender(item.id,item.nom,item.prixUnitaire,item.quantite);
                 }
             });
            tableContent.innerHTML = itemEl;
            BasketObj.setCountView(countItemBasketEl);
            priceZoneText[0].innerHTML = BasketObj.getTotal();
            priceZoneText[1].innerHTML = BasketObj.getTotal();
            const BtnsDeleteitems = document.querySelectorAll("[data_delete_basket_item]");
            btnsEvent(BtnsDeleteitems,BasketHandlerObj);
        })
    })
};

//affiche les items dans le tableau
items.map((item) => {
    itemsEL = itemsEL + BasketHandlerObj.itemRender(item.id,item.nom,item.prixUnitaire,item.quantite);
    tableContent.innerHTML = itemsEL;
    const BtnsDeleteitems = document.querySelectorAll("[data_delete_basket_item]");
    //console.log(BtnsDeleteitems)
    btnsEvent(BtnsDeleteitems,BasketHandlerObj);
});
localStorage.setItem("parsedBasket",JSON.stringify(items));
