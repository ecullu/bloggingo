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


const app = function() {
	const blogRouter = Backbone.Router.extend({
		routes:{
			"posts/allposts": "showAllPosts",
			"posts/myposts": "showMyPosts",
			"posts/compose": "showPostEditor",
			"home": "showDashboard",
			"login": "showLogin",
			"*catchall": "redirect"
		},

		showAllPosts: function(){
			ReactDOM.render(<AllPostsView />, document.querySelector(".container"))
		},

		showMyPosts: function(){
			ReactDOM.render(<MyPostsView />, document.querySelector(".container"))
		},

		showPostEditor: function(){
			ReactDOM.render(<PostEditorView />, document.querySelector(".container"))
		},

		showDashboard: function(){
			var coll = new PostCollection()
			coll.fetch().fail(function(err){
				console.log(err)
			})
			// console.log('creating new post collection')
			ReactDOM.render(<DashBoardView coll={coll} />, document.querySelector(".container"))
		},

		showLogin: function(){
			ReactDOM.render(<LoginView />, document.querySelector(".container"))
		},

		initialize: function(){
			Backbone.history.start()
			this.on('route', function(rtHandler){
				// console.log(rtHandler)
				// console.log('current user> ',User.getCurrentUser())
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
