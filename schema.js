const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema, GraphQLInterfaceType
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        id: { type: GraphQLString },
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        links: { type: LaunchLinksType },
        rocket: { type: RocketType }
    })
});

// launches Type
const LaunchesType = new GraphQLObjectType({
    name: 'Launches',
    fields: () => ({
        id: { type: GraphQLString },
        flight_number: { type: GraphQLInt },
        name: { type: GraphQLString },
        date_local: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        links: {type: LinksType}
    })
});

const LaunchLinksType = new GraphQLObjectType({
    name: 'LaunchLinks',
    fields: () => ({
        mission_patch: { type: GraphQLString },
        wikipedia: { type: GraphQLString },
        youtube_id: { type: GraphQLString }
    })
});

// Links Type
const LinksType = new GraphQLObjectType({
    name: 'Links',
    fields: () => ({
        patch: { type: PatchType }
    })
});

// Patch Type
const PatchType = new GraphQLObjectType({
    name: 'Patch',
    fields: () => ({
        small: { type: GraphQLString },
        large: { type: GraphQLString }
    })
});


// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchesType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v4/launches')
                    .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});