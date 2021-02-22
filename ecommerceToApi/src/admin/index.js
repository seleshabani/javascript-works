const menuToggler = document.querySelector("[data_toggle_menu]");
const menu = document.querySelector(".menu");
localStorage.setItem("menuState",false);

menuToggler.addEventListener("click",(e)=>{
    e.preventDefault();
    let menuState = localStorage.getItem("menuState")
    
    if (menuState == "true") {
        menu.classList.remove("show-menu")
        menu.classList.add("hide-menu")
        menu.style.height = "50px";
        localStorage.setItem("menuState",false);
    }else{
        menu.classList.remove("hide-menu")
        menu.classList.add("show-menu")
        menu.style.height = "200px";
        localStorage.setItem("menuState",true);
    }

})

