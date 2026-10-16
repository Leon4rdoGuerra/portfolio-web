const email = document.querySelector(".email")
const password = document.querySelector(".password")
const passwordConfirm = document.querySelector(".confirm-password")
const emailContainer = document.querySelector(".container-email")
const passwordContainer = document.querySelector(".container-password")
const confirmPasswordContainer = document.querySelector(".container-confirm-password")
const submit = document.querySelector(".crear")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal-exito")
const quitBtn = document.querySelector(".quit")
const hideIconOne = document.querySelector(".hide-passwordOne")
const showIconOne = document.querySelector(".show-passwordOne")
const hideIconTwo = document.querySelector(".hide-passwordTwo")
const showIconTwo = document.querySelector(".show-passwordTwo")

showIconOne.addEventListener("click", () => {
    password.classList.add("show");
    password.classList.remove("hide");
    password.setAttribute("type", "text")
})

hideIconOne.addEventListener("click", () => {
    password.classList.add("hide");
    password.classList.remove("show");
    password.setAttribute("type", "password")
})


let initializedOne = false;

password.addEventListener("input", () => {
  if (!initializedOne && password.value.length > 0) {
    // Solo la primera vez que se escribe algo
    password.classList.add("hide");
    password.classList.remove("show");
    password.setAttribute("type", "password");
    initializedOne = true;
  }

  if (password.value === "") {
    // Si se borra todo, resetea
    password.classList.remove("show");
    password.classList.remove("hide");
    password.setAttribute("type", "password");
    initializedOne = false; // listo para volver a activar en el próximo inicio
  }
});


showIconTwo.addEventListener("click", () => {
    passwordConfirm.classList.add("show");
    passwordConfirm.classList.remove("hide");
    passwordConfirm.setAttribute("type", "text")
})

hideIconTwo.addEventListener("click", () => {
    passwordConfirm.classList.add("hide");
    passwordConfirm.classList.remove("show");
    passwordConfirm.setAttribute("type", "password")
})


let initializedTwo = false;

passwordConfirm.addEventListener("input", () => {
  if (!initializedTwo && passwordConfirm.value.length > 0) {
    // Solo la primera vez que se escribe algo
    passwordConfirm.classList.add("hide");
    passwordConfirm.classList.remove("show");
    passwordConfirm.setAttribute("type", "password");
    initializedTwo = true;
  }

  if (passwordConfirm.value === "") {
    // Si se borra todo, resetea
    passwordConfirm.classList.remove("show");
    passwordConfirm.classList.remove("hide");
    passwordConfirm.setAttribute("type", "password");
    initializedTwo = false; // listo para volver a activar en el próximo inicio
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
passwordConfirm.addEventListener("input", () => {
    passwordConfirm.style.border = ".1rem solid #fff5"
})

submit.addEventListener("click", (e) => {
    e.preventDefault()
    emailValue = email.value
    passwordValue = password.value
    confirmValue = passwordConfirm.value

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

    if (passwordValue != confirmValue || confirmValue == "" || !validPassword) {
        validConfirm = false;
        passwordConfirm.style.border = ".2rem solid #f00"
        confirmPasswordContainer.style.animation = "none"
        setTimeout( () => {
            confirmPasswordContainer.style.animation = 'inputError .5s'
        }, 10);
    } else {
        validConfirm = true;
        passwordConfirm.style.border = ".1rem solid #fff5"
    }

    if (validEmail && validPassword && validConfirm) {
        submit.value = "Creando...";
        setTimeout(() => {
            password.value = ""
            email.value = ""
            passwordConfirm.value = ""
            submit.value = "Crear Cuenta"
            abrirModal()
        }, 2000)
    }

})

quitBtn.addEventListener("click", () => {
    cerrarModal()
})


