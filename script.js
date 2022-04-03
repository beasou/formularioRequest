function telefone() {
  if (document.getElementById("yes").checked == true) {
    document.getElementById("tel").hidden = false;
    document.getElementById("tel").disabled = false;
    document.getElementById("tel").value = "";
  }
  if (document.getElementById("no").checked == true) {
    document.getElementById("tel").hidden = true;
  }
}

function checarCadastro() {
  if (document.getElementById("yes").checked == true) {
    alert("Digite um número de Telefone");
  }
}
