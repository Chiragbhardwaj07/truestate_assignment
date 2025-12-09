const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: Number(process.env.PORT) || 4000 },
        context: async ({ req }) => ({ token: req.headers.token }),
    });
    console.log(`🚀  Server ready at: ${url}`);
};

startServer();
