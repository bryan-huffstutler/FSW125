const express = require('express')
const app = express()
const morgan = require('morgan')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use("/items", require("./routes/router"))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log("Server is running on Port: 9000")
})