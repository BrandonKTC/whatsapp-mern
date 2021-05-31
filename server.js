// importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: '1211926',
  key: '326b6f20a51bfcb69a34',
  secret: 'f296ea07b3d8b3e6a50e',
  cluster: 'eu',
  useTLS: true,
})

//middleware config
app.use(cors())
app.use(express.json())

// Db config
const connection_url = `mongodb+srv://admin:Kwamou11@cluster0.xi5wy.mongodb.net/whatsapp-db?retryWrites=true&w=majority`
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.once('open', () => {
  console.log('DB connected')

  const msgCollection = db.collection('messagecontents')
  // console.log(msgCollection)
  const changeStream = msgCollection.watch()
  // console.log(changeStream)
  changeStream.on('change', (change) => {
    // console.log('A change occured', change)

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      })
    } else {
      console.log('Error triggering Pusher')
    }
  })
})
//api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})
// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`))
