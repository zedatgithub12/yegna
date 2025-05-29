import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      user: {
        roleId: string;
        userName: string;
        phoneNumber: string;
        fullname: string;
        homeBranch: string;
        branchName: string;
        loginTime: number;
        roles: {
          permissions: { uuid: string; name: string };
        }[];
      };
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      token;
      user: {
        roleId: string;
        userName: string;
        fullname: string;
        phoneNumber: string;
        homeBranch: string;
        branchName: string;
        loginTime: number;
      };
    } & DefaultSession["user"];
  }
}
