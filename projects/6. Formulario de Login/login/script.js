const email = document.querySelector(".email")
const password = document.querySelector(".password")
const emailContainer = document.querySelector(".container-email")
const passwordContainer = document.querySelector(".container-password")
const submit = document.querySelector(".iniciar")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal-exito")
const quitBtn = document.querySelector(".quit")
const hideIcon = document.querySelector(".hide-password")
const showIcon = document.querySelector(".show-password")

showIcon.addEventListener("click", () => {
    password.classList.add("show");
    password.classList.remove("hide");
    password.setAttribute("type", "text")
    
})
hideIcon.addEventListener("click", () => {
    password.classList.add("hide");
    password.classList.remove("show");
    password.setAttribute("type", "password")
})
let initialized = false;

password.addEventListener("input", () => {
  if (!initialized && password.value.length > 0) {
    // Solo la primera vez que se escribe algo
    password.classList.add("hide");
    password.classList.remove("show");
    password.setAttribute("type", "password");
    initialized = true;
  }

  if (password.value === "") {
    // Si se borra todo, resetea
    password.classList.remove("show");
    password.classList.remove("hide");
    password.setAttribute("type", "password");
    initialized = false; // listo para volver a activar en el próximo inicio
  }
});

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
password.addEventListener("input", () => {
    password.style.border = ".1rem solid #fff5"
})


submit.addEventListener("click", (e) => {
    e.preventDefault()
    emailValue = email.value
    passwordValue = password.value

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
    
    if (passwordValue.length < 8) {
        password.style.border = ".2rem solid #f00"
        passwordContainer.style.animation = "none"
        validPassword = false;
        setTimeout( () => {
            passwordContainer.style.animation = 'inputError .5s'
        }, 10);
    } else {
        password.style.border = ".1rem solid #fff5"
        validPassword = true;
    }

    if (validEmail && validPassword) {
        submit.value = "Iniciando...";
        setTimeout(() => {
            password.value = ""
            email.value = ""
            submit.value = "Iniciar Sesion"
            abrirModal()
            
        }, 2000)
    }

})

quitBtn.addEventListener("click", () => {
    cerrarModal()
})


