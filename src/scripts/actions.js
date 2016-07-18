import {User} from './models/models'

const ACTIONS = {
	registerUser: function(email,password){
		return User.register(email,password).then((respond) => {
			console.log(respond)
			this.logUserIn(email,password)
		})
	},

	logUserIn: function(email,password){
		return User.login(email,password).then(function(respond){
			console.log(respond)
			location.hash = 'home'
		})
	}
}

export default ACTIONS