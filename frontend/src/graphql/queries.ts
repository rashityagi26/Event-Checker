import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      location
      startTime
      attendees {
        id
        name
        email
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      events {
        id
        name
        location
        startTime
      }
    }
  }
`;

export const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      name
      email
    }
  }
`;



