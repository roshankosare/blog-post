import { singIn } from "@/lib/auth/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const user = await singIn({ email, password });
      return res.status(200).json({ user: user.id });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
