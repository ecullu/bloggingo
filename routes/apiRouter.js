let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post


apiRouter

  apiRouter
    .get('/myPosts', function(req,res){
      if(req.user){
        Post.find({author: req.user.email}, function(err,results){
        if(err) return res.json(err)
          res.json(results)
        })
      }
      else{
        response.status(404).json({
          error: 'no one is logged in'
        })
      }
    })
    .get('/posts', function(req,res){
      Post.find({},function(err,results){
        if(err) return res.json(err)
          res.json(results)
      })
    })
    .post('/posts', function(req,res){
      let newPost = new Post(req.body)
      newPost.save(function(err){
        if(err){
          res.status(404).send(err)
        }
        else{
          res.json(newPost)
        }
      })
    })



  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

module.exports = apiRouter