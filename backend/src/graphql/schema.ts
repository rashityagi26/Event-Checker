import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    events: [Event!]!
    createdAt: String!
    updatedAt: String!
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    events: [Event!]!
    me: User
  }

  type Mutation {
    joinEvent(eventId: ID!): User!
  }

  type Subscription {
    eventUpdated(eventId: ID!): Event!
    userJoinedEvent(eventId: ID!): User!
  }
`;






