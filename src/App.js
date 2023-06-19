import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

function App() {



  const mapping = {
    0: "Single",
    1: "Double",
    2: "Triple"
  };

  const [darts, setDarts] = useState();
  const [results, setResults] = useState([]);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [single, setSingle] = useState(true);
  const [double, setDouble] = useState(true);
  const [triple, setTriple] = useState(true);

  useEffect(() => {
    const storedResults = localStorage.getItem("results");
    console.log(storedResults)
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  useEffect(() => {
    if (results.length > 0) localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  const generate = () => {
    const available = [];
    if (single) available.push(0);
    if (double) available.push(1);
    if (triple) available.push(2);

    const n = available[Math.floor(Math.random() * available.length)]
    const multi = mapping[n];
    const num = Math.floor(Math.random() * 20) + 1;

    setDarts(multi + " " + num);
  }

  useEffect(() => {
    generate();
  }, []);

  useEffect(() => {
    hideAll();
  }, [results]);

  const addSuccess = () => {
    const result = { id: nanoid(12), score: darts, success: true };
    setResults([result, ...results]);
    generate();
  }

  const addFailure = () => {
    const result = { id: nanoid(12), score: darts, success: false };
    setResults([result, ...results]);
    generate();
  }

  const clear = () => {
    setResults([]);
    localStorage.setItem("results", []);
  }

  const showAll = () => {
    setResultsToShow(results);
  }

  const hideAll = () => {
    setResultsToShow(results.slice(0, 5));
  }

  return (
    <div className="page">
      <div className='mainBox'>
        <h1>Darts Training</h1>
        <h2>Config</h2>
        <div>
          <input
            type="checkbox"
            checked={single}
            onChange={() => setSingle(!single)}
            id="singleCheckbox"
          />
          <label htmlFor="singleCheckbox">Single</label>

          <input
            type="checkbox"
            checked={double}
            onChange={() => setDouble(!double)}
            id="doubleCheckbox"
          />
          <label htmlFor="doubleCheckbox">Double</label>

          <input
            type="checkbox"
            checked={triple}
            onChange={() => setTriple(!triple)}
            id="tripleCheckbox"
          />
          <label htmlFor="tripleCheckbox">Triple</label>
        </div>
        <hr />

        <h2>Darts: {darts}</h2>
        <hr></hr>
        <div>
          <button onClick={generate} className="button">Generate</button>
          <br />
          <button onClick={addSuccess} className="button" style={{ color: "green" }}>Success</button>
          <button onClick={addFailure} className="button" style={{ color: "red" }}>Failure</button>
          <br />
          <button onClick={clear} className="button">Clear</button>
        </div>
        <hr></hr>
        <div>
          <h2>Results</h2>
          {resultsToShow.map(r => {
            const color = r.success ? "green" : "red";
            return (
              <h3 key={r.id} style={{ color: color }}>{r.score}</h3>
            )
          })}

          <button onClick={showAll} hidden={results.length === resultsToShow.length}>Show {results.length - resultsToShow.length} more results</button>
          <button onClick={hideAll} hidden={results.length !== resultsToShow.length}>Hide results</button>
        </div>
      </div>
    </div>
  );
}

export default App;
