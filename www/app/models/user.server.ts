import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db/db.server";

export type { User } from "@prisma/client";

export function createUserType(user: any) {
  const {
    jwtToken,
    dateRecentPost,
    likedIdeas,
    subscribed,
    subscribers,
    totalViews,
    ideas,
    ...rest
  } = user;
  return rest as User;
}

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(user: User, password: User["password"]) {
  const { id, payments, ...rest } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      ...rest,
      payments: {
        create: {
          paid: payments.paid,
          amount: payments.amount,
          datePaid: payments.datePaid,
        },
      },
      password: hashedPassword,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function login(
  username: User["username"],
  password: User["password"],
) {
  const response = await fetch(
    `${process.env.OE_API_URL}/login?username=${encodeURIComponent(
      username,
    )}&password=${encodeURIComponent(password)}`,
  );
  let result = null;
  if (response.status === 200) {
    result = await response.json();
  } else {
    result = null;
  }
  return result;
}

export async function verifyLogin(
  email: User["email"],
  password: User["password"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
