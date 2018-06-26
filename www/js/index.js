var plantas = []
var planta = {}

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

PullToRefresh.init({
  mainElement: '.recarregar',
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

function salvarPlanta() {
  var planta = MobileUI.objectByForm('formNovaPlanta')
  MobileUI.ajax.post('https://plantas.rufine.com.br/plantas', planta, (err, res) => {
    err ? console.log('Erro ao salvar planta') : listarPlantas()
  })
  backPage()
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