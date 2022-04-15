 const container = document.querySelector(".container")
 const rua = container.querySelector("#rua")
 const bairro = container.querySelector("#bairro")
 const cidade = container.querySelector("#cidade")
 const estado = container.querySelector("#estado")
 const uf = container.querySelector("#uf")
 const numero = container.querySelector("#numero")
 const carregando = container.querySelector(".loading")

 //-----------------------------------------------------APRENDENDO A POPULAR UM SELECT
addEventListener('load',function carregandoUF(){
  fetch("https://brasilapi.com.br/api/ibge/uf/v1", {method:"GET"})
    .then(function (response) {
    return response.json()
  })
  .then(function (conteudo) {
    conteudo.forEach((value)=>{
    option = new Option(value.sigla, value.sigla)
     //console.log(option)
     uf.options[uf.options.length] = option
    console.log(option.value)
    })
  })
}).sort(ordenar)
function ordenar(a,b){
  return a.value - b.value;
}
//  UF.forEach((value)=>{
//    //option = new Option(ufs, ufs.toLocaleLowerCase())
//    //uf.options[uf.options.length] = option
//   option = new Option(value.sigla, value.sigla)
//   uf.options[uf.options.length] = option
//  });


//-------------------------------------------------------------------------------------

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
      return response.json();
    })
    .then(function (conteudo) {
      //Atualiza os campos com os valores.
      rua.value = conteudo.logradouro
      bairro.value = conteudo.bairro
      cidade.value = conteudo.localidade
      uf.value = conteudo.uf;
    })

    //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      rua.value = "...";
      bairro.value = "...";
      cidade.value = "...";
      uf.value = "...";
      carregando.style.display = "block"
      setInterval(formularioCarregando, 1000);
    }
    else {
      //cep é inválido.
      limpa_formulário_cep()
      alert("Formato de CEP inválido.")
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep()
  }
}
    //  .catch( err => limpa_formulario_cep()) //NÃO ESTÁ LIMPANDO
    //    alert("CEP não encontrado.")
