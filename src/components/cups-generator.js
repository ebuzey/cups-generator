import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';

function Cups() {
  const [cups, setCups] = useState('');
  const [copied, setCopied] = useState(false);

  const generarCups = useCallback((distribuidora = "0000", pais = "ES", ntOpcional = false) => {
    const generarParteNumerica = (distribuidora) => {
      const numeroSuministro = Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
      return distribuidora + numeroSuministro;
    };

    const calcularCaracteresControl = (numero) => {
      const tablaEquivalencia = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numeroEntero = parseInt(numero, 10);
      const R0 = numeroEntero % 529;
      const C = Math.floor(R0 / 23);
      const R = R0 % 23;
      return tablaEquivalencia[C] + tablaEquivalencia[R];
    };

    const parteNumerica = generarParteNumerica(distribuidora);
    const caracteresControl = calcularCaracteresControl(parteNumerica);
    let cups = `${pais} ${distribuidora} ${parteNumerica.substring(0, 4)} ${parteNumerica.substring(4, 8)} ${parteNumerica.substring(8, 12)} ${caracteresControl}`;
    if (ntOpcional) {
      const n = Math.floor(Math.random() * 10);
      const opcionesT = ['F', 'P', 'R', 'C', 'X', 'Y', 'Z'];
      const t = opcionesT[Math.floor(Math.random() * opcionesT.length)];
      cups += ` ${n} ${t}`;
    }
    return cups;
  }, []);

  useEffect(() => {
    // Generar el CUPS inicial cuando el componente se monte por primera vez
    const nuevoCups = generarCups("1234", "ES", true);
    setCups(nuevoCups);
  }, [generarCups]);

  const handleGenerarCups = () => {
    const nuevoCups = generarCups("1234", "ES", true);
    setCups(nuevoCups);
    setCopied(false);
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
          {/* Botón para copiar al portapapeles */}
          <button onClick={handleCopyToClipboard} style={{ backgroundColor: 'white', color: 'black', padding: '8px', border: '1px solid black', cursor: 'pointer', width: '100px', height: '60px', fontSize: '20px' }}>Copiar</button>
          {/* Mostrar mensaje de copiado */}
          {copied && <p style={{ color: 'white' }}>¡CUPS copiado al portapapeles!</p>}
        </div>
        <Button onClick={handleGenerarCups} text="Generar CUPS" />
      </header>
    </div>
  );
}

export default Cups;
