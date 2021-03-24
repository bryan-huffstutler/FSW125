import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import Bounty from './components/Bounty'
import Form from './components/Form'

function App() {
  const [bounties, setBounties] = useState([])

  function getBounties () {
    axios.get("/bounties")
      .then(res => setBounties(res.data))
  }
  useEffect(() => {
    getBounties()
  }, [])

  return (
    <div id="pageBody">
      <Form getBounties={getBounties}/>
      { bounties.map(bounty => <Bounty getBounties={getBounties} {...bounty} key={bounty._id} />)}
    </div>
  )
}

export default App