import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  fetch: globalThis.fetch,
  apiKey: process.env.UPLOADTHING_SECRET,
});
