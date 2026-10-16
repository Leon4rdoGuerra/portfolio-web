const menuBtn = document.querySelector(".menu-icon")
const navBar = document.querySelector(".navbar")
const sections = document.querySelectorAll(".navbar a")

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    navBar.classList.toggle("open")
})

sections.forEach(section => section.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    navBar.classList.toggle("open")
}))