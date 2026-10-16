const email = document.querySelector(".email")
const emailContainer = document.querySelector(".input-container")
const submit = document.querySelector(".enviar")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal-exito")
const quitBtn = document.querySelector(".quit")

function abrirModal() {
    overlay.style.display = "block";
    modal.style.display = "grid";
    quitBtn.focus()
}

function cerrarModal() {
    overlay.style.display = "none"
    modal.style.display = "none";
}

email.addEventListener("input", () => {
    email.style.border = ".1rem solid #fff5"
})

submit.addEventListener("click", (e) => {
    e.preventDefault()
    emailValue = email.value

    if (!emailValue.includes("@") || emailValue.length < 12) {
        email.style.border = ".2rem solid #f00"
        emailContainer.style.animation = "none"
        validEmail = false;
        setTimeout( () => {
            emailContainer.style.animation = 'inputError .5s'
        }, 10);
    } else {
        email.style.border = ".1rem solid #fff5"
        validEmail = true;
    }
    
    if (validEmail) {
        submit.value = "Enviando...";
        setTimeout(() => {
            email.value = ""
            submit.value = "Enviar Codigo"
            abrirModal()
            
        }, 2000)
    }

})

quitBtn.addEventListener("click", () => {
    cerrarModal()
})
