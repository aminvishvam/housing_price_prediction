import logo from './logo.svg';
import './App.css';
import Tensorflow from "./components/Tensorflow.js"
import Housing from "./components/housing_price.js"

function App() {
  return (
    <div className="App">
    {/* //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}

      {/* <Tensorflow /> */}
      <Housing/>
    </div>
  );
}

export default App;
