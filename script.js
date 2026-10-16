const proyectos = [
    {
        nombre: "Landing Page",
        desc: "Landing page de muestra creada para explorar diseño moderno y responsive de una empresa, servicio o negocio generico. Incluye hero con CTAs, secciones de servicios, proyectos y testimonios, además de un formulario de contacto estilizado. Todo pensado para mostrar estructura y estilo en desktop y mobile.",
        img: "projects/1. Landing Page/resources/Portada.jpeg",
        enlace: "projects/1. Landing Page/index.html"
    },
    {
        nombre: "Buscador de Peliculas",
        desc: "Aplicación web interactiva para explorar y descubrir películas en tiempo real mediante el consumo de una API externa. Incluye buscador dinámico con filtros por género, año y ordenamiento. Presenta secciones de tendencias semanales en formato carrusel y un grid de descubrimiento con títulos aleatorios. Cada película muestra su póster, géneros y calificación, y permite abrir un modal con información ampliada como sinopsis y duración. El diseño es completamente responsive, con validaciones y manejo de errores que garantizan una experiencia fluida incluso en 350 px.",
        img: "projects/2. Buscador de Peliculas/resources/Portada.jpeg",
        enlace: "projects/2. Buscador de Peliculas/index.html"
    },
    {
        nombre: "Aplicacion de Clima",
        desc: "Aplicación web de pronóstico del tiempo diseñada con un estilo moderno y completamente responsive. Muestra datos avanzados que incluyen temperatura actual, índice UV, horas de amanecer y anochecer, además de un pronóstico extendido de hasta 5 días con íconos ilustrativos y temperaturas mínimas y máximas. Cuenta con un sistema de búsqueda inteligente desarrollado con lógica propia, capaz de seleccionar la localización más precisa entre múltiples resultados y tolerante a errores de acentos o tildes. Integra persistencia para recordar la última ubicación consultada y devolver automáticamente sus datos al abrir la aplicación. Incluye una curiosidad visual que detecta si es de día o de noche, adaptando el fondo y los íconos de clima para ofrecer una experiencia dinámica y atractiva. Ideal para consultar el estado del tiempo de forma clara, confiable y visualmente agradable.",
        img: "projects/3. Clima con API/resources/Portada.jpeg",
        enlace: "projects/3. Clima con API/index.html"
    },
    {
        nombre: "Tablero Kanban",
        desc: "Aplicación web tipo tablero Kanban diseñada para organizar tareas y optimizar el flujo de trabajo diario. Permite crear, editar mediante doble click, mover y eliminar tareas mediante un sistema de drag & drop intuitivo. Cada tarea incluye título, descripción y opción de urgencia, representada por un badge que cambia de color según el estado. Las columnas limitan a tres tareas para fomentar la productividad y concentración. Incluye validaciones, persistencia en localStorage y un diseño responsive usable hasta 350 px. Proyecto orientado a desktop por su dependencia del drag & drop, aunque puede utilizarse en otros dispositivos mediante un mouse externo. Ideal para visualizar el progreso de tareas de forma clara y dinámica.",
        img: "projects/4. Tablero Kanban/resources/Portada.jpeg",
        enlace: "projects/4. Tablero kanban/index.html"
    },
    {
        nombre: "Generador de Contraseñas",
        desc: "Aplicación web generadora de contraseñas seguras con opciones personalizables. Permite definir longitud, incluir mayúsculas, minúsculas, números y símbolos, mostrando en tiempo real la fuerza de la contraseña según los parámetros seleccionados. Incluye validaciones, sistema de copia al portapapeles con feedback visual y un diseño moderno y responsive. La lógica garantiza aleatoriedad real mediante mezcla de caracteres y evita patrones predecibles, ofreciendo una herramienta confiable para crear contraseñas robustas.",
        img: "projects/5. Generador de Contraseñas/resources/Portada.jpeg",
        enlace: "projects/5. Generador de Contraseñas/index.html"
    },
    {
        nombre: "Formulario de Login",
        desc: "Proyecto de formulario de login enfocado en el desarrollo frontend de interfaces modernas y responsivas. Incluye logica de validaciones, sistema de mostrar/ocultar contraseña propio, placeholders flotantes, y un modal de confirmación al finalizar la acción. El diseño está optimizado para todas las resoluciones, con una estética limpia, sombras suaves y gradientes dinámicos. Este proyecto es puramente demostrativo y no funcional, ya que para su implementación completa se requeriría un backend.",
        img: "projects/6. Formulario de Login/resources/Portada.jpeg",
        enlace: "projects/6. Formulario de Login/login/index.html"
    }
]

const projectsBtns = document.querySelectorAll(".project-btn");
const openMenu = document.querySelector(".open-menu")
const closeMenu = document.querySelector(".close-menu")
const menuIcon = document.querySelector(".menu-icon")
const navBar = document.querySelector(".navbar")
const links = document.querySelectorAll(".link")
const sections = document.querySelectorAll("section")

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active")
})

links.forEach(link => {
    link.addEventListener("click", () => {
        menuIcon.classList.toggle("active")
    })
});

let modalOpen = false;


projectsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        for (let i = 0; i < projectsBtns.length; i++) {
            if (btn == projectsBtns[i]) {
                let name = proyectos[i].nombre
                let desc = proyectos[i].desc
                let img = proyectos[i].img
                let link = proyectos[i].enlace
                createModal(name, desc, img, link)
            }
            
        }
    })
})

function createModal(name, desc, img ,link) {
    
    if (!modalOpen) {
        modalOpen = true
        document.body.style.overflow = "hidden"

        const modal = document.createElement("div");
        modal.classList.add("modal")
        const modalOverlay = document.createElement("div")
        modalOverlay.classList.add("modal-overlay")
        modal.innerHTML = `
                <svg class="close-modal" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                <div class="modalImg-container">
                    <div class="open-project">
                        <a href="${link}" target="blank">
                            <svg width="48" height="48" fill="#NaNNaNNaN" viewBox="0 0 24 24" transform="" id="injected-svg"><path d="M9.88 18.36a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l2.83-2.83-1.41-1.41-2.83 2.83a5.003 5.003 0 0 0 0 7.07c.98.97 2.25 1.46 3.54 1.46s2.56-.49 3.54-1.46l2.83-2.83-1.41-1.41-2.83 2.83ZM12.71 4.22 9.88 7.05l1.41 1.41 2.83-2.83a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-2.83 2.83 1.41 1.41 2.83-2.83a5.003 5.003 0 0 0 0-7.07 5.003 5.003 0 0 0-7.07 0Z"></path><path d="m16.95 8.46-.71-.7-.7-.71-4.25 4.24-4.24 4.25.71.7.7.71 4.25-4.24z"></path></svg>
                            <p>Abrir</p>
                        </a>
                    </div>
                    <img src="${img}" class="modal-img">
                </div>
                <div class="modal-content">
                    <h2 class="modal-title">${name}</h2>
                    <div class="modal-desc">${desc}</div>
                    <div class="tecnologies-container">
                        <p class="tecnologies-heading">Tecnologias</p>
                        <div class="tecnologies">
                            <img src="resources/HTML.svg">
                            <img src="resources/CSS.svg">
                            <img src="resources/JS.svg">
                        </div>
                    </div>
                </div>   
        `

        mq = window.matchMedia("(max-width: 800px)")
        if(mq.matches) {
            modal.querySelector(".modal-desc").classList.add("expanded")
        }
        modal.querySelector(".modal-desc").addEventListener("click", () => {
            if(mq.matches) {
                modal.querySelector(".modal-desc").classList.toggle("expanded")
            }
        })


        document.body.append(modal)
        document.body.append(modalOverlay)
        
        modalOverlay.addEventListener("click", () => {
            modal.remove()
            modalOverlay.remove()
            modalOpen = false
            document.body.style.overflow = ""
        })
        modal.querySelector(".close-modal").addEventListener("click", () => {
            modal.remove()
            modalOverlay.remove()
            modalOpen = false
            document.body.style.overflow = ""
        })
        
    } else {
        return
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            id = entry.target.getAttribute("id")
            links.forEach(link => {
                link.classList.remove("active")
                document.querySelector(`a[href*='${id}']`).classList.add("active")
            })
        }
    })
}, {
    threshold: .3,
})


sections.forEach(section => {
    observer.observe(section)
})



// EMAIL JS

emailjs.init("Ec9uadGw9_j1rmggs")

const submitBtn = document.querySelector(".submit-btn")

document.querySelector(".contact-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    
    const templateParams = {
        user_name: document.querySelector('input[name="user_name"]').value.trim(),
        user_email: document.querySelector('input[name="user_email"]').value.trim(),
        user_message: document.querySelector('textarea[name="user_message"]').value.trim()
    }

    const serviceID = "service_r4wxdjh"
    const templateID = "template_1k5fhe3"

    const name = document.querySelector('input[name="user_name"]').value.trim()
    const email = document.querySelector('input[name="user_email"]').value.trim()
    const message = document.querySelector('textarea[name="user_message"]').value.trim()

    let validName = false;
    let validEmail = false;
    let validMessage = false;

    if (name !== "" && /^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(name)) {
        validName = true;
    } else {
        document.querySelector("input[name='user_name']").style.animation = ""
        document.querySelector("input[name='user_name']").style.border = ".1rem solid #f22"
        setTimeout(() => {
            document.querySelector("input[name='user_name']").style.animation = "inputError .7s ease"
        }, 10);
    }

    // Validar email: formato correcto
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validEmail = true;
    } else {
        document.querySelector("input[name='user_email']").style.animation = ""
        document.querySelector("input[name='user_email']").style.border = ".1rem solid #f22"
        setTimeout(() => {
            document.querySelector("input[name='user_email']").style.animation = "inputError .7s ease"
        }, 10);
    }

    // Validar mensaje: mínimo de caracteres
    if (message.trim().length >= 10) {
        validMessage = true;
    } else {
        document.querySelector("textarea[name='user_message']").style.animation = ""
        document.querySelector("textarea[name='user_message']").style.border = ".1rem solid #f22"
        setTimeout(() => {
            document.querySelector("textarea[name='user_message']").style.animation = "inputError .7s ease"
        }, 10);
    }

    if(validName && validEmail && validMessage) {        
        submitBtn.textContent = "Enviando..."
        submitBtn.style.opacity = ".9"
        submitBtn.disabled = true
    
    
        try {
            await emailjs.send(serviceID, templateID, templateParams, "Ec9uadGw9_j1rmggs")
            alert("¡Mensaje Enviado!")
            submitBtn.textContent = "Enviar Mensaje"
            submitBtn.style.opacity = ""
            submitBtn.disabled = false
            document.querySelector('input[name="user_name"]').value = ""
            document.querySelector('input[name="user_email"]').value = ""
            document.querySelector('textarea[name="user_message"]').value = ""
        } catch (error) {
            submitBtn.textContent = "Enviar Mensaje"
            submitBtn.style.opacity = ""
            submitBtn.disabled = false
            alert("Hubo un error al enviar el mensaje: " + error.text)
        }
    }

})

document.querySelector("input[name='user_name']").addEventListener("input", (e) => {
    e.target.style.border = ".2rem solid #0ef"
})

document.querySelector("input[name='user_email']").addEventListener("input", (e) => {
    e.target.style.border = ".2rem solid #0ef"
})
document.querySelector("textarea[name='user_message']").addEventListener("input", (e) => {
    e.target.style.border = ".2rem solid #0ef"
})