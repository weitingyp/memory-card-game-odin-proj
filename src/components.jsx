import './components.css';

function Gameboard({library}){
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

export { Gameboard }