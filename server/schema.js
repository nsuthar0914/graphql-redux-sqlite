import * as _ from 'underscore';

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
let authorsCollection;
let postsCollection;
let commentsCollection;

// Standard Connection URL
const url = "mongodb://admin:admin123@127.0.0.1:27017/mydb";
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongodb server");

  authorsCollection = db.collection('authors');
  commentsCollection = db.collection('comments');
  postsCollection = db.collection('posts');

  // db.close();
});
// You can use any MONGO_URL here, whether it's locally or on cloud.
// const db = mongo('mongodb://admin:admin123@127.0.0.1:27017/mydb');

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'A Category of the blog',
  values: {
    NEWS: {value: 'news'},
    EVENT: {value: 'event'},
    USER_STORY: {value: 'user-story'},
    OTHER: {value: 'other'}
  }
});

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

const HasAuthor = new GraphQLInterfaceType({
  name: 'HasAuthor',
  description: 'This type has an author',
  fields: () => ({
    author: {type: Author}
  }),
  resolveType: (obj) => {
    if(obj.title) {
      return Post;
    } else if(obj.replies) {
      return Comment;
    } else {
      return null;
    }
  }
});

const Comment = new GraphQLObjectType({
  name: 'Comment',
  interfaces: [HasAuthor],
  description: 'Represent the type of a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    content: {type: GraphQLString},
    author: {
      type: Author,
      resolve: function({_id}) {
        return authorsCollection.findOne({_id});
      }
    },
    timestamp: {type: GraphQLFloat},
    replies: {
      type: new GraphQLList(Comment),
      description: 'Replies for the comment',
      resolve: function() {
        return commentsCollection.find().toArray();
      }
    }
  })
});

const Post = new GraphQLObjectType({
  name: 'Post',
  interfaces: [HasAuthor],
  description: 'Represent the type of a blog post',
  fields: () => ({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    category: {type: Category},
    summary: {type: GraphQLString},
    content: {type: GraphQLString},
    timestamp: {
      type: GraphQLFloat,
      resolve: function(post) {
        if(post.date) {
          return new Date(post.date['date']).getTime();
        } else {
          return null;
        }
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the comments returing'}
      },
      resolve: function(post, {limit}) {
        if(limit >= 0) {
          return commentsCollection.find().limit(limit).toArray();
        }

        return commentsCollection.find().toArray();
      }
    },
    author: {
      type: Author,
      resolve: function({author}) {
        console.log(author, 'authorvsaf');
        return authorsCollection.findOne({_id:author});
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: {
      type: new GraphQLList(Post),
      description: 'List of posts in the blog',
      args: {
        category: {type: Category}
      },
      resolve: function(source, {category}) {
        if(category) {
          return _.filter(postsCollection.find().toArray(), post => post.category === category);
        } else {
          return postsCollection.find().toArray();
        }
      }
    },

    latestPost: {
      type: Post,
      description: 'Latest post in the blog',
      resolve: function() {
        return postsCollection.find().sort({timestamp:1}).toArray().then(posts => {
          return posts[0];
        });
      }
    },

    recentPosts: {
      type: new GraphQLList(Post),
      description: 'Recent posts in the blog',
      args: {
        count: {type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent items'}
      },
      resolve: function(source, {count}) {
        return postsCollection.find().sort({timestamp:1}).toArray().then(posts => {
          return posts.slice(0, count);
        });
      }
    },

    post: {
      type: Post,
      description: 'Post by _id',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {_id}) {
        return _.filter(postsCollection.find().toArray(), post => post._id === _id)[0];
      }
    },
    authors: {
      type: new GraphQLList(Author),
      resolve: function(rootValue, args, info) {
        let fields = {};
        let fieldASTs = info.fieldASTs;
        fieldASTs[0].selectionSet.selections.map(function(selection) {
          fields[selection.name.value] = 1;
        });
        return authorsCollection.find({}, fields).toArray();
      }
    },
    author: {
      type: Author, 
      args: { 
        _id: { type: GraphQLString}
      },
      resolve: function(rootValue, {_id}) {
        console.log(_id, 'author')
        return authorsCollection.findOne({_id});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createPost: {
      type: Post,
      description: 'Create a new blog post',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        summary: {type: GraphQLString},
        category: {type: Category},
        author: {type: new GraphQLNonNull(GraphQLString), description: 'Id of the author'}
      },
      resolve: function(source, {...args}) {
        let post = args;
        let alreadyExists = _.findIndex(postsCollection.find().toArray(), p => p._id === post._id) >= 0;
        if(alreadyExists) {
          throw new Error('Post already exists: ' + post._id);
        }
        alreadyExists = _.findIndex(authorsCollection.find().toArray(), p => p._id === post.author) >= 0;
        if(alreadyExists) {
          throw new Error('No such author: ' + post.author);
        }

        if(!post.summary) {
          post.summary = post.content.substring(0, 100);
        }

        post.comments = [];
        post.date = {date: new Date().toString()}

        return postsCollection.insert(post)
          .then(_=> post);
      }
    },
    createAuthor: {
      type: Author,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(rootValue, args) {
        let author = Object.assign({}, args);
        return authorsCollection.insert(author)
          .then(_ => author);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
