import express, { Application } from 'express'
import { fileOperation } from './utils'
import { ITodo } from './typings'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-methods', 'POST,GET,PUT,DELETE,OPTION')
  next()
})

app.get('/todoList', (req, res) => {
  const todoList: string = fileOperation('todo.json') as string
  res.send(todoList)
})

app.post('/toggle', (req, res) => {
  const id: number = parseInt(req.body.id)

  fileOperation('todo.json', (todoList: ITodo[]) => {
    return todoList.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }

      return todo
    })
  })
  
  res.send({
    msg: 'ok',
    statusCode: 200
  })
})

app.post('/remove', (req, res) => {
  const id: number = parseInt(req.body.id)

  fileOperation('todo.json', (todoList: ITodo[]) => {
    return todoList.filter((todo: ITodo) => todo.id !== id)
  })
  
  res.send({
    msg: 'ok',
    statusCode: 200
  })
})

app.post('/add', (req, res) => {
  const todo: ITodo = JSON.parse(req.body.todo)
  
  fileOperation('todo.json', (todoList: ITodo[]) => {
    const isExis = todoList.find((item: ITodo) => item.content === todo.content)

    if (isExis) {
      res.send({
        msg: 'exist',
        statusCode: 100
      })
      return todoList
    }

    todoList.push(todo)

    return todoList
  })

  res.send({
    msg: 'ok',
    statusCode: 200
  })
})

app.listen(8080, () => {
  console.log('Welcome to EXPRESS!')
  console.log('Listening on port 8080')
})

