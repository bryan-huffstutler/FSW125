const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

app.use("/things", require("./routes/thingRouter"))

app.listen(9000, () => {
  console.log("Server is running on Port: 9000")
})