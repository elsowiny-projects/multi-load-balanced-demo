const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3002 // Get environment variable PORT from process.yml configuration.
app.use(cors()) // This enables CORS



app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist' directory

app.get('/api/posts/:author?/:numberOfPosts?', async (req, res) => {
  let { author, numberOfPosts } = req.params
  author = author || 'null'
  numberOfPosts = numberOfPosts || 10
  const prodUrl = 'http://api.xyz'
  const url = 'http://localhost:4500'
  // const url = prodUrl
  const fullUrl = `${url}/${author}/${numberOfPosts}`
  try {
    const response = await axios.get(fullUrl)
    return res.status(200).json(response.data)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// some browsers automatically request favicon.ico from the server
// and initially it would hit the '*' route.
app.get('/favicon.ico', (req, res) => res.status(204))

app.get('*', (req, res) => {
  const app = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(app); // For all other routes, send back the 'index.html' file
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
