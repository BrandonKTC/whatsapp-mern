import { Avatar, IconButton } from '@material-ui/core'
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  Send,
} from '@material-ui/icons'
import { useState } from 'react'
import './Chat.css'
import axios from '../axios'

const Chat = ({ messages }) => {
  const [message, setmessage] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    axios.post('api/v1/messages/new', {
      message: message,
      name: 'DemoApp',
      timestamp: new Date().toUTCString(),
      received: false,
    })
    setmessage('')
  }
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message, i) => (
          <p
            key={i}
            className={`chat__message ${message.receive && 'chat__receiver'}`}
          >
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            type='text'
            placeholder='type a message'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
