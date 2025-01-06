document.getElementById('calculadora-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const parcelas = parseInt(document.getElementById('parcelas').value);
  const prazo = document.getElementById('prazo').value;
  const taxaAdicional = parseFloat(document.getElementById('taxa-adicional').value) || 0;

  if (isNaN(valor) || valor <= 0) {
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
  const valorComJuros = valor * (1 + taxaParcelamento);
  const valorComTaxa = valorComJuros * (1 + taxaAdicional / 100);
  const valorParcela = valorComTaxa / parcelas;
  const taxaProcessamento = taxasProcessamento[prazo];
  const valorLiquido = valorComTaxa * (1 - taxaProcessamento);

  document.getElementById('resultado').innerHTML = `
    <h2>Resultado:</h2>
    <p>Valor com Juros: R$ ${valorComJuros.toFixed(2)}</p>
    <p>Valor com Taxa Adicional: R$ ${valorComTaxa.toFixed(2)}</p>
    <p>Valor da Parcela: R$ ${valorParcela.toFixed(2)}</p>
    <p>Taxa de Parcelamento: ${(taxaParcelamento * 100).toFixed(2)}%</p>
    <p>Taxa de Processamento: ${(taxaProcessamento * 100).toFixed(2)}%</p>
    <p>Valor Líquido: R$ ${valorLiquido.toFixed(2)}</p>
  `;
});
