import { useEffect, useState } from 'react'
import './App.css'

const URL =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
]

function App() {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '' })
  const [quotes, setQuotes] = useState([])
  const [dataReady, setDataReady] = useState(false)
  const [color, setColor] = useState('')

  const getRandomQuote = () => {
    if (quotes.length === 0) return
    const newIndex = Math.floor(Math.random() * quotes.length)
    const indexColor = Math.floor(Math.random() * colors.length)
    setColor(colors[indexColor])
    setQuoteData(quotes[newIndex])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL)
        const data = await response.json()
        setQuotes(data.quotes)
        setDataReady(true)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  })

  useEffect(() => {
    if (dataReady) {
      getRandomQuote()
    }
  }, [dataReady])

  useEffect(() => {
    document.body.style.backgroundColor = color
  }, [color])

  return (
    <div id='container'>
      <div id='quote-box'>
        <div className='quote-text' style={{ color: color }}>
          <i className='fa fa-quote-left'></i>
          <span id='text'>{quoteData.quote}</span>
        </div>
        <div className='quote-author' style={{ color: color }}>
          - {quoteData.author}
        </div>
        <div className='buttons'>
          <div className="social-container">
          <a className="button" href='#' style={{ backgroundColor: color, borderRadius: 5 }}>
            <i className='fa fa-twitter'></i>
          </a>
          <a className="button" href='#' style={{ backgroundColor: color, borderRadius: 5 }}>
            <i className='fa fa-tumblr'></i>
          </a>
          </div>
          
          <button className="button" onClick={getRandomQuote} style={{ backgroundColor: color, borderRadius: 5 }}>New Quote</button>
        </div>
      </div>
      <div className='footer' style={{ backgroundColor: color }}>
        <a href='#'>By Alejandro</a>
      </div>
    </div>
  )
}

export default App
