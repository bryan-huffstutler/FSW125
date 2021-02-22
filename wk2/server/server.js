const express = require ('express')
const app = express()

const home = "Welcome To My Home Page"
const services = "BAM, My Services Page"
const about = "This is my About Page"

app.get("/", (req, res) => {
  res.send(home)
})

app.get("/services", (req, res) => {
  res.send(services)
})

app.get("/about", (req, res) => {
  res.send(about)
})


app.listen(9000, () => {
  console.log("Server is running on Port: 9000.")
})