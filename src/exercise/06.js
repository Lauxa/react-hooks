// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  React.useEffect(() => {
    if (!pokemonName) return

    setPokemon(null)
    setError(null)
    setStatus('pending')

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setStatus('resolved')
        setPokemon(pokemonData)
      })
      .catch(error => {
        setStatus('rejected')
        setError(error)
      })
  }, [pokemonName])

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:
        <pre style={{whiteSpace: 'normal'}}>{error && error.message}</pre>
      </div>
    )
  }

  if (status === 'idle') {
    return pokemon
  }

  if (status === 'pending')
    return pokemonName && <PokemonInfoFallback name={pokemonName} />

  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
