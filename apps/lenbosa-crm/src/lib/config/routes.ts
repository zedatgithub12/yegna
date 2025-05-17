export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  forgotPassword: "/auth/forgot-password",

  //main pages
  dashboard: "/dashboard",

  messages: {
    list: "/message-broadcast",
    create: "/message-broadcast/create",
  },

  subscription: {
    list: "/subscription",
    create: "/subscription/create",
  },

  api_keys: {
    list: "/api-key",
    create: "/api-key/create",
  },

  user: {
    list: "/user-management",
    create: "/user-management/create",
  },

  role_permission: {
    list: "/role-permission",
    create: "/role-permission/create",
  },

  configuration: {
    list: "/configuration",
    create: "/configuration/create",
  },

  system_report: {
    list: "/system-report",
    create: "/system-report/create",
  },

  system_log: {
    list: "/system-log",
    create: "/system-log/create",
  },
  system_health: {
    list: "/system-health",
    create: "/system-health/create",
  },
};
