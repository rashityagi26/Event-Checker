import { Context } from './context';

export const resolvers = {
  Query: {
    events: async (_: any, __: any, { prisma }: Context) => {
      try {
        const events = await prisma.event.findMany({
          include: {
            attendees: true
          }
        });
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Failed to fetch events');
      }
    },

    me: async (_: any, __: any, { prisma, user }: Context) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const userData = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            events: true
          }
        });
        return userData;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user data');
      }
    }
  },

  Mutation: {
    joinEvent: async (_: any, { eventId }: { eventId: string }, { prisma, user }: Context) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        // Check if event exists
        const event = await prisma.event.findUnique({
          where: { id: eventId }
        });

        if (!event) {
          throw new Error('Event not found');
        }

        // Check if user is already attending
        const existingAttendance = await prisma.event.findFirst({
          where: {
            id: eventId,
            attendees: {
              some: {
                id: user.id
              }
            }
          }
        });

        if (existingAttendance) {
          throw new Error('User is already attending this event');
        }

        // Add user to event
        const updatedEvent = await prisma.event.update({
          where: { id: eventId },
          data: {
            attendees: {
              connect: { id: user.id }
            }
          },
          include: {
            attendees: true
          }
        });

        // Return the user who joined
        const joinedUser = await prisma.user.findUnique({
          where: { id: user.id }
        });

        return joinedUser;
      } catch (error) {
        console.error('Error joining event:', error);
        throw error;
      }
    }
  },

  Event: {
    attendees: async (parent: any, _: any, { prisma }: Context) => {
      try {
        const event = await prisma.event.findUnique({
          where: { id: parent.id },
          include: {
            attendees: true
          }
        });
        return event?.attendees || [];
      } catch (error) {
        console.error('Error fetching attendees:', error);
        return [];
      }
    }
  },

  User: {
    events: async (parent: any, _: any, { prisma }: Context) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: parent.id },
          include: {
            events: true
          }
        });
        return user?.events || [];
      } catch (error) {
        console.error('Error fetching user events:', error);
        return [];
      }
    }
  }
};






