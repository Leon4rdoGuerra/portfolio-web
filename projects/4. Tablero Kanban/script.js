todoCards = document.querySelector(".toDo-cards")
progressCards = document.querySelector(".inProgress-cards")
completedCards = document.querySelector(".completed-cards")
todoColumn = document.querySelector(".toDo-column")
progressColumn = document.querySelector(".inProgress-column")
completedColumn = document.querySelector(".completed-column")
addTaksBtn = document.querySelector(".add-btn")
deleteZone = document.querySelector(".delete-zone")
isOpen = false

addTaksBtn.addEventListener("click", () => {
    if (isOpen == true) {
        return
    } else {
        if (todoCards.children.length < 3) {
            openModal()  
        } else {
            alert("No puedes tener mas de 3 tareas activas")
        }
    }
})

function openModal() {
    modal = document.createElement("div")
    modal.classList.add("modal-container")
    modal.innerHTML = `
    <div class="overlay"></div>
    <div class="modal">
    <label for="title-input" class="title-label">Titulo</label>
            <input type="text" maxlength="10" class="title-input" id="title-input">
            <label for="description-input" class="description-label">Descripcion</label>
            <input type="text" maxlength="100" class="description-input" id="description-input">
            <label for="important-check" class="check-label">Urgente
                <input type="checkbox" class="important-check" id="important-check">
            </label>
            <button class="create-btn">Crear</button>
        </div>
    `
    document.body.append(modal)
    isOpen = true;
    document.body.style.overflowY = "hidden"

    createBtn = modal.querySelector(".create-btn")
    titleInput = modal.querySelector(".title-input")
    descriptionInput = modal.querySelector(".description-input")
    urgentCheck = modal.querySelector(".important-check")

    titleInput.focus()
    createBtn.addEventListener("click", () => {
        title = titleInput.value.trim();
        desc = descriptionInput.value.trim();
        urgent = urgentCheck.checked
        column = document.querySelector(".toDo-cards")
        
        
        if(title === "" || desc === "") {
            alert("Cada tarea debe tener titulo y descripcion");
            titleInput.focus()
            return; // no cerrar modal
        }
        
        createCard(title, desc, urgent, column)
        modal.remove()
        isOpen = false
        document.body.style.overflowY = ""
    })
}

function createCard(title, desc, urgent, column) {
    card = document.createElement("div")
    card.classList.add("card")
    card.setAttribute("draggable", "true")
    card.innerHTML = `
    <div class="card-title">${title}</div>
    <div class="card-description">${desc}</div>    
    `
    console.log(urgent)
    if (urgent) {
        card.innerHTML += `<div class="urgent-badge"></div>`
    }
    column.append(card)
    
    card.addEventListener("dragstart", (e) => {
        e.target.id = "card-" + Date.now();
        e.dataTransfer.setData("cardID", e.target.id)
        e.dataTransfer.setData("card", e.target.innerHTML)
    })
    
    card.addEventListener("dblclick", (e) => {
        const targetCard = e.currentTarget;
        if (targetCard.parentElement.classList.contains("toDo-cards")) {columnID = document.querySelector(".toDo-cards")}
        else if (targetCard.parentElement.classList.contains("inProgress-cards")) {columnID = document.querySelector(".inProgress-cards")}
        else {columnID = document.querySelector(".completed-cards")}

        currentTitle = targetCard.querySelector(".card-title").textContent;
        currentDesc = targetCard.querySelector(".card-description").textContent;
        currentUrgent = targetCard.querySelector(".urgent-badge") ? true:false
        currentColumn = columnID
        targetCard.remove();
        openEditModal(currentTitle, currentDesc, currentUrgent, currentColumn)
    })
    saveCardsToLocalStorage()
}

function openEditModal(currentTitle, currentDesc, currentUrgent, currentColumn) {
    modal = document.createElement("div")
    modal.classList.add("modal-container")
    modal.innerHTML = `
    <div class="overlay"></div>
    <div class="modal">
    <label for="title-input" class="title-label">Titulo</label>
            <input type="text" maxlength="10" class="title-input" id="title-input" value="${currentTitle}">
            <label for="description-input" class="description-label">Descripcion</label>
            <input type="text" maxlength="100" class="description-input" id="description-input" value="${currentDesc}">
            <label for="important-check" class="check-label">Urgente
                <input type="checkbox" class="important-check" id="important-check">
            </label>
            <button class="create-btn">Crear</button>
        </div>
    `
    if (currentUrgent) {
        modal.querySelector(".important-check").checked = true
    }
    document.body.append(modal)
    isOpen = true;
    document.body.style.overflowY = "hidden"
    
    createBtn = modal.querySelector(".create-btn")
    titleInput = modal.querySelector(".title-input")
    descriptionInput = modal.querySelector(".description-input")
    urgentCheck = modal.querySelector(".important-check")
    
    titleInput.focus()
    createBtn.addEventListener("click", () => {
        title = titleInput.value;
        desc = descriptionInput.value;
        urgent = urgentCheck.checked
        column = currentColumn
        
        if(title === "" || desc === "") {
            alert("Cada tarea debe tener titulo y descripcion");
            titleInput.focus()
            return; // no cerrar modal
        }

        createCard(title, desc, urgent, column)
        modal.remove()
        isOpen = false
        document.body.style.overflowY = ""
    })
}



deleteZone.addEventListener("dragover", (e) => {
    deleteZone.style.boxShadow = "0 0 1rem #e44"
    e.preventDefault()
})

deleteZone.addEventListener("dragleave", (e) => {
    deleteZone.style.boxShadow = ""
})

deleteZone.addEventListener("drop", (e) => {
    deleteZone.style.boxShadow = ""
    cardID = e.dataTransfer.getData("cardID");
    const card = document.getElementById(cardID);
    if (card) {
        card.remove();
    }
    saveCardsToLocalStorage()
})

todoCards.addEventListener("dragover", (e) => {
    e.preventDefault()
})
progressCards.addEventListener("dragover", (e) => {
    e.preventDefault()
})
completedCards.addEventListener("dragover", (e) => {
    e.preventDefault()
})

todoCards.addEventListener("drop", (e) => {
    data = e.dataTransfer.getData("card")
    cardID = e.dataTransfer.getData("cardID")

    if (data.includes("div")) {
        if (todoCards.children.length < 3) {
            card = document.createElement("div")
            card.classList.add("card")
            card.setAttribute("draggable", "true")
            card.innerHTML = data
            todoCards.append(card)
            card.addEventListener("dragstart", (e) => {
                e.target.id = "card-" + Date.now();
                e.dataTransfer.setData("cardID", e.target.id)
                e.dataTransfer.setData("card", e.target.innerHTML)
            })
            card.addEventListener("dblclick", (e) => {
                const targetCard = e.currentTarget;
                if (targetCard.parentElement.classList.contains("toDo-cards")) {columnID = document.querySelector(".toDo-cards")}
                else if (targetCard.parentElement.classList.contains("inProgress-cards")) {columnID = document.querySelector(".inProgress-cards")}
                else {columnID = document.querySelector(".completed-cards")}

                currentTitle = targetCard.querySelector(".card-title").textContent;
                currentDesc = targetCard.querySelector(".card-description").textContent;
                currentUrgent = targetCard.querySelector(".urgent-badge") ? true:false
                currentColumn = columnID
                targetCard.remove();
                openEditModal(currentTitle, currentDesc, currentUrgent, currentColumn)
            })
            const originalCard = document.getElementById(cardID);
            if (originalCard) {
                originalCard.remove();
            }
            saveCardsToLocalStorage()
        } else {
            alert("No puedes tener mas de 3 tareas activas")
        }
    } else {
        return
    }
})

progressCards.addEventListener("drop", (e) => {
    data = e.dataTransfer.getData("card")
    cardID = e.dataTransfer.getData("cardID")
    if (data.includes("div")) {  
        if (progressCards.children.length < 3) {
            card = document.createElement("div")
            card.classList.add("card")
            card.setAttribute("draggable", "true")
            card.innerHTML = data
            progressCards.append(card)
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("card", e.target.innerHTML)
                e.target.id = "card-" + Date.now();
                e.dataTransfer.setData("cardID", e.target.id)
            })
            card.addEventListener("dblclick", (e) => {
                const targetCard = e.currentTarget;
                if (targetCard.parentElement.classList.contains("toDo-cards")) {columnID = document.querySelector(".toDo-cards")}
                else if (targetCard.parentElement.classList.contains("inProgress-cards")) {columnID = document.querySelector(".inProgress-cards")}
                else {columnID = document.querySelector(".completed-cards")}

                currentTitle = targetCard.querySelector(".card-title").textContent;
                currentDesc = targetCard.querySelector(".card-description").textContent;
                currentUrgent = targetCard.querySelector(".urgent-badge") ? true:false
                currentColumn = columnID
                targetCard.remove();
                openEditModal(currentTitle, currentDesc, currentUrgent, currentColumn)
            })
            const originalCard = document.getElementById(cardID);
            if (originalCard) {
                originalCard.remove();
            }
            saveCardsToLocalStorage()
        } else {
            alert("No puedes tener mas de 3 tareas activas")
        }
    } else {
        return
    }
})
completedCards.addEventListener("drop", (e) => {
    data = e.dataTransfer.getData("card")
    cardID = e.dataTransfer.getData("cardID")

    if (data.includes("div")) {
        if (completedCards.children.length < 3) {
            card = document.createElement("div")
            card.classList.add("card")
            card.setAttribute("draggable", "true")
            card.innerHTML = data
            completedCards.append(card)
            card.addEventListener("dragstart", (e) => {
                e.target.id = "card-" + Date.now();
                e.dataTransfer.setData("cardID", e.target.id)
                e.dataTransfer.setData("card", e.target.innerHTML)
            })
            card.addEventListener("dblclick", (e) => {
                const targetCard = e.currentTarget;
                if (targetCard.parentElement.classList.contains("toDo-cards")) {columnID = document.querySelector(".toDo-cards")}
                else if (targetCard.parentElement.classList.contains("inProgress-cards")) {columnID = document.querySelector(".inProgress-cards")}
                else {columnID = document.querySelector(".completed-cards")}

                currentTitle = targetCard.querySelector(".card-title").textContent;
                currentDesc = targetCard.querySelector(".card-description").textContent;
                currentUrgent = targetCard.querySelector(".urgent-badge") ? true:false
                currentColumn = columnID
                targetCard.remove();
                openEditModal(currentTitle, currentDesc, currentUrgent, currentColumn)
            })
            const originalCard = document.getElementById(cardID);
            if (originalCard) {
                originalCard.remove();
            }
            saveCardsToLocalStorage()
        } else {
            alert("No puedes tener mas de 3 tareas activas")
        }
    } else {
        return
    }
})

function saveCardsToLocalStorage() {
    cards = Array.from(document.querySelectorAll(".card")).map(card => ({
        title: card.querySelector('.card-title').textContent,
        desc: card.querySelector(".card-description").textContent,
        urgent: card.querySelector(".urgent-badge") ? true : false,
        column: card.parentNode.classList[0]
    }))
    localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCardsFromLocalStorage() {
    savedCards = JSON.parse(localStorage.getItem('cards')) || []
    savedCards.forEach(({title, desc, urgent, column}) => createCard(title, desc, urgent, document.querySelector(`.${column}`)))
}

loadCardsFromLocalStorage()