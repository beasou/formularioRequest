 const container = document.querySelector(".container")
 const rua = container.querySelector("#rua")
 const bairro = container.querySelector("#bairro")
 const cidade = container.querySelector("#cidade")
 const estado = container.querySelector("#estado")
 const uf = container.querySelector("#uf")
 const numero = container.querySelector("#numero")
 const carregando = container.querySelector(".loading")

 //----------------------------------------------------- POPULANDO O SELECT
 
//assim que a pagina é carregada o select é populado com os dados da api
addEventListener('load',function carregandoUF(){
  fetch("https://brasilapi.com.br/api/ibge/uf/v1", {method:"GET"})
    .then(function (response) {
    return response.json()
  })
  .then(function (conteudo) {
    conteudo.sort(ordenar)
    conteudo.forEach((value)=>{
    option = new Option(value.sigla, value.sigla)
     uf.options[uf.options.length] = option
    })
  })
})

//função para ordenar o select
function ordenar(a,b){ 
  return a.sigla.localeCompare(b.sigla)
}

//--------------------------------------------------------------FUNÇÕES DE CEP
function formularioCarregando() {
  carregando.style.display = "none";
}

function limpa_formulario_cep() {
  //Limpa valores do formulário de cep.
  rua.value = ""
  bairro.value = ""
  cidade.value = ""
  estado.value = ""
  uf.value = ""
  numero.value = ""
  carregando.style.display= "none"
}

function obterEndereco() {
  const cep = container.querySelector("#cep").value.replace(/\D/g, "")

  fetch("https://viacep.com.br/ws/" + cep + "/json/", { method: "GET" })
    .then(function (response) {
      return response.json()
    })
    .then(function (conteudo) {
      //Atualiza os campos com os valores.
      rua.value = conteudo.logradouro
      bairro.value = conteudo.bairro
      cidade.value = conteudo.localidade
      uf.value = conteudo.uf
    })

    //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      rua.value = "..."
      bairro.value = "..."
      cidade.value = "..."
      uf.value = "..."
      carregando.style.display = "block"
      setInterval(formularioCarregando, 1000)
    }
    else {
      //cep é inválido.
      limpa_formulario_cep()
      alert("Formato de CEP inválido.")
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep()
  }
}


//-------------------------------------------------MÁSCARA DE CEP 00000-000 E BUSCA
function mascaraCEP(cep){
  var valorcep = document.getElementById("cep").attributes[0].ownerElement['value']
  
  var retornocep = valorcep.replace(/\D/g, "")
  // retornocep = retornocep.replace(/^/, "")

  if(retornocep.length > 7){
    retornocep = retornocep.replace(/^(\d{5})(\d{3}).*/, "$1-$2")
    obterEndereco() 
  }
  else {
  if(retornocep.length != 0){
    retornocep = retornocep.replace(/^(\d*)/, "$1")
  }
}
document.getElementById("cep").attributes[0].ownerElement['value'] = retornocep
}