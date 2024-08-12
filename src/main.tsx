import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import './styles/global.css'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
