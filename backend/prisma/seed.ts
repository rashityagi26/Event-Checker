import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
  });

  // Create sample events
  const event1 = await prisma.event.upsert({
    where: { id: 'event-1' },
    update: {},
    create: {
      id: 'event-1',
      name: 'Tech Conference 2024',
      location: 'San Francisco Convention Center',
      startTime: new Date('2024-12-15T09:00:00Z'),
      attendees: {
        connect: [{ id: user1.id }, { id: user2.id }]
      }
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: 'event-2' },
    update: {},
    create: {
      id: 'event-2',
      name: 'Startup Meetup',
      location: 'Silicon Valley Hub',
      startTime: new Date('2024-12-20T18:00:00Z'),
      attendees: {
        connect: [{ id: user1.id }]
      }
    },
  });

  const event3 = await prisma.event.upsert({
    where: { id: 'event-3' },
    update: {},
    create: {
      id: 'event-3',
      name: 'Design Workshop',
      location: 'Creative Studio Downtown',
      startTime: new Date('2024-12-25T14:00:00Z'),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Users created:', { user1, user2, user3 });
  console.log('Events created:', { event1, event2, event3 });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });






