import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [object, setObject] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);


  return (
    <>
      <div>
        <a target="_blank">
          <img src={"https://mobileimages.lowes.com/marketingimages/d0c68e7e-54a6-4d2d-a53d-385f8a156529/lowes-dp18-328966-og.png"} className="logo" alt="Vite logo" />
        </a>
      </div>
      {/*<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>*/}
      <h1>Nail it with Lowe's!</h1>
       {/*<div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Tell us more information!
      </p>*/}


      <label>
        What would you like to build today?   
        <input
          value={object}
          onChange={e => setObject(e.target.value)}
        />
      </label>
      {/*<label>
        Age:
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
      </label>*/}
      {object !== '' &&
        <p>Your recommended materials are {object}.</p>
      }
      {/*{ageAsNumber > 0 &&
        <p>Your recommended materials are {ageAsNumber}.</p>
      }*/}
    </>
  )
}

export default App
