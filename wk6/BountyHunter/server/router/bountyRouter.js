const express = require("express")
const bountyRouter = express.Router()
const {v4: uuid} = require('uuid')

const bounties = [
  {
    firstName: "Jesus",
    lastName: "Hernandez",
    living: true,
    bounty: "$35.00",
    gang: "Hernandez Cartel",
    _id: uuid()
  },
  {
    firstName: "Dean",
    lastName: "Wilcoxson",
    living: false,
    bounty: "$50.00",
    gang: "Wilco Gang",
    _id: uuid()
  },
  {
    firstName: "Vanessa",
    lastName: "Caraballo",
    living: true,
    bounty: "$45.00",
    gang: "Death Blossoms",
    _id: uuid()
  },
  {
    firstName: "Carlos",
    lastName: "Robinson",
    living: true,
    bounty: "$35.00",
    gang: "Kings of the South",
    _id: uuid()
  },
  {
    firstName: "Jeny",
    lastName: "Plasencia",
    living: true,
    bounty: "$65.00",
    gang: "Care Bears of Doom",
    _id: uuid()
  },
  {
    firstName: "Claudia",
    lastName: "Evans",
    living: true,
    bounty: "$55.00",
    gang: "Kiss of Death",
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