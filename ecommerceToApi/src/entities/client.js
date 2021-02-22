import {ROOT_URL} from "../config.js";

class Client {

    RessourceUrl;
    nbr;
    constructor(){
        this.RessourceUrl = ROOT_URL + "clients";
    }
    async getAll() {
        let clients = await this.get(this.RessourceUrl);
        this.nbr = clients.length; 
        return clients["hydra:member"];
    }

    get(url){
        return new Promise((resolve,reject)=>{
            let xhr =  new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText))
                    }else {
                        reject(xhr)
                    }
                }
            };
            xhr.open("GET",url,true);
            xhr.send();
        
        });
    }
}
export default Client;