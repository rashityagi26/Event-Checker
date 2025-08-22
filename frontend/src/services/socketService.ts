import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect() {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    this.socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinEvent(eventId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('joinEvent', { eventId, userId });
    }
  }

  leaveEvent(eventId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('leaveEvent', { eventId, userId });
    }
  }

  onEventUpdated(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('eventUpdated', callback);
    }
  }

  onUserJoinedEvent(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('userJoinedEvent', callback);
    }
  }

  offEventUpdated() {
    if (this.socket) {
      this.socket.off('eventUpdated');
    }
  }

  offUserJoinedEvent() {
    if (this.socket) {
      this.socket.off('userJoinedEvent');
    }
  }

  getSocket() {
    return this.socket;
  }

  isSocketConnected() {
    return this.isConnected;
  }
}

export const socketService = new SocketService();



