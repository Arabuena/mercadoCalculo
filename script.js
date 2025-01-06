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

  // Taxas de processamento
  const taxasProcessamento = {
    imediato: 0.0531,
    '14 dias': 0.0436,
    '30 dias': 0.036,
  };

  // Taxas de parcelamento
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

  // Calcular a taxa de parcelamento e de processamento
  const taxaParcelamento = taxasParcelamento[parcelas];
  const taxaProcessamento = taxasProcessamento[prazo];

  // Calcular o valor bruto necessário para que, após deduzir as taxas, o valor líquido seja o desejado
  const valorBruto = valorLiquido / (1 - taxaParcelamento - taxaProcessamento);

  // Calcular o valor das taxas
  const valorTaxaParcelamento = valorBruto * taxaParcelamento;
  const valorTaxaProcessamento = valorBruto * taxaProcessamento;

  // Calcular o valor total com todas as taxas
  const valorComTaxas = valorBruto + valorTaxaParcelamento + valorTaxaProcessamento;

  // Calcular o valor da parcela
  const valorParcela = valorComTaxas / parcelas;

  // Calcular a taxa total (somatória de todas as taxas)
  const taxaTotal = valorTaxaParcelamento + valorTaxaProcessamento;

  // Exibição do resultado
  document.getElementById('resultado').innerHTML = `
    <h2>Resultado:</h2>
    <p><strong>Valor que você quer receber (R$):</strong> R$ ${valorLiquido.toFixed(2)}</p>
    <p><strong>Valor Bruto Necessário para Cobrar (R$):</strong> R$ ${valorBruto.toFixed(2)}</p>
    <p><strong>Valor Total com Juros (R$):</strong> R$ ${valorComTaxas.toFixed(2)}</p>
    <p><strong>Valor da Parcela (R$):</strong> R$ ${valorParcela.toFixed(2)}</p>
    <p><strong>Taxa de Parcelamento:</strong> ${(taxaParcelamento * 100).toFixed(2)}% = R$ ${valorTaxaParcelamento.toFixed(2)}</p>
    <p><strong>Taxa de Processamento:</strong> ${(taxaProcessamento * 100).toFixed(2)}% = R$ ${valorTaxaProcessamento.toFixed(2)}</p>
    <p><strong>Valor a Cobrar do Cliente (Valor Bruto + Todas as Taxas):</strong> R$ ${valorComTaxas.toFixed(2)}</p>
    <p><strong>Taxa Total (Parcelamento + Processamento):</strong> R$ ${taxaTotal.toFixed(2)}</p>
  `;
});
