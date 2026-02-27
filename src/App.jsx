import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Title, Scoreboard, Gameboard } from './components.jsx';

function App() {

  // Fetch 12 pokemon data from pokeapi
  const pokemonId = Array.from({ length: 12 }, (_, i) => (i + 1) * 10);
  let initialLibrary = useRef([]);
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
    initializeLibrary().then( (initLibrary) => {
      initialLibrary.current = initLibrary;
      setLibrary(initLibrary);
    })
  }, [])

  // state to track score and best score
  const [ score, setScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);

  // shuffle library order of cards after every click
  function shuffleLibrary(){
    setLibrary( prevLibrary => {
      const shuffledLibrary = [...prevLibrary];
      for (let i = shuffledLibrary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLibrary[i], shuffledLibrary[j]] = [shuffledLibrary[j], shuffledLibrary[i]];
      }
      return shuffledLibrary;
    })
  }

  function handleCardClick(e, id){
    // if the pokemon is already picked, reset score and library
    if (library.find( pokemon => pokemon.id === id).isPicked){
      setScore(0);
      setLibrary(initialLibrary.current)
      shuffleLibrary();
  } else { 
    // if the pokemon is not picked, update score and library
      setLibrary( prevLibrary => {
        return prevLibrary.map( pokemon => {
          if (pokemon.id === id){
            return {...pokemon, isPicked: true}
          } else {
            return pokemon;
          }
        })
      })
      shuffleLibrary();
      setScore( prevScore => prevScore + 1);
      if (score + 1> bestScore) setBestScore( score + 1);
      }
}

  return (
    <>
      <Title />
      <Scoreboard score={score} bestScore={bestScore} />
      <Gameboard library={library} handleCardClick={handleCardClick}/>
    </>
  )
}

export default App
