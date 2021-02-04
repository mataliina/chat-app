import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const MessageInput = ({ setMessage }) => {
	//const { setMessage } = props
	const [inputValue, setInputValue] = useState('')

	const handleClick = () => {
		//e.preventDefault()
		setMessage(inputValue)
		setInputValue('')
	}

	return (
		<Grid container spacing={2} alignItems='flex-end'>
			<Grid item xs={10}>
				<TextField
					label='message'
					color='secondary'
					autoFocus
					fullWidth
					id='input'
					aria-describedby='message'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							handleClick()
						}
					}}
				/>
			</Grid>
			<Grid item xs={2}>
				<Button variant='outlined' onClick={handleClick}>
					Send
				</Button>
			</Grid>
		</Grid>
	)
}
export default MessageInput
