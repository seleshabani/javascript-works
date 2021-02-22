import client from "../entities/client.js";
import produitHandler from "../produit.js";
import {ROOT_URL} from "../config.js";
import panier from "../entities/panier.js";

const clientHtml = document.querySelector("[data-clients]");
const produitHtml = document.querySelector("[data-produits]");
const panierValideHtml = document.querySelector("[data-panier-valide]");
const panierInValideHtml = document.querySelector("[data-panier-invalide]");
const totalVentesHtml = document.querySelector("[data-total-ventes]");
const produitObj = new produitHandler(ROOT_URL);
const ClientObj = new client();
const panierObj = new panier();

ClientObj.getAll().then(data=>{
    clientHtml.innerHTML = data.length;
})
produitObj.getAll().then(data=>{
    produitHtml.innerHTML = data.length;
})
panierObj.getValide().then(data=>{
    panierValideHtml.innerHTML = data.length
})
panierObj.getInvalide().then(data=>{
    panierInValideHtml.innerHTML = data.length
})
panierObj.getTotalventes().then(data=>{
    totalVentesHtml.innerHTML = data+" fc";
})