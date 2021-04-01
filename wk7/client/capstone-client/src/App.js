import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './App.css';
import Item from './components/Item'
import Form from './components/Form'

function App() {
  const [items, setItems] = useState([])
  const [filterItems, setFilterItems] = useState([])

  function getItems () {
    axios.get('/items')
    .then(res => {
      setFilterItems(res.data)
      setItems(res.data)
    })
    .catch (err => console.log(err))
  }

  async function handleFilter(event, param){
    event.preventDefault()    
    await axios.get(`/items/search/type?type=${param}`)
      .then(res => setFilterItems(res.data))
      .then(res => console.log(`FILTERED YOUR RESULTS`))
      .catch(err => console.log(err))    
  }

  function resetItems() {
    console.log(items)
    setFilterItems(items)
  }

  function handleCostPut (event, param) {
    event.preventDefault()
    const id = event.target.parentNode.id
    axios.put(`/items/${id}`, {cost: param})
    .then(getItems)
    .catch(err => console.log(err))
  }

  function handleSoldPut (event, param){
    event.preventDefault()
    const id = event.target.parentNode.id
    axios.put(`/items/${id}`, {sold: param})
    .then(getItems)
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      <Form handleReset = {resetItems} handleFilter={handleFilter} getItems = {getItems} />
      <div id='items'>
        {filterItems.map(item => <Item 
          getItems={getItems} 
          {...item} 
          key={item._id}
          costPut={handleCostPut}
          soldPut={handleSoldPut}
        />)}
      </div>
      
    </div>
  );
}

export default App;
