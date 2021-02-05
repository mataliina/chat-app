import React, { useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import LoginDialog from './LoginDialog'
import { Button } from '@material-ui/core'

import { Container, Typography } from '@material-ui/core'
import UserContext from './contexts/UserContext'

const Chat = (props) => {
	//const { registeredUsers } = useContext(UserContext)

	const [socket, setSocket] = useState()
	//const [userId, setUserId] = useState('')

	const [message, setMessage] = useState('')
	const [allMessages, setAllMessages] = useState([])
	const [loggedUser, setLoggedUser] = useState({})

	console.log('loggedUser,  ', loggedUser)

	const handleLogout = () => {
		setLoggedUser({})
	}

	useEffect(() => {
		const newSocket = io('/')
		setSocket(newSocket)
		return () => newSocket.close()
	}, [])

	useEffect(() => {
		if (socket) {
			// socket.on('your id', (id) => {
			// 	console.log('id: ', id)
			// 	setUserId(id)
			// })
			socket.on('chat message', (msg) => {
				console.log('saapunut viesti: ', msg)

				setAllMessages((allMessages) => [...allMessages, msg])
			})
		}
	}, [socket])

	useEffect(() => {
		if (message !== '') {
			let msgObject = {
				body: message,
				userId: loggedUser.uuid,
				userName: loggedUser.name,
			}
			socket.emit('chat message', msgObject)
			console.log('lähetetty viesti: ', msgObject)
			setMessage('')
		}
	}, [message])

	useEffect(() => {
		console.log('allMessages muuttui: ', allMessages)
	}, [allMessages])

	return (
		<Container>
			{!loggedUser.uuid && <LoginDialog setLoggedUser={setLoggedUser} />}
			{loggedUser.uuid && (
				<>
					<Button variant='outlined' onClick={handleLogout}>
						Logout
					</Button>
					<Typography variant='h1'>Chat</Typography>
					<Typography variant='h5'>{`User: ${loggedUser.name}`}</Typography>

					<MessageList allMessages={allMessages} loggedUser={loggedUser} />

					<MessageInput setMessage={setMessage} />
				</>
			)}
		</Container>
	)
}
export default Chat
