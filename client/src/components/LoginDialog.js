import React, { useState, useContext, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { v4 as uuidV4 } from 'uuid'
import UserContext from './contexts/UserContext'

const LoginDialog = (props) => {
	const { setLoggedUser } = props
	const { registeredUsers, setRegisteredUsers } = useContext(UserContext)

	const [open, setOpen] = useState(false)

	const [name, setName] = useState('')

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleLogin = () => {
		if (name !== '') {
			let isRegistered = registeredUsers.filter((user) => user.name === name)
			if (isRegistered.length > 0) {
				console.log('isRegistered ', isRegistered)
				setLoggedUser(isRegistered[0])
			} else {
				let newUser = {
					name,
					uuid: uuidV4(),
				}
				setLoggedUser(newUser)

				setRegisteredUsers((registeredUsers) => [...registeredUsers, newUser])
			}
		}
		setOpen(false)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Login</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>Please login</DialogContentText> */}
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleLogin()
							}
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>

					<Button onClick={handleLogin} color='primary'>
						Login
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default LoginDialog
