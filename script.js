 //Variáveis para serem utilizadas no script;
let inputPasswordSpan = document.getElementById("inputPasswordSizeValue");
let inputPasswordRange = document.getElementById("inputPasswordSize");
let inputPassword = document.getElementById("inputPassword");
let lowercaseCheckbox = document.getElementById("lowerCaseLetters");
let uppercaseCheckbox = document.getElementById("upperCaseLetters");
let numbersCheckbox = document.getElementById("numbers");
let specialCharactersCheckbox = document.getElementById("specialCharacters");
let generatePasswordButton = document.getElementById("generatePasswordButton");
let copyIcon = document.getElementById("copyIcon");
let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let specialCharacters = "~!@#$%^&*"
let possiblePasswordChars = "";

//Exibe o valor default do input range;
inputPasswordSpan.textContent = inputPasswordRange.value;

//EventListener para definir novo tamanho da senha no input range (caso haja alteração);
inputPasswordRange.addEventListener('input', ()=>{
    inputPasswordSpan.textContent = inputPasswordRange.value;
});

//EventListener para o botão de gerar senha chamar a função generatePassword e exibir o valor no "inputPassword" do HTML;
generatePasswordButton.addEventListener('click', ()=>{
    inputPassword.value = generatePassword();
})

//Função para gerar a senha
function generatePassword(){

    //Cria as variáveis para armazenar a senha que será gerada, além de seu tamanho;
    let generatedPassword = "";
    let passwordSizeChosenByUser = inputPasswordRange.value;
  
    //Checa se existem checkboxes marcados e suas quantidades para seguir o fluxo;
    if (!validateCheckboxes(passwordSizeChosenByUser)) {
        return inputPassword.value = "";
    }

    //Inicia o preenchimento da senha com caracteres do checkbox;
    generatedPassword = fillWithCheckboxesChars(generatedPassword);

    //Preenche o resto da senha com caracteres aleatórios;
    for (let i = generatedPassword.length; i < passwordSizeChosenByUser; i++) {
        generatedPassword += possiblePasswordChars.charAt(Math.floor(Math.random() * possiblePasswordChars.length));
    }
    //Retorna a senha final gerada;
    return generatedPassword;
}

//Função para validar os checkboxes marcados e se estão de acordo com o tamanho da senha;
function validateCheckboxes (passwordSizeChosenByUser) {
    let totalCheckParameters = document.querySelectorAll('input[name=checkParameter]:checked').length;

    if (totalCheckParameters === 0) {
        window.alert("Selecione ao menos um checkbox!")
        return false;
    }

    if (passwordSizeChosenByUser < totalCheckParameters) {
        window.alert("O tamanho da senha não pode ser menor do que a quantidade de checkboxes selecionadas!");
        return false;
    }

    return true;
}

//Função para iniciar o preenchimento da senha com caracteres do checkbox (garante que tenha ao menos um tipo de caracter de cada checkbox marcado);
function fillWithCheckboxesChars(generatedPassword) {
    if (lowercaseCheckbox.checked) {
        generatedPassword += getRandomCharacter(lowerCaseLetters);
        possiblePasswordChars += lowerCaseLetters;
    }

    if (uppercaseCheckbox.checked) {
        generatedPassword += getRandomCharacter(upperCaseLetters);
        possiblePasswordChars += upperCaseLetters;
    }

    if (numbersCheckbox.checked) {
        generatedPassword += getRandomCharacter(numbers);
        possiblePasswordChars += numbers;
    }

    if (specialCharactersCheckbox.checked) {
        generatedPassword += getRandomCharacter(specialCharacters);
        possiblePasswordChars += specialCharacters;
    }

    return generatedPassword;
}

//Função para buscar um caracter aleatório de cada checkbox;
function getRandomCharacter(charsFromCheckedCheckbox) {
    return charsFromCheckedCheckbox.charAt(Math.floor(Math.random() * charsFromCheckedCheckbox.length));
}

//EventListener para copiar a senha
copyIcon.addEventListener('click', ()=>{
    if (inputPassword.value != "") {
        navigator.clipboard.writeText(inputPassword.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Senha copiada";
    }
});