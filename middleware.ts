export { default } from "next-auth/middleware";

export const config = { matcher: ["/blog/create", "/blog/write"] };
