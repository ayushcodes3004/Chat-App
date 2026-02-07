import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./Context/ChatProvider.jsx";
import './index.css'
import App from './App.jsx'

const system = createSystem(defaultConfig)

createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <BrowserRouter>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>,
)
