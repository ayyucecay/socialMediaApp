const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { PubSub } = require('graphql-subscriptions');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const PORT = process.env.port || 8000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('db connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })
