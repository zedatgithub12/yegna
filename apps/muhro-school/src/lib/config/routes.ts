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

  human_resource: {
    list: "/human-resource",
    create: "/human-resource/add-user",
    edit: (id: string) => `/human-resource/edit-user/${id}`,
    details: (id: string) => `/human-resource/details/${id}`,
  },

  user: {
    list: "/user-management",
    create: "/user-management/add-user",
    edit: (id: string) => `/user-management/edit-user/${id}`,
    details: (id: string) => `/user-management/details/${id}`,
  },

  role_permission: {
    list: "/role-permission",
    create: "/role-permission/create",
    edit: (id: string) => `/role-permission/edit/${id}`,
  },

  role: {
    permissions: (id: string) => `/role/permissions/${id}`,
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
