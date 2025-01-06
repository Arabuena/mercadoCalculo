document.getElementById('calculadora-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Valor líquido que o cliente quer receber
  const valorLiquido = parseFloat(document.getElementById('valor').value);
  const parcelas = parseInt(document.getElementById('parcelas').value);
  const prazo = document.getElementById('prazo').value;
  const taxaAdicional = parseFloat(document.getElementById('taxa-adicional').value) || 0;

  // Verifica se o valor líquido é válido
  if (isNaN(valorLiquido) || valorLiquido <= 0) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  // Taxas de processamento e parcelamento
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

  // Exibição do resultado
  document.getElementById('resultado').innerHTML = `
    <h2>Resultado:</h2>
    <p><strong>Valor que você quer receber (R$):</strong> R$ ${valorLiquido.toFixed(2)}</p>
    <p><strong>Valor bruto necessário para cobrar:</strong> R$ ${valorBruto.toFixed(2)}</p>
    <p><strong>Valor com taxa adicional (%):</strong> R$ ${valorComTaxa.toFixed(2)}</p>
    <p><strong>Valor da parcela:</strong> R$ ${valorParcela.toFixed(2)}</p>
    <p><strong>Taxa de Parcelamento:</strong> ${(taxaParcelamento * 100).toFixed(2)}%</p>
    <p><strong>Taxa de Processamento:</strong> ${(taxaProcessamento * 100).toFixed(2)}%</p>
    <p><strong>Valor total a ser cobrado para receber o valor desejado:</strong> R$ ${valorComTaxa.toFixed(2)}</p>
  `;
});
