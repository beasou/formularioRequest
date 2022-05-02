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


function mascaraFone(event) { //função para criar mascarar o telefone
  //"pega" o valor digitado no campo telefone e add no proprio elemento
  var valor = document.getElementById("tel").attributes[0].ownerElement['value'];
  
  var retorno = valor.replace(/\D/g, "")// o valor do elemento é atribuido a var retorno
  retorno = retorno.replace(/^0/, "")//apenas os caracterem sem simbolos

  if (retorno.length > 10) { 
    //se o tamanho for maior que 10, o retorno sera reajustado em ddd, 5caracteres, 4caracteres separados por "-", definido pela expressão abaixo(formato celular)
    retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (retorno.length > 5) {
    if (retorno.length == 6 && event.code == "Backspace") { 
      // necessário pois senão o "-" fica sempre voltando ao dar backspace
      return; 
    } 
    retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3"); //formato tel fixo
  } else if (retorno.length > 2) {
    retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2"); //somente ddd sem ")"
  } else {
    if (retorno.length != 0) {
      retorno = retorno.replace(/^(\d*)/, "($1");
      console.log(retorno)
    }
  }
  document.getElementById("tel").attributes[0].ownerElement['value'] = retorno;
}



function checarCadastro() {
  if (document.getElementById("tel").value == "") {
    alert("Digite um número de Telefone");
  }
}