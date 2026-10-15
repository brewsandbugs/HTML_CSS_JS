const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");

const strengthText= document.getElementById("strengthText");
const trackerBar = document.getElementById("trackerBar");
const lengthReq = document.getElementById("length");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");
const capitalReq = document.getElementById("capital");

// show/hide password on btnClick
toggleBtn.addEventListener("click", () => {
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        toggleBtn.textContent = "HIDE";
    }
    else{
        passwordInput.type = "password";
        toggleBtn.textContent = "SHOW";
    }
});

passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;

    // check individual rules
    const hasLength = val.length >= 8;
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);
    const hasBothCases = /[a-z]/.test(val) && /[A-Z]/.test(val);

    // update UI based on requirement
    updateRequirement(lengthReq, hasLength);
    updateRequirement(numberReq, hasNumber);
    updateRequirement(specialReq, hasSpecial);
    updateRequirement(capitalReq, hasBothCases);

    // update the tracker bar based on how many rules are applied
    let passedRules = [hasLength, hasNumber, hasSpecial, 
                            hasBothCases].filter(Boolean).length;

    // update tracker bar progress
    if(val.length === 0){
        trackerBar.style.width = "0%";
        strengthText.textContent = "None";
        strengthText.style.color = "#ef4444";
    } else if(passedRules === 1){
        trackerBar.style.width = "25%";
        trackerBar.style.backgroundColor = "#ef4444";
        strengthText.textContent = "Poor";
        strengthText.style.color = "#ef4444";
    } else if(passedRules === 2){
        trackerBar.style.width = "50%";
        trackerBar.style.backgroundColor = "#f97316";
        strengthText.textContent = "Weak";
        strengthText.style.color = "#f97316";
    } else if(passedRules === 3){
        trackerBar.style.width = "75%";
        trackerBar.style.backgroundColor = "#f59e0b";
        strengthText.textContent = "Moderate";
        strengthText.style.color = "#f59e0b";
    } else if(passedRules === 4){
        trackerBar.style.width = "100%";
        trackerBar.style.backgroundColor = "#10b981";
        strengthText.textContent = "Strong";
        strengthText.style.color = "#10b981";
    }
});

function updateRequirement(element, isValid){
    if(isValid){
        element.classList.add("valid");
        element.classList.remove("invalid");
    } 
    else{
        element.classList.remove("valid");
        element.classList.add("invalid");
    }
}