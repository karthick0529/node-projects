import React,{useState,useEffect} from 'react'
import axios from 'axios'

function App() {
 
  const [ greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/greeting')
    .then(res => {
      setGreeting(res.data.message);
    })
    .catch(err =>{ 
      console.error(err);
    })
  },[]);

  return (
    <div>
      <header>
      <h1>{greeting}</h1>
      <button onClick={() => {
          axios.get('http://localhost:3000/greet')
            .then(res => {
              setGreeting(res.data);
            })
            .catch(err => {
              console.log(err);
            })
        }}>
      Greet</button>
      </header>
    </div>
  )
}

export default App
