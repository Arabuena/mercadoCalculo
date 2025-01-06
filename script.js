// Evento de envio do formulário
document.getElementById('calculadora-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const valorLiquido = parseFloat(document.getElementById('valor').value);
  const parcelas = parseInt(document.getElementById('parcelas').value);
  const prazo = document.getElementById('prazo').value;

  if (isNaN(valorLiquido) || valorLiquido <= 0) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  const taxasProcessamento = {
    imediato: 0.0531,
    '14 dias': 0.0436,
    '30 dias': 0.036,
  };

  const taxasParcelamento = {
    1: 0,
    2: 0.0459,
    3: 0.0597,
    4: 0.0733,
    5: 0.0866,
    6: 0.0996,
    7: 0.1124,
    8: 0.125,
    9: 0.1373,
    10: 0.1493,
    11: 0.1612,
    12: 0.1728,
  };

  const taxaParcelamento = taxasParcelamento[parcelas];
  const taxaProcessamento = taxasProcessamento[prazo];

  const valorTaxaParcelamento = valorLiquido * taxaParcelamento;
  const valorTaxaProcessamento = valorLiquido * taxaProcessamento;
  const valorTotalComJuros = valorLiquido + valorTaxaParcelamento + valorTaxaProcessamento;
  const valorParcela = parcelas > 1 ? valorTotalComJuros / parcelas : valorTotalComJuros;
  const taxaTotal = valorTaxaParcelamento + valorTaxaProcessamento;

  document.getElementById('resultado').innerHTML = `
    <h2>Resultado:</h2>
    <p><strong>Valor que você quer receber (R$):</strong> R$ ${valorLiquido.toFixed(2)}</p>
    <p><strong>Valor Total com Juros (R$):</strong> R$ ${valorTotalComJuros.toFixed(2)}</p>
    <p><strong>Valor da Parcela (R$):</strong> R$ ${valorParcela.toFixed(2)}</p>
    <p><strong>Taxa de Parcelamento:</strong> ${(taxaParcelamento * 100).toFixed(2)}% = R$ ${valorTaxaParcelamento.toFixed(2)}</p>
    <p><strong>Taxa de Processamento:</strong> ${(taxaProcessamento * 100).toFixed(2)}% = R$ ${valorTaxaProcessamento.toFixed(2)}</p>
    <p><strong>Taxa Total:</strong> R$ ${taxaTotal.toFixed(2)}</p>
  `;
});

// PWA: Adicionar funcionalidade de instalação
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-button').style.display = 'block';
});

document.getElementById('install-button').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA instalado com sucesso.');
      } else {
        console.log('PWA não foi instalado.');
      }
      deferredPrompt = null;
    });
  }
});
