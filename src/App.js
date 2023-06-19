import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const mapping = {
    0: "Single",
    1: "Double",
    2: "Triple"
  };

  const [darts, setDarts] = useState();
  const [success, setSuccess] = useState([]);
  const [failure, setFailure] = useState([]);

  const generate = () => {
    const multi = mapping[Math.floor(Math.random() * 3)];
    const num = Math.floor(Math.random() * 20) + 1;

    setDarts(multi + " " + num);
  }

  useEffect(() => {
    generate();
  }, []);

  const addSuccess = () => {
    console.log(success)
    setSuccess([...success, darts]);
    generate();
  }

  const addFailure = () => {
    setFailure([...failure, darts]);
    generate();
  }

  const clear = () => {
    setSuccess([]);
    setFailure([]);
  }

  return (
    <div className='mainDiv'>
      <h1>Darts: {darts}</h1>
      <hr></hr>
      <button onClick={addSuccess} style={{fontSize: "50px"}}>Success</button>
      <button onClick={addFailure} style={{fontSize: "50px"}}>Failure</button>
      <button onClick={clear} style={{fontSize: "50px"}}>Clear</button>
      <hr></hr>
      <div>
      <h2 style={{color: "green"}}>Success</h2>
      {success.map(s => {
        return <h3 style={{color: "green"}}>{s}</h3>
      })}
      <h2 style={{color: "red"}}>Failure</h2>
      {failure.map(f => {
        return <h3 style={{color: "red"}}>{f}</h3>
      })}
      </div>
    </div>
  );
}

export default App;
