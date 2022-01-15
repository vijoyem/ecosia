const http = require('http')
const port = 3000

const server = http.createServer(function(req, res) {
  res.write( "Mango Tree")
  res.end()
})

server.listen(port, function(error) {
  if (error) {
      console.log('Somethiong went Wrong', error)
  } else {
      console.log('Server is listening on port + port')
  }
})