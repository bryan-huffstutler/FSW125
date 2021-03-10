const express = require("express")
const todosRouter = express.Router()
const {v4: uuid} = require('uuid')

const todos = [
  {
    "name": "Take out the trash",
    "description": "Trash needs taken out to the curb on Tuesday Night",
    "completed": false,
    "_id": uuid()
  }
]

todosRouter.get("/", (req, res) => {
  res.send(todos)
})

todosRouter.post("/", (req, res)=> {
  const todo = req.body;
  todo._id = uuid();
  todos.push(todo)
  res.send(`Successfully added Todo: "${todo.name}" to the database.`)
})

todosRouter.delete('/:todoId', (req, res)=> {
  const todoId = req.params.todoId
  const todoIndex = todos.findIndex(todo => todo._id === todoId)
  todos.splice(todoIndex, 1)
  res.send('Successfully removed Todo.')
})

todosRouter.put('/:todoId', (req, res) => {
  const todoId = req.params.todoId
  const todoIndex = todos.findIndex(todo => todo._id === todoId)
  const updatedTodo = Object.assign(todos[todoIndex], req.body)
  res.send(updatedTodo)
})

module.exports = todosRouter