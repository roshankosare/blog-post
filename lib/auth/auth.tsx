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
      },
    });

    const newUserProfile = await prisma.userProfile.create({
      data: {
        email: created.email,
        username: created.username,
        userId: created.id,
      },
    });

    return newUserProfile;
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

    if (!compare(password, user.password)) {
      throw new Error("email or password is incorrect");
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });
    if(!userProfile){
      throw new Error("userProfile not found")
    }

    return userProfile;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("email")) throw new Error(error.message);
    }
    throw new Error("Internal server Error");
  }
};


export { signIn, signUp };
