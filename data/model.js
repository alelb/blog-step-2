var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/blog');

let AuthorSchema = new mongoose.Schema({
  _id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  firstName: String,
  lastName: String,
  email: String
});

AuthorSchema.set('toJSON', { getters: true });
let Author = mongoose.model('Author', AuthorSchema);
module.exports.Author = Author;

let PostSchema = new mongoose.Schema({
  _id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  title: String,
  text: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});

PostSchema.set('toJSON', { getters: true });
let Post = mongoose.model('Post', PostSchema);
module.exports.Post = Post;

let CommentSchema = new mongoose.Schema({
  _id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  text: String,
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});

CommentSchema.set('toJSON', { getters: true });
let Comment = mongoose.model('Comment', CommentSchema);
module.exports.Comment = Comment;
