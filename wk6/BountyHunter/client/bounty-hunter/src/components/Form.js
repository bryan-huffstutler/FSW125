import React from 'react'
import axios from 'axios'

class Form extends React.Component {
  constructor() {
    super()
    this.state = ({
      firstName: "",
      lastName: "",
      living: true,
      bounty: "",
      type: ""
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({
      [name]: value
    }) 
  }

  handleDropDown(event){
    event.target.value === "false" ? 
    this.setState({
      ...this.state,
      living: false
    }) :
    this.setState({
      living: true
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const bounty = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      living: this.state.living,
      bounty: this.state.bounty,
      type: this.state.type
    }
    axios.post("/bounties", bounty)
    .then(res => this.props.getBounties())
  }

  render() {
    return (
      <div id="form">
        <form onSubmit={this.handleSubmit}>
          <label>Enter Bounty's First Name
            <input onChange={this.handleChange} type="text" name="firstName" placeholder="Bounty First Name"></input>
          </label><br/>


          <label>Enter Bounty's Last Name
            <input onChange={this.handleChange} type="text" name="lastName" placeholder="Bounty Last Name"></input>
          </label><br/>


          <label>Enter Bounty Price
            <input onChange={this.handleChange} type="text" name="bounty" placeholder="Price of Bounty">
            </input>
          </label><br/>


          <label>Enter Bounty's Gang
            <input onChange={this.handleChange} type="text" name="type" placeholder="Bounty's Gang"></input>
          </label><br/>


          <label>Is the bounty alive still?
            <select id="dropdown" name = "living" value = {this.state.living} onChange={this.handleDropDown}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label><br/>


          <button>Submit</button>
          <hr/>
        </form>
      </div>
    )
  }

}

export default Form