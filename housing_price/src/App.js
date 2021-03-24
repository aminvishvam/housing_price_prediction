import logo from './logo.svg';
import './App.css';
import Tensorflow from "./components/Tensorflow.js"
import Housing from "./components/housing_price.js"
import Housing_price from "./components/housing_price_prediction.js"

function App() {
  return (
    <div className="App">
      {/* <Tensorflow /> */}
      <Housing/>
      {/* <Housing_price /> */}
    </div>
  );
}

export default App;
