const {ApolloServer} = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

let links = [
    {
        id: 'link-1',
        url: 'www.example1.com',
        description: 'Example 1'
    },
    {
        id: 'link-2',
        url: 'www.example2.com',
        description: 'Example 2'
    },
    {
        id: 'link-3',
        url: 'www.example3.com',
        description: 'Example 3'
    }
]

const resolvers = {
    Query: {
        info: () => 'Hello world',
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`)
    );