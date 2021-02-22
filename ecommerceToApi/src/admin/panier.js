import itemPanier from "../entities/itemPanier.js";
import panier from "../entities/panier.js";
import produits from "../entities/produit.js";
import {LOADER} from "../config.js";

const btnFindPanier = document.querySelector("[data-find-panier-invalide]");
const btnFindPanierValide = document.querySelector("[data-find-panier-valide]");
const viewZone = document.querySelector("#view");
const formZone = document.querySelector('#form-update-zone');
const overlay = document.querySelector(".overlay");
const panierObj = new panier();
const itemPanierObj = new itemPanier();
const produitObj = new produits();

btnFindPanier.addEventListener('click',(e)=>{
    e.preventDefault();
    viewZone.innerHTML = templateForm();
    formfindListener(false);
})
btnFindPanierValide.addEventListener('click',e=>{
    e.preventDefault();
    viewZone.innerHTML = templateForm(true);
    formfindListener(true);
})

const formfindListener = (isPanierValide)=>{
    const frm = document.querySelector(".form-find");
    frm.addEventListener("submit",async (e)=>{
        e.preventDefault();
        let inptTel = document.querySelector("input[name=tel]");
        let inptSec = document.querySelector("input[name=secret]");
        overlay.innerHTML = LOADER;
        overlay.style.display = "flex";
        let panier = await panierObj.bySecretAndUser(inptSec.value,inptTel.value,isPanierValide);
        let items = [];
       
        let i = 0;
        if (!panier) {
           formZone.innerHTML = `<h2>Panier introuvable</h2>`;
           overlay.style.display = "none";
        }else{

           formZone.innerHTML = showPanier(panier,isPanierValide);
           const pnierZone = document.querySelector("[data-panier]");
          // console.log(pnierZone);
           panier.itemPaniers.forEach(async (item) => {
                items[i] = await itemPanierObj.byUri(item);
                let  produit = await produitObj.byUri(items[i].idProduit);
                let li = document.createElement("li");
                li.innerHTML = produit.nom;
                pnierZone.appendChild(li);
                i++;
            });
            if (isPanierValide) {
                btnValideLivraisonListener(panier.id);
            }else{
                btnValideListener(panier.id);
            }
            overlay.style.display = "none";
        }
    })
}

const templateForm = (isValidateSearch) =>{
    return(
         /*html*/
            `
            <h2>${isValidateSearch?"Panier Validé":"Panier non validé"}</h2>
            <h2>Entrez le n° de téléphone(client) et le code secret du panier</h2>
            <form class="form-find" action=""> 
                    <div class="form-item"><label for="">Téléphone</label>
                    <input name="tel" class="form-item-input" type="text">
                    </div>
                    <div class="form-item">
                        <label for="">Secret</label>
                        <input name="secret" class="form-item-input" type="text">
                    </div>
                    <div class="form-item">
                        <button class="form-item-input btn">Verifier</button>
                    </div>
                </form>
        `
    );
}
   


const showPanier = (panier,isPanierValide)=>{

    let flag;
    if ((isPanierValide == true) && (panier.livrer == false)) {
        flag = false;
    }else{
        flag = true;
    }

    return (
        /*html*/
        `
            <h2>Panier n° ${panier.id}; Total ${panier.prixTotal} fc, Livré : ${flag?"Oui":"Non"}</h2>
            <ul data-panier>
            </ul>
            <button data-is-livrate=${flag?1:0} data-btn-valide class="form-item-input btn">Valider</button>
            <h2 data-notify></h2>
        `
    )
}
const btnValideListener = (idpanier)=>{
    const btn = document.querySelector("[data-btn-valide]");
    btn.addEventListener('click',async ()=>{
        let idAgent = JSON.parse(localStorage.getItem("agent"));
        let notify = document.querySelector('[data-notify]');
        let result = await panierObj.setValide(idpanier,idAgent['@id']);
        if (result == true) {
            notify.innerHTML = "Panier Validé";
        }else{
            notify.innerHTML = "Une erreur s'est produite";          
        }
    })
}

const btnValideLivraisonListener = (idpanier)=>{
    const btn = document.querySelector("[data-btn-valide]");
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        let idAgent = JSON.parse(localStorage.getItem("agent"));
        let notify = document.querySelector('[data-notify]');
        let isLivrate = e.currentTarget.attributes[0].value;
        console.log(isLivrate);
        //gérer ici la livraison
    })
}