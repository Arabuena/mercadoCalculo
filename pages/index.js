import { useState } from 'react';

export default function Home() {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [prazo, setPrazo] = useState('imediato');
  const [resultado, setResultado] = useState(null);

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

  const calcular = (e) => {
    e.preventDefault();
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }
    const taxaParcelamento = taxasParcelamento[parcelas];
    const valorComJuros = valorNumerico * (1 + taxaParcelamento);
    const valorParcela = valorComJuros / parcelas;
    const taxaProcessamento = taxasProcessamento[prazo];
    const valorLiquido = valorComJuros * (1 - taxaProcessamento);
    setResultado({
      valorParcela: valorParcela.toFixed(2),
      valorComJuros: valorComJuros.toFixed(2),
      taxaParcelamento: (taxaParcelamento * 100).toFixed(2),
      taxaProcessamento: (taxaProcessamento * 100).toFixed(2),
      valorLiquido: valorLiquido.toFixed(2),
    });
  };

  return (
    <div>
      <h1>Calculadora de Preços Mercado Pago</h1>
      <form onSubmit={calcular}>
        <div>
          <label>Valor do Serviço/Produto (R$):</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Número de Parcelas:</label>
          <select
            value={parcelas}
            onChange={(e) => setParcelas(parseInt(e.target.value))}
          >
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}x
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Prazo de Recebimento:</label>
          <select value={prazo} onChange={(e) => setPrazo(e.target.value)}>
            <option value="imediato">Im
::contentReference[oaicite:0]{index=0}
 
