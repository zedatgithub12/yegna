export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  forgotPassword: "/auth/forgot-password",

  //main pages
  dashboard: "/dashboard",
  customers: {
    list: "/customers",
    create: "/customers/create",
  },
  merchants: {
    list: "/merchants",
    create: "/merchants/create",
  },
  transactions: "/transactions",
};
