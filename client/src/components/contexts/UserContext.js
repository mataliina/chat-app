import React, { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = (props) => {
	const initialUsers = () => {
		if (localStorage.getItem('registeredChatUsers')) {
			return JSON.parse(localStorage.getItem('registeredChatUsers'))
		}
		return []
	}

	const [registeredUsers, setRegisteredUsers] = useState(initialUsers)

	useEffect(() => {
		console.log('lisätään localstorageen', registeredUsers)
		localStorage.setItem('registeredChatUsers', JSON.stringify(registeredUsers))
	}, [registeredUsers])

	return <UserContext.Provider value={{ registeredUsers, setRegisteredUsers }}>{props.children}</UserContext.Provider>
}
export { UserProvider, UserContext }

export default UserContext
