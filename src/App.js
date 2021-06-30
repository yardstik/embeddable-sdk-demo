import logo from './logo.svg';
import './App.css';

function App() {
  fetch("http://localhost:3001/yardstik-jwt", {
    method: "POST", 
    body: {
      "user_email": "erin.black@yardstik.com"
    }
  })
  .then(res => console.log('in then with res', res))
  .catch((err) => console.log('in catch with err', err));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
