import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Image, StyleSheet} from 'react-native';
import './App.css'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: 6000,
    height: 3000,
    resizeMode: 'cover',
  },
});

function App() {
  const [count, setCount] = useState(0)
  const [object, setObject] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);


  return (
    <>
      <div>
        <a target="_blank">
          <img 
          src={"https://mobileimages.lowes.com/marketingimages/2b928fb1-a997-4a2c-8824-4b149b75b8ef/lowes-logos-dp18-332098-og.jpg"}
          className="logo"
          alt="Lowes logo"
          style={styles.cover} />
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
