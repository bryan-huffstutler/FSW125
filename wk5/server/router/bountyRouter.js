const express = require("express")
const bountyRouter = express.Router()
const {v4: uuid} = require('uuid')

const bounties = [
  {
    firstName: "Darth",
    lastName: "Vader",
    living: true,
    bounty: 200000,
    type: "Sith",
    _id: uuid()
  },
  {
    firstName: "Darth",
    lastName: "Maul",
    living: false,
    bounty: 150500,
    type: "Sith",
    _id: uuid()
  },
  {
    firstName: "Luke",
    lastName: "Skywalker",
    living: true,
    bounty: 5000000,
    type: "Jedi",
    _id: uuid()
  }
]

bountyRouter.get("/", (req, res) => {
  res.send(bounties)
})

bountyRouter.post("/", (req, res)=> {
  const bounty = req.body;
  bounty._id = uuid();
  bounties.push(bounty)
  res.send(`Successfully added ${bounty.firstName} ${bounty.lastName} to the database.`)
})

bountyRouter.delete('/:bountyId', (req, res)=> {
  const bountyId = req.params.bountyId
  const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
  bounties.splice(bountyIndex, 1)
  res.send('Successfully removed bounty.')
})

bountyRouter.put('/:bountyId', (req, res) => {
  const bountyId = req.params.bountyId
  const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
  const updatedBounty = Object.assign(bounties[bountyIndex], req.body)
  res.send(updatedBounty)
})
module.exports = bountyRouter