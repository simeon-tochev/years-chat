import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { chatService } from './services/chat-service'
import { userService } from './services/user-service'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)

const PORT = 3021

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
  const { username } = req.body
  userService.loginUser(username)
  res.send({ username })
})

app.get('/messages', (_, res) => {
  res.send(chatService.loadAllMessages())
})

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const id = chatService.sendMessage(message)
    if (!message.edited && !message.deleted) {
      socket.emit('assignId', id)
    }
    socket.broadcast.emit('message', {
      ...message,
      id
    })
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
