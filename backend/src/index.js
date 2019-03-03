// let's go!
require('dotenv').config({path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
// TODO Use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, options => {
  console.log(`server is now running on port http://localhost: ${options.port}`)
})