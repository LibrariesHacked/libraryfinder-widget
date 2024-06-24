import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

const rootElement = document.getElementById('libraryfinder-widget')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App
      width={rootElement.dataset.width}
      height={rootElement.dataset.height}
      primary={rootElement.dataset.primary}
      secondary={rootElement.dataset.secondary}
    />
  </React.StrictMode>
)
