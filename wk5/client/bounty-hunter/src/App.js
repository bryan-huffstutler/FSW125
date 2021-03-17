import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';
import Bounty from './components/Bounty'
import Form from './components/Form'

function App () {
  const [ bounties, setBounties] = useState([])

  useEffect(() => {
    axios.get("/bounties")
    .then(res => setBounties(res.data))
    .catch(err => console.log(err))
  })

  return (
    <div>
      <Form />
      { bounties.map(bounty => <Bounty {...bounty} key={bounty._id}/>)}
    </div>
  )
}

export default App