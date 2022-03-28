const express = require('express');
const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  connectDB();

  app.use(express.json({ extender: false }));

  app.get('/', (req, res) => res.send('API running'));

  const PORT = process.env.PORT || 5000;

  // app.use('/api/students', require('./routes/api/students'));
  // app.use('/api/auth', require('./routes/api/auth'));
  // app.use('/api/courses', require('./routes/api/courses'));

  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

startServer();
