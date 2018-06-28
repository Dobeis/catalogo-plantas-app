
var plantas = []
var planta = {}
var imagem = ''
MobileUI.ajax.get('https://plantas.rufine.com.br/plantas', (err, res) => {
  if (err) {
    return alert('Zicou a API parça!')
  } else {
    plantas = res.body.plantas
    console.log(plantas);
  }
})

function listarPlantas() {
  MobileUI.ajax.get('https://plantas.rufine.com.br/plantas', (err, res) => {
    if (err) {
      return alert('Zicou a API parça!')
    } else {
      plantas = res.body.plantas
      console.log(plantas);
    }
  })
}

function recarregar() {
  PullToRefresh.init({
    mainElement: '.page',
    onRefresh: function () {
      MobileUI.ajax.get('https://plantas.rufine.com.br/plantas', (err, res) => {
        if (err) {
          return alert('Zicou a API parça!')
        } else {
          plantas = res.body.plantas
          console.log(plantas);
        }
      })
    }
  });
}

function salvarPlanta() {
  var planta = MobileUI.objectByForm('formNovaPlanta')
  planta.imagem = imagem  
  MobileUI.ajax.post('https://plantas.rufine.com.br/plantas', planta, (err, res) => {
  err ? console.log('Erro ao salvar planta') : listarPlantas()
  })
  MobileUI.clearForm('formNovaPlanta')
  // backPage()
}

function detalhesPlanta(params) {
  MobileUI.ajax.get(`https://plantas.rufine.com.br/plantas/${params.id}`, (err, res) => {
    if (err) {
      return alert('Zicou a API parça!')
    } else {
      planta = res.body.planta
      MobileUI.formByObject('formDetalhesPlanta', planta)
    }
  })

}

function deletarPlanta() {
  MobileUI.ajax.delete(`https://plantas.rufine.com.br/plantas/${planta.id}`, (err, res) => {
    err ? console.log('Erro ao deletar planta') : listarPlantas()
  })
  backPage()
}

function alterarPlanta() {
  plantaAlterada = MobileUI.objectByForm('formDetalhesPlanta')
  MobileUI.ajax.put(`https://plantas.rufine.com.br/plantas/${planta.id}`, plantaAlterada, (err, res) => {
    err ? console.log('Erro ao alterar a planta') : listarPlantas()
  })
  backPage()
}

function login() {
  var usuario = MobileUI.objectByForm('formLogin')
  MobileUI.ajax.post('https://plantas.rufine.com.br/usuarios', usuario, (err, res) => {
    if (res.body.message) {
      alert({
        title: res.body.message,
        message: 'Tente novamente',
        buttons: [
          {
            label: 'OK',
            onclick: function () {
              closeAlert();
            }
          }
        ]
      })
    } else {
      openPage('home')
    }
  })
}

function preVizualizarImagem(event) {
  var reader = new FileReader();
  reader.addEventListener("load", function (e) {
    imagem = e.target.result
  })
  reader.onload = function () {
    var output = document.getElementById('previa');
    output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0])
}
