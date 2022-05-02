import './App.css';
import Application from './Application';
import Web3Provider from './providers/Web3Provider';

function App() {
  return (
    <Web3Provider>
      <Application />
    </Web3Provider>
  );
}

export default App;
