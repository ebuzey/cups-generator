import React, { useState } from 'react';
import Button from './Button';

function Cups() {
  const [cups, setCups] = useState('');
  const [copied, setCopied] = useState(false);

  const alphabet = "TRWAGMYFPDXBNJZSQVHLCKE";

  const generarParteNumerica = () => {
    // Simulamos el código de la distribuidora como "1234" y generamos un número aleatorio para el identificador
    const distribuidora = "1234";
    const numeroSuministro = Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
    return distribuidora + numeroSuministro;
  };

  const calcularCaracteresControl = (parteNumerica) => {
    const numeroEntero = BigInt(parteNumerica);
    const R0 = numeroEntero % 529n;
    const C = R0 / 23n;
    const R = R0 % 23n;
    return alphabet[Number(C)] + alphabet[Number(R)];
  };

  const generarCups = () => {
    const parteNumerica = generarParteNumerica();
    const caracteresControl = calcularCaracteresControl(parteNumerica);
    const cupsFormateado = `ES${parteNumerica}${caracteresControl}`;
    setCups(cupsFormateado);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(cups);
    setCopied(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="text" value={cups} readOnly style={{ width: '400px', height: '60px', padding: '8px', marginRight: '8px', fontSize: '20px' }} />
          <button onClick={handleCopyToClipboard} style={{ backgroundColor: 'white', color: 'black', padding: '8px', border: '1px solid black', cursor: 'pointer', width: '100px', height: '60px', fontSize: '20px' }}>Copiar</button>
          {copied && <p style={{ color: 'white' }}>¡CUPS copiado al portapapeles!</p>}
        </div>
        <Button onClick={generarCups} text="Generar CUPS" />
      </header>
    </div>
  );
}

export default Cups;
