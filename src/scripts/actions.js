import {User} from './models/models'
import {PostCollection} from './models/models'
import DashboardView from './views/dashboardView'

const ACTIONS = {
	registerUser: function(email,password){
		return User.register(email,password).then((respond) => {
			this.logUserIn(email,password)
		})
	},

	logUserIn: function(email,password){
		return User.login(email,password).then(function(respond){
			location.hash = 'home'
		})
	},

	logUserOut: function(email,password){
		return User.logout().then(() =>{
			location.hash = 'login'
		})
	},

}

export default ACTIONS