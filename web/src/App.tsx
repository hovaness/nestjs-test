
import { WebSocketProvider, socket } from './context/WebSocketContext'
import { Chat } from './components/Chat'
import { storage } from './utils/storage'
import { User } from './types/types'
import { Registry } from './components/Registry';

function App() {
  const user = storage.get<User>();

  return (
    <>
      <WebSocketProvider value={socket}>
        {user ? <Chat/> : <Registry/> }
      </WebSocketProvider>
    </>
  )
}

export default App
