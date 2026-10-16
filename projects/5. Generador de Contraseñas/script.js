const passwordOutput = document.querySelector(".password-output");
const copyBtn = document.querySelector(".copy-btn");
const lengthInput = document.querySelector(".length-input");
const lengthValue = document.querySelector(".length-value");
const strengthValue = document.querySelector(".strength-value");
const upperCheck = document.querySelector(".password-uppercase");
const lowerCheck = document.querySelector(".password-lowercase");
const numbersCheck = document.querySelector(".password-numbers");
const symbolsCheck = document.querySelector(".password-symbols");
const generateBtn = document.querySelector(".generate-btn");

lengthInput.value = 6

lengthInput.addEventListener("input", (e) => {
    lengthValue.textContent = e.target.value
})

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+[]{}<>?/|~`-=;:,."
const length = lengthInput.value;



function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let pool = "";
    let password = "";
    let strength = 0
    
    if(useLower) {
        pool += lower;
        strength++;
    }
    if(useUpper) {
        pool += upper; 
        strength++;
    }
    if(useNumbers) {
        pool += numbers;
        strength++;
    }
    if(useSymbols) {
        pool += symbols;
        strength++;
    }

    if (pool === "") {
        return passwordOutput.value = "Selecciona al menos un tipo"
    }

    if(useLower) password += lower[Math.floor(Math.random() * lower.length)];
    if(useUpper) password += upper[Math.floor(Math.random() * upper.length)];
    if(useNumbers) password += numbers[Math.floor(Math.random() * numbers.length)];
    if(useSymbols) password += symbols[Math.floor(Math.random() * symbols.length)];
    

    while (password.length < length){
        password += pool[Math.floor(Math.random() * pool.length)]
    }

    password = password.split("").sort(() => Math.random() - 0.5).join("")

    if (password.length < 8 || strength < 2) strengthValue.textContent = "Débil";
    else if (password.length >= 8 && strength >= 2 && (password.length < 12 || strength < 3)) strengthValue.textContent = "Medio";
    else strengthValue.textContent = "Fuerte";

    return passwordOutput.value = password
}

generateBtn.addEventListener("click", () => {
    const length = lengthInput.value
    const useUpper = upperCheck.checked ? true : false;
    const useLower = lowerCheck.checked ? true : false;
    const useNumbers = numbersCheck.checked ? true : false;
    const useSymbols = symbolsCheck.checked ? true : false;

    generatePassword(length, useUpper, useLower, useNumbers, useSymbols)
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordOutput.value)
    alert("Contraseña Copiada")
})