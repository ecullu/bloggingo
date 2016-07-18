import React from 'react'

const Header = React.createClass({
	render: function(){
		return (
				<div className="header">
					<div className="title">
						<h2>Hello from bloggingo</h2>
					</div>
					<div className="dashboard">
						<div className="navbar">
							<a href="#home">Home</a>
							<a href="#posts/myposts">My Posts</a>
							<a href="#posts/compose">Create new post</a>
						</div>
					</div>
				</div> 
			)
	}
})

export default Header