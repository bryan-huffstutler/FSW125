const express = require("express")
const router = express.Router()
const {v4: uuid} = require('uuid')

const items = [
  {
    name : "Amazon Alexa",
    sold: false,
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 34.99,
    _id: uuid()
  },
  {
    name : "Roku",
    sold: false,
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 29.99,
    _id: uuid()
  },
  {
    name : "PlayStation 5",
    sold: false,
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 499.99,
    _id: uuid()
  },
  {
    name : "Dark Souls",
    sold: false,
    colors: ["Hollow Edition", "Collectors Edition"],
    type: "Games",
    cost: 49.99,
    _id: uuid()
  },
  {
    name : "Dark Souls 2: Scholar of the First Sin",
    sold: false,
    colors: ["Standard Edition", "Collectors Edition"],
    type: "Games",
    cost: 49.99,
    _id: uuid()
  },
  {
    name : "Demon Souls: Remastered",
    sold: false,
    colors: ["Standard Edition", "Collectors Edition"],
    type: "Games",
    cost: 69.99,
    _id: uuid()
  },
  {
    name : "Recliner",
    sold: false,
    colors: ["Blue"],
    type: "Furniture",
    cost: 234.99,
    _id: uuid()
  },
  {
    name : "Patio Table",
    sold: false,
    colors: ["Glass", "Blue"],
    type: "Furniture",
    cost: 999.99,
    _id: uuid()
  },
  {
    name : "Lawn Chair",
    sold: false,
    colors: ["Blue", "Red", "Yellow"],
    type: "Furniture",
    cost: 24.99,
    _id: uuid()
  },
  {
    name : "Ham",
    sold: false,
    colors: ["Green", "Tan"],
    type: "Food",
    cost: 24.99,
    _id: uuid()
  },
  {
    name : "Eggs",
    sold: false,
    colors: ["Green", "White"],
    type: "Furniture",
    cost: 1.99,
    _id: uuid()
  },
  {
    name : "Bananas",
    sold: false,
    colors: ["Green", "Yellow"],
    type: "Food",
    cost: 5.99,
    _id: uuid()
  }
]

//Get All
router.get("/", (req, res) => {
  res.status(200)
  res.send(items)
})

//Get One
router.get("/:itemId", (req, res, next) => {
  const itemId = req.params.itemId
  const item = items.find(item => item._id === itemId)
  if(!item){
    const error = new Error(`The item with id ${itemId} was not found.`)
    res.status(500)
    return next(error)
  }
  res.status(200).send(item)
})

//Post One
router.post("/", (req, res)=> {
  const item = req.body;
  item._id = uuid();
  items.push(item)
  res.status(201).send(`Successfully added to the database.`)
})

//Delete
router.delete('/:itemId', (req, res)=> {
  const itemId = req.params.bountyId
  const itemIndex = items.findIndex(item => item._id === itemId)
  items.splice(itemIndex, 1)
  res.send('Successfully removed item.')
})

//Edit
router.put('/:itemId', (req, res) => {
  const itemId = req.params.itemId
  const itemIndex = items.findIndex(item => item._id === itemId)
  const updatedItem = Object.assign(items[itemIndex], req.body)
  res.status(201).send(updatedItem)
})

//Get by Filter
router.get("/search/type", (req, res, next) => {
  const type = req.query.type
  if(!type){
    const error = new Error("You must provide a type")
    res.status(500)
    return next(error)
  }
  const filteredItems = items.filter(item => item.type === type)
  res.status(200).send(filteredItems)
})

module.exports = router