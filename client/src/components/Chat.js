import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Container, Typography } from '@material-ui/core'

const Chat = () => {
	const [socket, setSocket] = useState()
	const [userId, setUserId] = useState('')

	const [message, setMessage] = useState('')
	const [allMessages, setAllMessages] = useState([])

	useEffect(() => {
		const newSocket = io('/')
		setSocket(newSocket)
		return () => newSocket.close()
	}, [])

	useEffect(() => {
		if (socket) {
			socket.on('your id', (id) => {
				console.log('id: ', id)
				setUserId(id)
			})
			socket.on('chat message', (msg) => {
				console.log('saapunut viesti: ', msg)
				let newMessages = allMessages
				newMessages.push(msg)
				console.log('newMessages: ', newMessages)
				setAllMessages(newMessages)
			})
		}
	}, [socket])

	useEffect(() => {
		console.log('lähetetään: ', message)

		if (message !== '') {
			let msgObject = {
				body: message,
				userId: userId,
			}
			socket.emit('chat message', msgObject)
			setMessage('')
		}
	}, [message])

	useEffect(() => {
		console.log('allMessages efektistä: ', allMessages)
	}, [allMessages])

	return (
		<Container>
			<Typography variant='h1'>Chat</Typography>
			<MessageList allMessages={allMessages} userId={userId} />

			<MessageInput setMessage={setMessage} />
		</Container>
	)
}
export default Chat
