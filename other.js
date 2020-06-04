import React from 'react'
import ReactDOMServer from 'react-dom/server'
import CypressAnalytics from './src/CypressAnalytics'
// console.log(CA)
const out = ReactDOMServer.renderToString(<CypressAnalytics />)
console.log(out)