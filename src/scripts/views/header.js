import React from 'react'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Header = React.createClass({
	render: function(){
		console.log('current user>>>', User.getCurrentUser().email)
		let currentUser = User.getCurrentUser().email
		return (
				<div id="header">
					<div className="title">
						<h1>Aloha Bloggingo</h1>
						<div className="logout">
							<h5>You're logged in as {currentUser}</h5>
							<button onClick={ACTIONS.logUserOut}>Log out</button> 
						</div>
					</div>
					<div className="dashboard">
						<div className="navbar">
							<a href="#home">Home</a>
							<a href="#posts/myposts">My Posts</a>
							<a href="#posts/compose">New Post</a>
						</div>
					</div>
				</div> 
			)
	}
})

export default Header