import './App.css';
import Cups from './components/cups-generator'
import LightFollower from './components/LightFollower';
import './styles/Title.css';
 

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <LightFollower />
        <div class="cups-container">
          <div class="cups-heading">CUPS</div>
          <div class="cups-description">Código unificado de punto de suministro</div>
        </div>
        
          <Cups />
          
      </div>
    </div>
  );
}

export default App;
