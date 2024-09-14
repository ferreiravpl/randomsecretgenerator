let inputSlider = document.getElementById("inputPasswordSize");
let inputSliderValue = document.getElementById("inputPasswordSizeValue");
let inputPassword = document.getElementById("inputPassword");
let lowercaseCheckbox = document.getElementById("lowerCaseLetters");
let uppercaseCheckbox = document.getElementById("upperCaseLetters");
let numbersCheckbox = document.getElementById("numbers");
let specialCharactersCheckbox = document.getElementById("specialCharacters");
let generatePasswordButton = document.getElementById("generatePasswordButton");
let copyIcon = document.getElementById("copyIcon");

//Exibe o valor default do input range
inputSliderValue.textContent = inputSlider.value;

//EventListener para definir novo tamanho da senha no input range (caso haja alteração)
inputSlider.addEventListener('input', ()=>{
    inputSliderValue.textContent = inputSlider.value;
});

//EventListener para o botão de gerar senha chamar a função generatePassword e exibir o valor no "inputPassword" do HTML
generatePasswordButton.addEventListener('click', ()=>{
    inputPassword.value = generatePassword();
})

//Armazenando os possíveis valores em variáveis
let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let specialCharacters = "~!@#$%^&*";

//Função para gerar a senha
function generatePassword(){

    //Checa se existem checkboxes marcados
    validateCheckedParameters();

    //Cria as variáveis para armazenar a senha gerada e também os possíveis caracteres para gerar a senha
    let generatedPassword = "";
    let possiblePasswordChars = "";

    //Valida quais checkboxes estão marcados, para adicionar os respectivos valores na variável de possíveis caracteres
    possiblePasswordChars += lowercaseCheckbox.checked ? lowerCaseLetters : "";
    possiblePasswordChars += uppercaseCheckbox.checked ? upperCaseLetters : "";
    possiblePasswordChars += numbersCheckbox.checked ? numbers : "";
    possiblePasswordChars += specialCharactersCheckbox.checked ? specialCharacters : "";

    let i = 1;

    //Inicia o loop de preenchimento da senha final, do índice 1 até o tamanho definido no input de range
    while(i<=inputSlider.value){
        generatedPassword += possiblePasswordChars.charAt(Math.floor(Math.random() * possiblePasswordChars.length));
        i++;
    }

    return generatedPassword;
}

//Função para validar os checkboxes marcados
function validateCheckedParameters () {
    if (!lowercaseCheckbox.checked && !uppercaseCheckbox.checked && !numbersCheckbox.checked && !specialCharactersCheckbox.checked) {
        window.alert("Selecione ao menos um checkbox!")
    }
}

//EventListener para copiar a senha
copyIcon.addEventListener('click', ()=>{
    if(inputPassword.value != "" || inputPassword.value.length >=1){
        navigator.clipboard.writeText(inputPassword.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Senha copiada";
    }
});