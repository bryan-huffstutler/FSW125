import React from 'react'

class Item extends React.Component {
  constructor() {
    super()
    this.state = ({
      isEditingSold: false,
      isEditingCost: false,
      sold: false,
      cost: 0
    })
    this.handleChange = this.handleChange.bind(this)
    this.costToggle = this.costToggle.bind(this)
    this.soldToggle = this.soldToggle.bind(this)
    this.handleEditSelector = this.handleEditSelector.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleEditSelector(event) {
    event.preventDefault()
    if (event.target.value === "true") {
      this.setState({
        ...this.state,
        sold: true
      })
    } else {
      this.setState({
        ...this.state,
        sold: false
      })
    }
  }

  costToggle() {
    this.setState({
      ...this.state,
      isEditingCost: !this.state.isEditingCost
    })
  }

  soldToggle() {
    this.setState({
      ...this.state,
      isEditingSold: !this.state.isEditingSold
    })
  }

  render() {

    return (
      <div id={this.props._id} className="items">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt="Item"/>

        {this.props.type === "Games" ? <h5>Available Editions: {this.props.colors.map(edition => `${edition} `)}</h5> : <h5>Available Colors: {this.props.colors.map(color => `${color} `)}</h5>}

        <h5>Product Category: {this.props.type}</h5>


        {this.state.isEditingCost ?
          <form onSubmit={(event) => {
            this.props.costPut(event, this.state.cost)
            this.costToggle()
          }}>
            <input type="text" name="cost" onChange={this.handleChange} />
            <button>Save Changes</button>
            <button onClick={() => this.costToggle}>Cancel</button>
          </form> :
          <h5>{this.props.cost} <button onClick={this.costToggle}>Edit Cost</button></h5>}

        {this.state.isEditingSold ?
          <form onSubmit={(event) => {
            this.props.soldPut(event, this.state.sold)
            this.soldToggle()
          }}>
            <select onChange={this.handleEditSelector} name="sold" value={this.state.sold}>
              <option value={true}>Sold Out</option>
              <option value={false}>Still Available</option>
            </select>
            <button>Save Changes</button>
            <button onClick={(event) => {
              event.preventDefault()
              this.soldToggle()}}>Cancel</button>
          </form> : <h5>Available: {this.props.sold ? "No" : "Yes"} <button onClick={this.soldToggle}>Edit Availability</button></h5>}
        <button onClick={(event) => this.props.delete(event)}>Delete</button>


      </div>
    )
  }
}

export default Item