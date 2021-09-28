const {ApolloServer} = require('apollo-server');
const fs = require('fs');
const path = require('path');

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
        link: (parent, args) => links.find(item => item.id === args.id)
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length + 1;
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const index = links.findIndex(item => item.id === args.id);
            const link = links[index];
            const linkUpdated = {
                id: link.id,
                description: args.description ? args.description : link.description,
                url: args.url ? args.url : link.url,
            }
            links[index] = linkUpdated;
            return linkUpdated;
        },
        deleteLink: (parent, args) => {
            const index = links.findIndex(item => item.id === args.id);
            const link = links[index];
            links.splice(index, 1);
            return link;
        }
    },
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`)
    );