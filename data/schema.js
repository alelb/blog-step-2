const schema = `
  type Author {
  	_id: ID
  	firstName: String
  	lastName: String
  	email: String
  	posts: [Post]
    comments: [Comment]
  }

  interface Message {
    _id: ID,
    text: String,
    author: Author
  }

  type Post implements Message{
  	_id: ID
  	title: String
  	text: String
  	author: Author
    comments: [Comment]
  }

  type Comment implements Message{
    _id: ID
    text: String
    post: Post
    author: Author
  }

  type Query {
    author(_id: String): Author
    authors(limit: Int, last: Int): [Author]!
		posts(limit: Int, last: Int): [Post]!
    comments(limit: Int, last: Int): [Comment]!
  }

  input AuthorInput {
    firstName: String,
    lastName: String,
    email: String
  }

	input PostInput {
  	title: String
  	text: String
  	author: String
	}

  input CommentInput {
    text: String
    post: String
    author: String
  }

  input DeleteCommentInput {
    comment: String
  }

  input UpdateCommentInput {
    id: String
    text: String
  }

  type Mutation {
    createAuthor(input: AuthorInput) : Author
		createPost(input: PostInput): Post
    createComment(input: CommentInput): Comment
    deleteComment(input: DeleteCommentInput): Comment
    updateComment(input: UpdateCommentInput): Comment
  }

  schema {
    query: Query,
    mutation: Mutation
  }
`;

export { schema }
