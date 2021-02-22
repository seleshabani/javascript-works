 class menuToggler 
 {
     menuListener(menuEl,menuHandlerEL) {
        menuEl.addEventListener("click",()=>{

            let props = this.getDisplayProps(menuHandlerEL);
            if(props === "flex") {
            menuHandlerEL.style.display = "none";
            }else {
            menuHandlerEL.style.display = "flex";
            menuHandlerEL.classList.add('animate-menu');
            }
         })
     }
     getDisplayProps(el) {
        let displayProp = getComputedStyle(el,null).display;
        return displayProp;
     }
}
export default menuToggler;