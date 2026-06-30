import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const name = process.env.SEED_ADMIN_NAME || 'Administrator';
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'password123';

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log(`Seed admin created: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
