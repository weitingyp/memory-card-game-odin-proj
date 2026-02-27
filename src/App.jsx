import { useState, useEffect } from 'react'
import './App.css'
import { Title, Scoreboard, Gameboard } from './components.jsx';

function App() {

  // Fetch 12 pokemon data from pokeapi
  const pokemonId = Array.from({ length: 12 }, (_, i) => (i + 1) * 10);
  const [ library, setLibrary ] = useState([]);

  useEffect(()=>{
    async function initializeLibrary() {
      return await Promise.all(
        pokemonId.map( async (id) => {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
          const result = await response.json();
          return {
            name: result.forms[0].name,
            id: result.id,
            url: result.sprites.front_default,
            isPicked: false
          }
        })
      )
    }
    initializeLibrary().then( (initLibrary) => setLibrary(initLibrary) );
  }, [])

  // state to track score and best score
  const [ score, setScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);

  return (
    <>
      <Title />
      <Scoreboard score={score} bestScore={bestScore} />
      <Gameboard library={library} />
    </>
  )
}

export default App
