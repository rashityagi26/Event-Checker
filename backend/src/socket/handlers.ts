import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';

export function setupSocketHandlers(io: SocketIOServer, prisma: PrismaClient) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join event room
    socket.on('joinEvent', async (data: { eventId: string; userId: string }) => {
      try {
        const { eventId, userId } = data;
        
        // Join the socket room for this event
        socket.join(`event:${eventId}`);
        
        // Get updated event data with attendees
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: {
            attendees: true
          }
        });

        if (event) {
          // Broadcast to all clients in the event room
          io.to(`event:${eventId}`).emit('eventUpdated', {
            eventId,
            attendees: event.attendees,
            attendeeCount: event.attendees.length
          });

          // Broadcast that a user joined
          const user = await prisma.user.findUnique({
            where: { id: userId }
          });

          if (user) {
            io.to(`event:${eventId}`).emit('userJoinedEvent', {
              eventId,
              user
            });
          }
        }

        console.log(`User ${userId} joined event ${eventId}`);
      } catch (error) {
        console.error('Error in joinEvent socket handler:', error);
      }
    });

    // Leave event room
    socket.on('leaveEvent', (data: { eventId: string; userId: string }) => {
      const { eventId, userId } = data;
      socket.leave(`event:${eventId}`);
      console.log(`User ${userId} left event ${eventId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}






