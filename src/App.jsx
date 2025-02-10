import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [inputMessage, setInputMessage] = useState('')
  useEffect(() => {
    const getMessage = async () => {
      const res = await fetch('http://localhost:3000/message')
      const message = (await res.json()).message
      setMessage(message)
    }
    
    getMessage()
  })

  const handleChangeMessage = async (message) => {
    
    const res = await fetch('http://localhost:3000/message', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message})
    },)
  
  }

  return (
    <>
      <div className='input-field'>
        <form onSubmit={() => handleChangeMessage(inputMessage)}>
          <label>Input: </label>
          <input name='' placeholder='Please enter message' onChange={(e) => setInputMessage(e.target.value)}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
        
      <p>Message: {message}</p> 
    </>
  )
}

export default App
