import React from 'react'
import ACTIONS from '../actions'

const LoginView = React.createClass({
	render: function(){
		return (
				<div>
					<LoginHeader />
					<LoginBox />
					<RegisterBox />
				</div>
			)
	}
})

const LoginHeader = React.createClass({
	render: function(){
		return (
				<div className="login-header"> Welcome to Bloggingo </div>
			)
	}
})

const LoginBox = React.createClass({

	_handleLogin: function(event){
		event.preventDefault()
		ACTIONS.logUserIn(event.target.email.value, event.target.password.value)

	},
	render: function(){
		return (
			<div className="loginBox login">
				<form onSubmit={this._handleLogin} >
					<h3>Log in</h3>
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">log in!</button>
				</form>
			</div>
			)
	}
})

const RegisterBox = React.createClass({
	_handleRegister: function(event){
		event.preventDefault()
		ACTIONS.registerUser(event.target.email.value, event.target.password.value)
	},

	render: function(){
		return (
				<div className="registerBox register">
				<form onSubmit={this._handleRegister} >
					<h3>Register</h3>
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">sign up!</button>
				</form>
			</div>
			)
	}
})

export default LoginView