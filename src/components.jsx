import './components.css';

function Title(){
    return (
        <div id="title">
            <h1>Memory Card Game</h1>
            <h2>Click on a pokemon to earn points, but don't click on any more than once!</h2>
        </div>
    )
}

function Scoreboard({score, bestScore}){
    return (
        <div id="scoreboard">
            <h2>Score: {score}</h2>
            <h2>Best Score: {bestScore}</h2>
        </div>
    )
}

function Gameboard({library, handleCardClick}){
    return (
    <div id="gameboard">
      {
        library.length !== 0 && library.map( pokemon => {
          return (
            <div key={pokemon.id} className='pokemon-card' onClick={(e) => handleCardClick(e, pokemon.id)}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.url} alt={pokemon.name} />
            </div>
          )
        })
      }
    </div>)
}

export { Title, Scoreboard,Gameboard }