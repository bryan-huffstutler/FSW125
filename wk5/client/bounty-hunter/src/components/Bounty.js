import axios from 'axios'
import React from 'react'

class Bounty extends React.Component {
  constructor() {
    super()
    this.state = ({
      isEditing: false,
      bounty: 0
    })
    this.handleChange = this.handleChange.bind(this)
    this.handlePut = this.handlePut.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handlePut(e) {

    e.preventDefault()
    const id = this.props._id
    axios.put(`/bounties/${id}`, { bounty: this.state.bounty })
      .then(res => {
        this.setState({
          isEditing: false,
          bounty: 0
        })
        console.log(res)
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <div>
        <h2>{`${this.props.firstName} ${this.props.lastName}`}</h2>

        <h3>Alive: {this.props.living ? "Yes" : "No"}</h3>

        <h3>Type of Species: {this.props.type}</h3>


        {this.state.isEditing ? <form onSubmit={this.handlePut}><input onChange={this.handleChange} name="bounty" type="text" placeholder="Enter new Bounty"></input><button>Save</button></form> :

          <h3>Bounty: {this.props.bounty}</h3>}


        <button onClick={() => {
          this.setState({
            ...this.state,
            isEditing: !this.state.isEditing
          })
        }}>Edit Bounty</button>

        <button
          onClick={(e) => {
            const id = this.props._id
            axios.delete(`/bounties/${id}`)
          }}>Delete
        </button>

      </div>
    )
  }

}

export default Bounty