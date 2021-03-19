// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '' ) {
  const initial = () => JSON.parse(window.localStorage.getItem('name')) || defaultValue;
  const [value, setValue] = React.useState(
    () => initial
  )

  React.useEffect(()=> {
    window.localStorage.setItem(key, JSON.stringify(value))
  },[key, value]);

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="rosita" />
}

export default App
