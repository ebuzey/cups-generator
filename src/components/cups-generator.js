/* global BigInt */
import React, { useState, useEffect } from 'react';
import Button from './Button';
import '../styles/CupsGenerator.css'

function Cups() {
  const [cups, setCups] = useState('');
  const [copied, setCopied] = useState(false);

  const alphabet = "TRWAGMYFPDXBNJZSQVHLCKE";

  const generarParteNumerica = () => {
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

  useEffect(() => {
    generarCups();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(cups);
    setCopied(true);
  };

  const handleGenerarCups = () => {
    generarCups();
    setCopied(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="text" value={cups} readOnly className="cups-input" />
          <button onClick={handleCopyToClipboard} className="copy-button">Copiar</button>
          {copied && <p style={{ color: 'white' }}>¡CUPS copiado al portapapeles!</p>}
        </div>
        <Button onClick={handleGenerarCups} text="Generar CUPS" />
      </header>
    </div>
  );
}

export default Cups;
