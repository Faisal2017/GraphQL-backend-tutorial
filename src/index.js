const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}, 
{
  id: 'link-1',
  url: 'www.howtographql-2.com',
  description: 'Backend practice with GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',

    feed: () => links,

    link: (parent, args) => {

      for (const ind_link of links) {
        if (ind_link.id === args.id) {
          return ind_link
        }
      }
    }
  },

  Mutation: {
    post: (parent, args) => {

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start( () => console.log(`Server is running on http://localhost:4000`) )