import { useState } from 'react';

// Incluindo mensagem de erro
function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [erro, setErro] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();

    // Verifica se a altura contém vírgula ou ponto
    if (altura.includes(',') || altura.includes('.')) {
      setErro('Por gentileza, utilizar valores em centímetros.');
      return;
    }

    // Remove a mensagem de erro se os dados estiverem corretos
    setErro('');

    const alturaMetros = parseFloat(altura) / 100; // Convertendo cm para metros
    const imcCalculado = Math.round(peso / (alturaMetros * alturaMetros));

    setImc(imcCalculado);

    if (imcCalculado < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
      setClassificacao('Peso normal');
    } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
      setClassificacao('Sobrepeso');
    } else {
      setClassificacao('Obesidade');
    }
  };

  return (
    <div className="App">
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC}>
        <div>
          <label>Altura (cm):</label>
          <input 
            type="text" 
            value={altura} 
            onChange={(e) => setAltura(e.target.value)} 
            placeholder="Ex: 181 'cm'"
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <div>
          <label>Peso (kg):</label>
          <input 
            type="number" 
            value={peso} 
            onChange={(e) => setPeso(e.target.value)} 
          />
        </div>
        <button type="submit">Calcular IMC</button>
      </form>

      {imc && (
        <div>
          <h2>Seu IMC é: {imc} (Valor aproximado.)</h2>
          <p>Classificação: {classificacao}</p>
        </div>
      )}
    </div>
  );
}

export default App;
