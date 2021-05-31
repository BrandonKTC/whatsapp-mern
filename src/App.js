import './App.css'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import axios from './axios'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('api/v1/messages/sync').then((response) => {
      setMessages(response.data)
    })
  }, [])
  console.log(messages)
  useEffect(() => {
    var pusher = new Pusher('326b6f20a51bfcb69a34', {
      cluster: 'eu',
    })

    var channel = pusher.subscribe('messages')
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(newMessage))
      setMessages([...messages, newMessage])
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  console.log(messages)

  return (
    <div className='app'>
      <div className='app__body'>
        {/* Sidebar */}
        <Sidebar />
        {/* Chat Component */}
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default App
