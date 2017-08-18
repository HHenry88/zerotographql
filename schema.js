import  { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import fetch from 'node-fetch';

const DATA_URL = 'http://localhost:8000';

function getPersonByURL(relativeURL){
  fetch(`${DATA_URL}${relativeURL}`)
    .then(res => res.json())
    .then(json => json.person)
}

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: '...',

  fields:() => ({
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.first_name
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.last_name
    },
    email: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString
    },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: (person, args, {loaders}) =>
        loaders.person.loadMany(person.friends)
    }
  })
});

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
      resolve: (root, args, {loaders}) => {
        //can do promises, http requests, etc.
        return loaders.person.load(`/people/${args.id}/`);
      }
    }
  })
})

//export our schema to be used as middleware
export default new GraphQLSchema({
  query: QueryType,
})
