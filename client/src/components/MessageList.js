import React, { useCallback, useContext } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import UserContext from './contexts/UserContext'

const MessageList = (props) => {
	const { allMessages, loggedUser } = props
	const { registeredUsers } = useContext(UserContext)

	const setRef = useCallback((msg) => {
		if (msg) {
			msg.scrollIntoView({ smooth: true })
		}
	}, [])

	const mapMessages = (msgs) => {
		if (msgs.length > 0) {
			return msgs.map((msg, index) => {
				const lastMessage = msgs.length - 1 === index
				if (msg.userId === loggedUser.uuid) {
					return (
						<Grid item ref={lastMessage ? setRef : null}>
							<Paper
								variant='elevation'
								style={{
									backgroundColor: 'lightblue',
									textAlign: 'right',
									padding: '10px',
									width: '50%',
									margin: '0px 0px auto auto',
								}}
								key={index}
							>
								{msg.body}
							</Paper>
						</Grid>
					)
				}
				return (
					<Grid item ref={lastMessage ? setRef : null}>
						<Typography variant='caption'>{msg.userName}</Typography>
						<Paper
							variant='elevation'
							style={{
								backgroundColor: 'pink',
								padding: '10px',
								width: '50%',
								margin: '0px, auto, auto, 0px',
							}}
							key={index}
						>
							{msg.body}
						</Paper>
					</Grid>
				)
			})
		}
		return (
			<Grid item>
				<Paper variant='elevation' style={{ backgroundColor: 'lavenderblush', padding: '10px', width: '50%' }}>
					No messages
				</Paper>
			</Grid>
		)
	}

	return (
		<Grid container direction='column' spacing={2}>
			{mapMessages(allMessages)}
		</Grid>
	)
}
export default MessageList
