import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models'
import {PostCollection} from './models/models'
import {PostModel} from './models/models'
import LoginView from './views/loginView'
import DashBoardView from './views/dashboardView'
import PostEditorView from './views/postEditorView'
import ACTIONS from './actions'


const app = function() {
	const blogRouter = Backbone.Router.extend({
		routes:{
			"posts/myposts": "showMyPosts",
			"posts/compose": "showPostEditor",
			"home": "showDashboard",
			"login": "showLogin",
			"*catchall": "redirect"
		},

		redirect: function(){
			location.hash = "home"
		},

		showMyPosts: function(){
			let postColl = new PostCollection({limitedToUser: true	});
			postColl.fetch().then((d)=>{
				console.log(postColl)
			ReactDOM.render(<DashBoardView coll={postColl} />, document.querySelector(".container"))
			})
		},

		showPostEditor: function(){
			ReactDOM.render(<PostEditorView />, document.querySelector(".container"))
		},

		showDashboard: function(){
			let coll = new PostCollection({limitedToUser: false})
			console.log('coll in dashboard', coll)
			coll.fetch().fail(function(err){
				console.log(err)
			})
			ReactDOM.render(<DashBoardView coll={coll} />, document.querySelector(".container"))
		},

		showLogin: function(){
			ReactDOM.render(<LoginView />, document.querySelector(".container"))
		},

		initialize: function(){
			Backbone.history.start()
			this.on('route', function(rtHandler){
				if(!User.getCurrentUser()){
					location.hash = 'login'
				}
				else {
					if(rtHandler.toLowerCase().includes('login')){
						location.hash = 'home'
					}
					window.rh = rtHandler

				}
			})
		}
	})

	new blogRouter()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
