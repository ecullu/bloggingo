import React from 'react'
import Header from './header'
import {PostModel} from '../models/models'
import {User} from '../models/models'

const postEditorView = React.createClass({
	render: function() {
		return (
				<div className="compose-post">
					<Header />
					<Composer />
				</div>
			)
	}
})

const Composer = React.createClass({
	_savePost: function(event){
		event.preventDefault()
		var newPost = new PostModel({
			author: User.getCurrentUser().email, 
			title: event.target.title.value,
			content: event.target.content.value
		})
		newPost.save()
	},

	render: function (){
		return (
				<form onSubmit={this._savePost}>
					<input name="title" placeholder="title" />
					<input name="content" placeholder="content" />
					<button type="submit" value="submit!">Submit!</button>
				</form>
				)
	}
})

export default postEditorView