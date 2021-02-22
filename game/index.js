let character = document.querySelector("#character");
let block = document.querySelector('#block');

function jump() {

    if (character.classList != 'animate') {
        character.classList.add('animate');
        block.classList.add('animate-b');        
    }
    setTimeout(() => {
        character.classList.remove('animate'); 
    }, 500);
}

let checkDead = setInterval(() => {
    let cTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let bLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (bLeft < 20 && bLeft>0 && cTop >= 130) {
        block.style.animation = "none"
        block.style.display = "none"
        alert("perdu!")
    }
},10);