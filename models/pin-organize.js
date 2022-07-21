import prismaClient from './prisma-client.js';

export async function organizePins(userId, pinId, boardId) {
  return prismaClient.$transaction([
    prismaClient.$queryRaw`
      DELETE FROM unboard_pin 
      WHERE pin_id = ${pinId} AND user_id = ${userId};
    `,
    prismaClient.$queryRaw`
      INSERT INTO board_store (board_id, pin_id) VALUES (${boardId}, ${pinId}); 
   `,
  ]);
}
