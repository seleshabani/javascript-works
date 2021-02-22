import categories from "../entities/categories.js";
import produits from "../entities/produit.js";
import stock from "../entities/stock.js";
import images from "../entities/images.js";
import {LOADER} from "../config.js";

const btnAddProd = document.querySelector("[data-produit-add]");
const btnUpdateProd = document.querySelector("[data-produit-update]");
const viewZone = document.querySelector("#view");
const overlay = document.querySelector(".overlay");
const produitObj = new produits();
const categoriesOb = new categories();
const stockObj = new stock();
const imgObj = new images();

btnAddProd.addEventListener("click", async (e)=>{
        overlay.innerHTML = LOADER;
        overlay.style.display = "flex";
        let categories = await categoriesOb.getAll();
        viewZone.innerHTML = produitObj.formAdd(categories);
        overlay.style.display = "none";
        formAddListener();
})

const formAddListener = ()=>{
    const form = document.querySelector(".form");
    form.addEventListener("submit",async (e)=>{

        e.preventDefault();
        const frm = document.querySelector(".form");
        const inptnom = document.querySelector('[name=nom]');
        const inptcat = document.querySelector('[name=categorie]');
        const inptprix = document.querySelector('[name=prix]');
        const inptstock = document.querySelector('[name=stockInit]');
        let catId = inptcat.selectedOptions[0].attributes[1].value;
        overlay.innerHTML = LOADER;
        overlay.style.display = "flex";
        let idProd = await produitObj.create(catId,inptnom.value);
        let stockId = await stockObj.create(idProd.id,inptprix.value,inptstock.value);
        let fd = new FormData(frm);
        fd.append('label',inptnom.value);
        fd.append('id_produit_id',idProd.id);
        let img = await imgObj.create(fd);
        overlay.style.display = "none";
    })
}

btnUpdateProd.addEventListener("click",async (e)=>{
    overlay.innerHTML = LOADER;
    overlay.style.display = "flex";
    let produits = await produitObj.all();
    viewZone.innerHTML = produitObj.list(produits);
    overlay.style.display = "none";
    //searchListener();
    btnUpdateListener();
})

const searchListener = async ()=>{
    const srchInpt = document.querySelector("[data_search_input]");
    const resultatZone = document.querySelector(".view-list-produits");

    srchInpt.addEventListener("keyup",async (e)=>{
        let ctarget = e.currentTarget.value;
        let produits = await produitObj.byName(ctarget);
        resultatZone.innerHTML = produitObj.list(produits,true);
        searchListener(produits);
    });
}
const btnUpdateListener = ()=>{
    const btns = document.querySelectorAll("[data-btn-update]");
    const formZone = document.querySelector('#form-update-zone');
    btns.forEach(btn=>{
        btn.addEventListener("click",async (e)=>{
            let ctrgt = e.currentTarget;
            let id = ctrgt.attributes[0].value
            const produit = await produitObj.byId(id)
            formZone.innerHTML = produitObj.formUpdate(produit);
            if (produit) {
                formUpdateProdListener(id,produit.stock);
            }
        })
    })
}
const formUpdateProdListener = (idProduit,stockId)=>{
    let form = document.querySelector('[data-form-update]');
    form.addEventListener('submit',async (e)=>{
        e.preventDefault();
        let inpNom = document.querySelector('input[name="nom"]').value;
        let inpPrix = document.querySelector('input[name="prix"]').value;
        let notify = document.querySelector('.notify');
        let result = await produitObj.update(idProduit,inpNom);
        stockId = stockId.substr(-2)
        let resultforstock = await stockObj.update(stockId,idProduit,inpPrix);
        if (result && resultforstock) {
            notify.innerHTML = "Produit modifié!";
        }
    })
}