import stock from "../entities/stock.js";
import {imprimer} from "../config.js";

const btnFiche = document.querySelector("[data-fiche-stock]");
const viewZone = document.querySelector("#view");
const stockObj = new stock();

const bt = ()=>{btnFiche.addEventListener("click",async (e)=>{
    let stocks = await stockObj.getWithProduct();
    viewZone.innerHTML = templateFichestock(stocks);
    printListener();
})};
bt();
const printListener = ()=>{
    let btnPrint = document.querySelector("[data-btn-print]");
    btnPrint.addEventListener("click",()=>{
        let res = imprimer(".table");
        if (res) {
            window.location.reload()
        }
    })
}

const templateFichestock = (stocks)=>{
    let text = "";
    stocks.forEach(stock => {
        //console.log("oo")
        text+=`<tr class="table-content-item">
                    <td>${stock.produit.nom}</td>
                    <td>${stock.stock.prixUnitaire}</td>
                    <td>${stock.stock.stockInit}</td>
                    <td>${stock.stock.stockRest}</td>
                    <td>${stock.stock.totalStockInit}</td>
                    <td>${stock.stock.totalStockRest}</td>
                </tr>`;
    });
    // stocks.map(stock=>{
    // });
    return(
     /*html*/
     `
    
     <div class="form-item">
         <button data-btn-print class="form-item-input btn">Imprimer</button>
     </div>
     <div class="form-item">
         <button class="form-item-input btn">Envoyer par Mail</button>
     </div>
     <table class="table">
         <thead class="table-title">
             <tr>
                 <th>Produit</th>
                 <th>Prix</th>
                 <th>Stock Init</th>
                 <th>Stock Rest</th>
                 <th>Total Init</th>
                 <th>Total Rest</th>
             </tr>
         </thead>
         <tbody class="table-content">
            ${text}
         </tbody>
     </table>
     `
    );
};

