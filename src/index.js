import React from 'react'
import { render } from 'react-dom'
import { StyledEditor } from './StyledEditor'
import { Topbar } from './Topbar'

class App extends React.Component {
	render = () => (
		<div className="container">
			<Topbar />
			<StyledEditor />
		</div>
	)
}

render(<App />, document.getElementById('root'))
