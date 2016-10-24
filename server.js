var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var { getAuthor, getAuthors, getPosts, getComments, createAuthor, createPost, createComment, deleteComment, updateComment } = require('./data/connectors.js');
var { schema } = require('./data/schema.js');

var Schema = buildSchema(schema);

var root = {
  author: ({_id}) => {
    return getAuthor({_id});
  },
  authors: ({limit, last}) => {
    return getAuthors({limit, last});
  },
  posts: function() {
    return getPosts();
  },
  comments: function() {
    return getComments();
  },
  createAuthor: function({input}){
    return createAuthor({input});
  },
  createPost: function({input}){
    return createPost({input})
  },
  createComment: function({input}){
    return createComment({input})
  },
  deleteComment: function({id}){
    return deleteComment({id})
  },
  updateComment: function({input}){
    return updateComment({input})
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  })
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
