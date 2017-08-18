import express from 'express';
import graphQLHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use(graphQLHTTP({
  //pass in a schema
  schema,
  //turn on graphiql
  graphiql: true,
}))

app.listen(4000);
