import React from 'react'
import { useEffect, useState } from 'react'
// import './App.css'
// import Button from './components/Button/button'
// import { Input } from './components/Input/input'
import axios from 'axios'

function App() {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello man'
  }
  useEffect(() => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(resp => {
        setTitle(resp.data.title)
      })
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{title}</h1>
      </header>
      
    </div>
  )
}

export default App
