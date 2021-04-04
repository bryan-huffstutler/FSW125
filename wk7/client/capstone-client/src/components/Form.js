import React from 'react'
import axios from 'axios'

class Form extends React.Component {
  
  constructor() {
    super()
    this.state=({
      name: "",
      image: "",
      cost: 0,
      color1: "",
      color2: "",
      type: "",
      filter: "Electronics"
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({
      [name]: value
    }) 
  }

  handleSubmit (event) {
    event.preventDefault()
    const item = {
      name: this.state.name,
      image: this.state.image,
      cost: this.state.cost,
      colors: [this.state.color1, this.state.color2],
      type: this.state.type
    }
    axios.post('/items', item)
    .then(res => this.props.getItems())
    .catch(err => console.log(err))
  }

  render () {
    return (
      <div id="inputForm">
        <form onSubmit={this.handleSubmit}>
          <label>Enter Items Name</label><br/>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Enter Name of Item"
            />
          <br/>

          <label>Enter Items Image</label><br/>
            <input
              onChange={this.handleChange}
              type="text"
              name="image"
              placeholder="Enter Items Image"
            />
          <br/>

          <label>Enter Items Cost</label><br/>
            <input
              onChange={this.handleChange}
              type="number"
              name="cost"
              placeholder="Enter Cost of Item"
            />
          <br/>

          <label>Enter Type of Item</label><br/>
            <input
              onChange={this.handleChange}
              type="text"
              name="type"
              placeholder="Enter Type of Item"
            /><br/>
          

          <label>Enter Items Available Colors: </label><br/>
            <input
              onChange={this.handleChange}
              type="text"
              name="color1"
              placeholder="Enter Color of Item"
            /><br/>
            <input
              onChange={this.handleChange}
              type="text"
              name="color2"
              placeholder="Enter Color of Item"
            /><br/>
          
          <button>Add Item</button>
          <hr/>
        </form>

        <form onSubmit={(event)=> this.props.handleFilter(event, this.state.filter)}>
          <label>Filter Results by type
            <select id="dropdown" name = "filter" value = {this.state.filter} onChange={this.handleChange}>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Food">Food</option>
              <option value="Games">Games</option>          
            </select>
          </label>
          <button>Filter!</button>          
        </form>
        <button onClick={this.props.handleReset}>Reset</button>
      </div>
    )
  }
}

export default Form