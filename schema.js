import  { GraphQLSchema, GraphQLObjectType } from 'graphql';
import fetch from 'node-fetch';

const DATA_URL = 'http://localhost:8000';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        //can do promises, http requests, etc.
        fetch(`${DATA_URL}/people/${args.id}/`)
          .then(res => res.json())
          .then(json => json.person)
      }
    }
  })
})

//export our schema to be used as middleware
export default new GraphQLSchema({
  query: QueryType,
})
