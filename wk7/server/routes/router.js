const express = require("express")
const router = express.Router()
const {v4: uuid} = require('uuid')

const items = [
  {
    name : "Amazon Alexa",
    sold: false,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyfHxhbWF6b24lMjBhbGV4YXxlbnwwfHx8fDE2MTczMzM2ODY&ixlib=rb-1.2.1&q=80&w=1080",
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 34.99,
    _id: uuid()
  },
  {
    name : "Roku",
    sold: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/81%2B0dqbDGWL._AC_SL1500_.jpg",
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 29.99,
    _id: uuid()
  },
  {
    name : "PlayStation 5",
    sold: false,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxMHx8cGxheXN0YXRpb24lMjA1fGVufDB8fHx8MTYxNzMzMzUyNg&ixlib=rb-1.2.1&q=80&w=1080",
    colors: ["Black", "White"],
    type: "Electronics",
    cost: 499.99,
    _id: uuid()
  },
  {
    name : "Dark Souls",
    sold: false,
    image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
    colors: ["Hollow Edition", "Collectors Edition"],
    type: "Games",
    cost: 49.99,
    _id: uuid()
  },
  {
    name : "Dark Souls 2: Scholar of the First Sin",
    sold: false,
    image: "https://image.api.playstation.com/vulcan/img/rnd/202010/1216/oSOVmvoekCf9ASaAItqfKvpP.png",
    colors: ["Standard Edition", "Collectors Edition"],
    type: "Games",
    cost: 49.99,
    _id: uuid()
  },
  {
    name : "Demon Souls: Remastered",
    sold: false,
    image: "https://images-na.ssl-images-amazon.com/images/I/81QoNRp5%2BWL._SL1353_.jpg",
    colors: ["Standard Edition", "Collectors Edition"],
    type: "Games",
    cost: 69.99,
    _id: uuid()
  },
  {
    name : "Recliner",
    sold: false,
    image: "https://content.valuecityfurniture.com/images/product/phoenix_black_recliner_2119013_794393.jpg?akimg=product-img-800x800&ak-trim=false",
    colors: ["Blue"],
    type: "Furniture",
    cost: 234.99,
    _id: uuid()
  },
  {
    name : "Patio Table",
    sold: false,
    image: "https://images.thdstatic.com/productImages/8d6b818a-c921-4c63-b0d3-433674aeb698/svn/stylewell-patio-dining-tables-fts61191-64_145.jpg",
    colors: ["Glass", "Blue"],
    type: "Furniture",
    cost: 999.99,
    _id: uuid()
  },
  {
    name : "Lawn Chair",
    sold: false,
    image: "https://cdni.llbean.net/is/image/wim/504592_37948_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2",
    colors: ["Blue", "Red", "Yellow"],
    type: "Furniture",
    cost: 24.99,
    _id: uuid()
  },
  {
    name : "Ham",
    sold: false,
    image: "https://www.mccrone.com/wp-content/uploads/2018/11/cs-ham.jpg",
    colors: ["Green", "Tan"],
    type: "Food",
    cost: 24.99,
    _id: uuid()
  },
  {
    name : "Eggs",
    sold: false,
    image: "https://lh3.googleusercontent.com/proxy/HZweVST7NyVQqRutdDUx80N3aD-IyhyAZ3xG4HQaNj2VOhfKyu04OGDRdhI-ouvL3G1WlSj_TemHngpcpxI-1Y0ftlg0FlR3qXVz3nTGOewoT4p-mSG8yXc9yjlPzZWDntNOxzp8VZqeVY73wGhAwaEmbE4KdzNR0VmNMeFNfuiDNVIv57g11_IUpQlJUu8uNpIV-CggKuIl9QJjuSrZcW46gD00pF-nSDR4dflKd1xAeMzOYV_aQDI",
    colors: ["Green", "White"],
    type: "Food",
    cost: 1.99,
    _id: uuid()
  },
  {
    name : "Bananas",
    sold: false,
    image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg",
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
  const itemId = req.params.itemId
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