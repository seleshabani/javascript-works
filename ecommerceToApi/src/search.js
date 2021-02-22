import ProduitHandler from "./produit.js";
import {ROOT_URL,LOADER} from "./config.js"
import Basket from "./basket.js";
const searchInput = document.querySelector("[data_search_input]");
const searchBtn = document.querySelector("[data_search_button]");
const searhZoneResult = document.querySelector(".search-zone-resultat");
const cardZone = document.querySelector(".section-itemCard-zone");
const overlay = document.querySelector('.overlay');
const ProdHandler = new ProduitHandler(ROOT_URL);
const container = document.querySelector(".container-white-line");
const basketObj = new Basket();
const countItemBasketEl = document.querySelectorAll(".basket-nbr-item");
const priceZoneText = document.querySelectorAll(".menu-item-basket-price");
let previousValue = searchInput.value;

searchInput.addEventListener("keyup",(e)=>{
    previousValue = (previousValue !== e.currentTarget.value) ? e.currentTarget.value : previousValue;
        ProdHandler.getByName(e.currentTarget.value).then((data)=>{
            
            if (data.length>0) {
                let items = "";
                let newDataArr = (data.length > 5)?data.slice(0,5):data;
                newDataArr.map((item)=>{
                    items += `<a data_link_search_result="${item.nom}" id="${item.id}" href="#">${item.nom}</a>`;
                })
                searhZoneResult.innerHTML = items;
                searhZoneResult.style.display = "flex";
                const searchResultItems = document.querySelectorAll("[data_link_search_result]");
                ShowSearchItemOnInput(searchResultItems);
            }else{
                searhZoneResult.innerHTML = `<h2>Aucun Résultat</h2>`;
                searhZoneResult.style.display = "flex";
            }
        }) 
})

container.addEventListener("click",()=>{
    searhZoneResult.style.display = "none";
})

const ShowSearchItemOnInput = (ELmts)=>{
    ELmts.forEach(item=>{
        item.addEventListener("click",(e)=>{
            e.preventDefault();
            localStorage.setItem("searchItem",e.target.id);
            searchInput.value = e.target.innerText;
        });
    });
}

// Recherche | affiche le résultat de recherche
searchBtn.addEventListener('click',(e)=>{
    // let htmlContent = `<h1>Détail sur le produit :${searchInput.value}</h1>`;
    e.preventDefault();
    let htmlContent = "";
    let id = localStorage.getItem("searchItem");
    overlay.innerHTML = LOADER;
    overlay.style.display = "flex";
    if (id != null) {
        ProdHandler.getById(id).then((data)=>{

            ProdHandler.getStockForOne(data.id).then(stock=>{
                htmlContent = htmlContent + ProdHandler.cardRenderSearchResult(data.nom,data.id,data.image);
                cardZone.innerHTML = htmlContent;
                const tooltipAddToBasket = document.querySelector("[data_add_to_basket]");
                overlay.innerHTML = "";
                overlay.style.display = "none";
                tooltipAddToBasket.addEventListener("click",(e)=>{
                    e.preventDefault()
                    overlay.innerHTML = LOADER;
                    overlay.style.display = "flex";
                    const id = e.currentTarget.attributes.data_add_to_basket.value;
                    basketObj.addLocal(data,stock);
                    basketObj.setCountView(countItemBasketEl);
                    let total = basketObj.getTotal();
                    priceZoneText[0].innerHTML = total;
                    priceZoneText[1].innerHTML = total;
                    overlay.innerHTML = "";
                    overlay.style.display = "none";
                });
            }).catch(err=>{
                console.log(err);
            })
        }).catch((error)=>{console.log(error)});
    }
    
});