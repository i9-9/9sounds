const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.piece.deleteMany();
  await prisma.piece.createMany({
    data: [
      {
        title: 'Example Piece 1',
        description: 'This is an example piece',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        dateAdded: new Date(),
      },
      {
        title: 'Example Piece 2',
        description: 'Another example piece',
        coverArt: 'https://picsum.photos/200',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        dateAdded: new Date(),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 