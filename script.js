document.getElementById('calculadora-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const parcelas = parseInt(document.getElementById('parcelas').value);
  const prazo = document.getElementById('prazo').value;

  if (isNaN(valor) || valor <= 0) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  const taxasProcessamento = {
    'imediato': 0.0531,
    '14_dias': 0.0436,
    '30_dias': 0.0360,
  };

  const taxasParcelamento = {
    1: 0,
    2: 0.0459,
    3: 0.0597,
    4: 0.0733,
    5: 0.0866,
    6: 0.0996,
    7: 0.1124,
    8: 0.1250,
    9: 0.1373,
    10: 0.1493,
    11: 0.1612,
    12: 0.1728,
  };

  const taxaProcessamento = taxasProcessamento[prazo];
  const taxaParcelamento = taxasParcelamento[parcelas];

  const valorComJuros = valor * (1 + taxaParcelamento);
  const valorParcela = valorComJuros / parcelas;
  const valorLiquido = valorComJuros * (1 - taxaProcessamento);

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <p>Valor Total com Juros: R$ ${valorComJuros.toFixed(2)}</p>
    <p>Valor de Cada Parcela (${parcelas}x): R$ ${valorParcela.toFixed(2)}</p>
    <p>Taxa de Parcelamento: ${(taxaParcelamento * 100).toFixed(2)}%</p>
    <p>Taxa de Processamento: ${(taxaProcessamento * 100).toFixed(2)}%</p>
    <p>Valor Líquido a Receber: R$ ${valorLiquido.toFixed(2)}</p>
  `;
  resultadoDiv.style.display = 'block';
});
