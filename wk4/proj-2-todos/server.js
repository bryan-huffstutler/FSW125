const express = require ('express')
const app = express()

//Middleware
app.use(express.json())

//Route
app.use("/todos", require("./router/todosRouter.js"))

app.listen(9000, () => {
  console.log("Server is running on Port: 9000.")
})