import { compare, hash } from "bcrypt";
import { prisma } from "../prisma/prisma";

const signUp = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
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
        userProfile: {
          create: {
            email: email,
            username: username,
            avatar: "/avatar.png",
          },
        },
      },
    });

    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId: created.id,
      },
    });
    if (!userProfile) throw new Error("Internal server error");
    return userProfile;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("email")) {
        throw new Error(error.message);
      }
    }
    throw new Error("internal server Error");
  }
};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error("email or password is incorrect");

    if (!await compare(password, user.password)) {
      throw new Error("email or password is incorrect");
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!userProfile) {
      throw new Error("userProfile not found");
    }

    return userProfile;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("email")) throw new Error(error.message);
    }
    throw new Error("Internal server Error");
  }
};
const createUserProfile = async ({
  email,
  username,
  avatar,
}: {
  email: string;
  username: string;
  avatar: string;
}) => {
  try {
    const userProfile = await prisma.userProfile.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        username: username,
        avatar: avatar,
      },
    });

    return userProfile;
  } catch (error) {
    console.log(error);
    throw new Error("internal server Error");
  }
};

const getUserProfile = async (email: string) => {
  const user = await prisma.userProfile.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export { signIn, signUp, createUserProfile, getUserProfile };
