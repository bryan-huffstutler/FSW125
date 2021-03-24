const express = require("express")
const thingRouter = express.Router()
const {v4: uuid} = require('uuid')

const things = [
  {
    "name": "Chair",
    "type": "Furniture",
    "price": "$89.99",
    _id: uuid()
  },
  {
    "name": "Hand Sanitizer",
    "type": "Hygiene",
    "price": "$2.99",
    _id: uuid()
  },
  {
    "name": "Shampoo",
    "type": "Hygiene",
    "price": "$3.99",
    _id: uuid()
  },
  {
    "name": "Levi",
    "type": "Clothing",
    "price": "$39.99",
    _id: uuid()
  },
  {
    "name": "Silver",
    "type": "Clothing",
    "price": "$79.99",
    _id: uuid()
  },
  {
    "name": "Banana",
    "type": "Food",
    "price": "$1.99",
    _id: uuid()
  },
  {
    "name": "Ham",
    "type": "Food",
    "price": "29.99",
    _id: uuid()
  }
]

//Get all
thingRouter.get("/", (req, res)=> {
  res.send(things)
})

//Get one
thingRouter.get("/:thingId", (req, res) => {
  const thingId = req.params.thingId
  const foundThing = things.find(thing => thing._id === thingId)
  res.send(foundThing)
})

//Get by Type
thingRouter.get("/search/type", (req, res) => {
  const type = req.query.type
  console.log(type)
  const filteredThings = things.filter(thing => thing.type === type)
  res.send(filteredThings)
})

thingRouter.post("/", (req, res)=> {
  const thing = req.body;
  thing._id = uuid();
  things.push(thing)
  res.send(`Successfully added to Inventory.`)
})

thingRouter.delete('/:thingId', (req, res)=> {
  const thingId = req.params.thingId
  const thingIndex = things.findIndex(thing => thing._id === thingId)
  things.splice(thingIndex, 1)
  res.send('Successfully removed from Inventory.')
})

thingRouter.put('/:thingId', (req, res) => {
  const thingId = req.params.thingId
  const thingIndex = things.findIndex(thing => thing._id === thingId)
  const updatedThing = Object.assign(bounties[thingIndex], req.body)
  res.send(updatedThing)
})

module.exports = thingRouter