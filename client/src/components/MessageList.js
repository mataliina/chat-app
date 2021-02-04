import React from 'react'
import { Grid, Paper } from '@material-ui/core'

const MessageList = (props) => {
	const { allMessages, userId } = props

	console.log('messages listissa ', allMessages)

	const mapMessages = (msgs) => {
		console.log('mapataan')
		if (msgs.length > 0) {
			return msgs.map((msg, index) => {
				if (msg.userId === userId) {
					return (
						<Grid item>
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
					<Grid item>
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
		return <li>Ei viestejä</li>
	}

	return (
		<Grid container direction='column' spacing={2}>
			{mapMessages(allMessages)}
		</Grid>
	)
}
export default MessageList
