class BasketHandler 
{
    itemRender(id,nom,prix,quantite) {
        let total = prix * quantite;
        return (
            /* html*/
            `<tr class="table-content-item">
                <td>${nom}</td>
                <td>${prix}</td>
                <td>${quantite}</td>
                <td>${total} <a data_delete_basket_item=${id} href="#"><i class="fa fa-trash"></i></a></td>
            </tr>`
        );
    }
    userFormRender(prixTotal) {
        return (
        /*html*/
        `
        <h1> Veillez remplir ce formulaire avant de valider votre commande</h1>
        <form data_form_validate_basket class="form" action="">
            <input type="hidden" name="itemPaniers" value=${localStorage.getItem("parsedBasket")}/>
            <input type="hidden" name="prixTotal" value=${prixTotal}/>
            <div class="form-item">
                <label for="">nom</label>
                <input name="nom" class="form-item-input" type="text">
            </div>
            <div class="form-item">
                <label for="">Mail</label>
                <input name="mail" class="form-item-input" type="e-mail">
            </div>
            <div class="form-item">
                <label for="">Télèphone</label>
                <input name="telephone" class="form-item-input" type="text">
            </div>
            <div class="form-item">
                <label for="">Adresse(ville,commune,quartier,avenue,numéro)</label>
                <input name="adresse" data_address_input class="form-item-input" type="text">
            </div>
            <div class="form-item">
                <label for="">Sexe</label>
                <select name="sexe" class="select-input" id="">
                    <option value="m">Homme</option>
                    <option value="m">Femme</option>
                </select>
            </div>
            <div class="form-item">
                <button class="form-item-input btn">Envoyer</button>
            </div>
        </form>`
        );
    }

    showBasketInfo(secret,numero) {
        return (
            /*html*/
            `<h1>Votre panier est enregistré avec les informations suivantes</h1>
             <h2>Numéro :${numero}</h2>
             <h2>Secret :${secret}</h2>
             <h1> Pour valider votre panier faites une transaction mobile money au +243850250211 en vous servant des informations de votre panier</h1>
            `
        )
    }
}
export default BasketHandler;