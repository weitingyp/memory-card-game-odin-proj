import { useState, useEffect } from 'react'
import './App.css'

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

  return (
    <div id="gameboard">
      {
        library.length !== 0 && library.map( pokemon => {
          return (
            <div key={pokemon.id} className='pokemon-card'>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.url} alt={pokemon.name} />
            </div>
          )
        })
      }
    </div>)
}

export default App
