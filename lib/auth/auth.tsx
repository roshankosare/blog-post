import { compare, hash } from "bcrypt";
import { prisma } from "../prisma/prisma";

const singUp = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) throw new Error("email is already exists");
  const hashedPassword = await hash(password, 10);

  const created = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return created;
};

const singIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new Error("email is incorrect");

  if (!compare(password, user.password)) {
    throw new Error("password is incorrect");
  }

  return user;
};

export { singIn, singUp };
