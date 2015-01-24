app = require('./app')
config = require('./config/config')

app.set('port', config.port)

server = app.listen(app.get('port'), ->
  server.on('connection', (socket) ->
    socket.setNoDelay(true)
  )
  console.log('Express server listening on port ' + server.address().port)
)
