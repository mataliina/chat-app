const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html')
// })

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	next()
// })

io.on('connection', (socket) => {
	socket.emit('your id', socket.id)
	console.log('a user connected')
	socket.on('chat message', (msg) => {
		//console.log('message: ', msg)
		io.emit('chat message', msg)
	})

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

http.listen(8000, () => {
	console.log('listening on *:8000')
})
