document.getElementById('calculadora-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const valorLiquido = parseFloat(document.getElementById('valor').value);
  const parcelas = parseInt(document.getElementById('parcelas').value);
  const prazo = document.getElementById('prazo').value;
  const taxaAdicional = parseFloat(document.getElementById('taxa-adicional').value) || 0;

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

  // Calculando o valor bruto necessário para receber o valor líquido desejado
  const valorBruto = valorLiquido / (1 - (taxaParcelamento + taxaProcessamento));

  // Calculando o valor com a taxa adicional
  const valorComTaxa = valorBruto * (1 + taxaAdicional / 100);

  // Calculando o valor da parcela
  const valorParcela = valorComTaxa / parcelas;

  // Calculando o valor total com taxas
  const valorTotal = valorComTaxa + (valorComTaxa * (taxaParcelamento + taxaProcessamento));

  document.getElementById('resultado').innerHTML = `
    <h2>Resultado:</h2>
    <p>Valor líquido desejado: R$ ${valorLiquido.toFixed(2)}</p>
    <p>Valor bruto necessário para cobrar: R$ ${valorBruto.toFixed(2)}</p>
    <p>Valor com taxa adicional: R$ ${valorComTaxa.toFixed(2)}</p>
    <p>Valor da parcela: R$ ${valorParcela.toFixed(2)}</p>
    <p>Taxa de Parcelamento: ${(taxaParcelamento * 100).toFixed(2)}%</p>
    <p>Taxa de Processamento: ${(taxaProcessamento * 100).toFixed(2)}%</p>
    <p>Valor total a ser cobrado para receber o valor desejado: R$ ${valorComTaxa.toFixed(2)}</p>
  `;
});
