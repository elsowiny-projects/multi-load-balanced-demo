const dotenv = require('dotenv')
dotenv.config()
const bodyparser = require('body-parser')
const express = require('express')
const cors = require('cors')

const fakeMockPostsGenerator = (author = 'null', numberOfPosts = 10) => {
  const idGenerator = () => {
    return Math.random().toString(36).substring(2, 15)
  }
  const mockPosts = []
  let maxNumberOfPosts = 1000
  let randNumbOfPosts = numberOfPosts
 
  // if numberOfPosts was not provided, generate a random number between 1 and maxNumberOfPosts
  if (!randNumbOfPosts) {
    randNumbOfPosts = Math.floor(Math.random() * maxNumberOfPosts) + 1
  }

  for (let i = 0; i < randNumbOfPosts; i++) {
    const mockPost = {
      title: `Post ${i + 1}`,
      content: `Content ${i + 1}`,
      author: `Author ${author}`,
      _id: idGenerator(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockPosts.push(mockPost)
  }
  return mockPosts
}

const app = express()
const port = process.env.PORT || 4500
const serverName = process.env.SERVICE_NAME || 'default server'


// Middleware
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/:author?/:numberOfPosts?', (req, res) => {
  return res.status(200).json(fakeMockPostsGenerator(`${req.params.author} - ${serverName} `, parseInt(req.params.numberOfPosts, 10)))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
