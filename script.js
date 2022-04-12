let displayphone = document.querySelector(".displayphone")
let selecionado = document.getElementById("yes")


function telefone() {
  if (selecionado.checked == true) {
    displayphone.style.display = "block"
  }
  if (selecionado.checked == false) {
    displayphone.style.display = "none"
  }
}

function checarCadastro() {
  if (document.getElementById("tel").value == "") {
    alert("Digite um número de Telefone");
  }
}