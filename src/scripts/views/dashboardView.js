import React from 'react'
import Header from './header'

const DashboardView = React.createClass({
	getInitialState: function(){
		return {
			coll: this.props.coll
		}
	},

	componentWillMount: function(){
		this.state.coll.on('sync', () => {
			this.setState({
				coll: this.state.coll
			})
		})
	},

	render: function(){
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
						return <Post coll={post} key={post.id}/>
					})}
				</div>
			)
	}
})

const Post = React.createClass({
	render: function(){
			// console.log('coll in allposts', this.props.coll)
		return (
				<div className="blog-post">
					<div className="post-title">
						<h3>{this.props.coll.attributes.title}</h3>
					</div>
					<div className="post-author">
						<h5>{this.props.coll.attributes.author}</h5>
					</div>
					<div className="post-content">
						<p>{this.props.coll.attributes.content}</p>
					</div>
				</div>
			)
	}
})

export default DashboardView