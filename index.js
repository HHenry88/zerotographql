import express from 'express';
import graphQLHTTP from 'express-graphql';
import DataLoader from 'dataloader';

import schema from './schema';

const app = express();

app.use(graphQLHTTP( req => {
  const personLoader = new DataLoader(
    keys => Promise.all(key.maps(getPersonByURL))
  )
  const loaders = {
    person: personLoader
  }
  return {
    //pass in a schema
    context: {loaders},
    schema,
    //turn on graphiql
    graphiql: true,
  }
}))

app.listen(4000);
