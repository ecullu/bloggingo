import React from 'react'
import Header from './header'
import ACTIONS from '../actions'

const DashboardView = React.createClass({
	getInitialState: function(){
		return {
			coll: this.props.coll
		}
	},

	componentWillMount: function(){
		this.state.coll.on('sync update', () => {
			this.setState({
				coll: this.state.coll
			})
		})
	},

	componentWillReceiveProps: function(newProps){
		console.log('newprops is coming',newProps)
		newProps.coll.on('sync update', () => {
			this.setState({
				coll: newProps.coll
			})
		})
	},

	render: function(){
		let coll = this.props.coll
		
		if(location.hash === "posts/myPosts"){
			let coll = this.props.coll.where({author: ACTIONS.getCurrentUser()})
			console.log(coll)
		}

		return (
				<div className="dashboard">
					<Header />
					<AllPosts coll={this.props.coll}/>
				</div> 
			)
	}
})

const AllPosts = React.createClass({
	render: function(){
		return (
				<div className="all-posts">
					{this.props.coll.map((post)=>{
						return <Post coll={this.props.coll} post={post} key={post.id}/>
					})}
				</div>
			)
	}
})

const Post = React.createClass({
	_handleDelete: function (){
		console.log(this.props)
		this.props.post.destroy()
	},
	render: function(){
			console.log('post in allposts', this.props.post)

		return (
				<div className="blog-post">
					<div className="post-title">
						<h3>{this.props.post.attributes.title}</h3>
					</div>
					<div className="post-author-date">
						<h5>{this.props.post.get('date')}</h5>
						<h5>{this.props.post.attributes.author}</h5>
					</div>
					<div className="post-content">
						<p>{this.props.post.attributes.content}</p>
					</div>
					<div className="post-footer">
						<button onClick={this._handleDelete}>X</button>
					</div>
				</div>
			)
	}
})

export default DashboardView