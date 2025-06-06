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
    details: (id: string) => `/message-broadcast/details/${id}`,
  },

  institution: {
    list: "/institution",
    create: "/institution/create",
    edit: (id: string) => `/institution/edit/${id}`,
    details: (id: string) => `/institution/details/${id}`,
  },

  subscription: {
    list: "/subscription-management",
    subscribers: "/subscription-management/subscribers",
    create: "/subscription-management/create",
    edit: (id: string) => `/subscription-management/edit/${id}`,
  },

  customers: {
    list: "/customers",
    create: "/customers/create",
    details: (id: string) => `/customers/details/${id}`,
  },

  adverts: {
    list: "/adverts",
    create: "/adverts/create",
    edit: (id: string) => `/adverts/edit/${id}`,
    details: (id: string) => `/adverts/details/${id}`,
  },

  api_keys: {
    list: "/api-key",
    create: "/api-key/create",
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
