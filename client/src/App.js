import React, { useState } from 'react'
import Chat from './components/Chat'
import { UserProvider } from './components/contexts/UserContext'

function App() {
	return (
		<div>
			<UserProvider>
				<Chat />
			</UserProvider>
		</div>
	)
}

export default App
