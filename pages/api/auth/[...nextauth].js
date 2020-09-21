import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { updateUser } from "../users/index";

const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  secret: process.env.AUTH_SECRET,

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    // encryption: true,
  },

  callbacks: {
    // signIn: async (user, account, profile) => {
    //   console.log("sign in");
    //   console.log("User:", user);
    //   console.log("Account:", account);
    //   console.log("Profile:", profile);
    //   return Promise.resolve(true);
    // },
    // redirect: async (url, baseUrl) => {
    //   console.log("redirect");
    //   console.log("Url:", url);
    //   console.log("BaseUrl:", baseUrl);
    //   return Promise.resolve(baseUrl);
    // },
    session: async (session, user) => {
      return Promise.resolve(session);
      // session: {user: {name, email, image}}
      // user -> token
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // called at sign-in
      if (user) {
        token.id = user.id;
      }
      if (isNewUser) {
        await updateUser({
          userId: user.id,
          role: "user",
        });
      }
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
