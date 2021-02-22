import menuToggler from "./src/menuToggler.js";
import Basket from "./src/basket.js";

const countItemBasketEl = document.querySelectorAll(".basket-nbr-item");
const priceZoneText = document.querySelectorAll(".menu-item-basket-price");
let menuTogglerEl = document.querySelector("[data-menu-toggler]");
let menuHandlerEl = document.querySelector("[data-menu-handler]");
const BasketObj = new Basket();
const menuTogglerObj = new menuToggler();
countItemBasketEl[0].innerHTML = BasketObj.countItem();
countItemBasketEl[1].innerHTML = BasketObj.countItem();
priceZoneText[0].innerHTML = BasketObj.getTotal();
priceZoneText[1].innerHTML = BasketObj.getTotal();
menuTogglerObj.menuListener(menuTogglerEl,menuHandlerEl);