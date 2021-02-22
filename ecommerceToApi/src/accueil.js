import ProduitHandler from "./produit.js";
import {ROOT_URL,LOADER} from "./config.js";
import Basket from "./basket.js";
import produits from "./entities/produit.js";

const textSlider = ["Des clients satisfait","des produits de qualité","un autre text","encore un autre"];
const elmt = document.querySelector("#text-slider");
const topZone = document.querySelector(".card-top-products");
const countItemBasketEl = document.querySelectorAll(".basket-nbr-item");
const priceZoneText = document.querySelectorAll(".menu-item-basket-price");
const overlay = document.querySelector('.overlay');


const prodH = new ProduitHandler(ROOT_URL);
const prodObj = new produits();
const basketObj = new Basket();
const produitsArr = [];

let index = 0
const changeText = (ind)=>{
    elmt.innerHTML = "";
    elmt.innerHTML = textSlider[ind];
}

prodH.getTop3(topZone).then(products=>{

    prodH.showTopProducts(topZone,products["hydra:member"]);

    const prod = products["hydra:member"];

    prod.forEach(product => {
        produitsArr[product[0].id] = product[0];
    })

    const tooltipAddToBasket = document.querySelectorAll("[data_add_to_basket]");
    tooltipAddToBasket.forEach(item=>{
        item.addEventListener("click",(e)=>{
            (target=>{
                e.preventDefault()
                const id = target.attributes.data_add_to_basket.value;
                overlay.innerHTML = LOADER;
                overlay.style.display = "flex";
                prodH.getStockForOne(id).then((stock)=>{
                    basketObj.addLocal(produitsArr[id],stock);
                    basketObj.setCountView(countItemBasketEl)
                    let total = basketObj.getTotal();
                    priceZoneText[0].innerHTML = total;
                    priceZoneText[1].innerHTML = total;
                    overlay.innerHTML = "";
                    overlay.style.display = "none";
                    //console.log(total);
                })
            })(e.currentTarget) //la closure sert à isoler un item pour une action asynchrone
        })
    })
})



setInterval(()=>{
    changeText(index);
    if (index >= 0) {
        if (index > 2) {
            index = 0
        }else{
            index = index + 1;
        }
    }
},5000)