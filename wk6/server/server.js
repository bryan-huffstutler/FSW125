const express = require('express')
const app = express()

app.use(express.json())

app.use("/thing", require("./routes/thingRouter"))

app.listen(9000, () => {
  console.log("Server is running on Port: 9000")
})