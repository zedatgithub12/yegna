export const routes = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  forgotPassword: "/auth/forgot-password",

  dashboard: "/dashboard",

  school_management: {
    list: "/school-management",
    create: "/school-management/add-user",
    edit: (id: string) => `/school-management/edit-user/${id}`,
    details: (id: string) => `/school-management/details/${id}`,
  },

  student_management: {
    list: "/students-management",
    create: "/students-management/add-user",
    edit: (id: string) => `/students-management/edit-user/${id}`,
    details: (id: string) => `/students-management/details/${id}`,
  },

  parents_management: {
    list: "/parents-management",
    create: "/parents-management/add-user",
    edit: (id: string) => `/parents-management/edit-user/${id}`,
    details: (id: string) => `/parents-management/details/${id}`,
  },

  academic_events: {
    list: "/academic-events",
    create: "/academic-events/add-user",
    edit: (id: string) => `/academic-events/edit-user/${id}`,
    details: (id: string) => `/academic-events/details/${id}`,
  },

  school_fee_management: {
    list: "/school-fee-management",
    create: "/school-fee-management/add-user",
    edit: (id: string) => `/school-fee-management/edit-user/${id}`,
    details: (id: string) => `/school-fee-management/details/${id}`,
  },

  messages: {
    list: "/message-broadcast",
    create: "/message-broadcast/create",
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

  configuration: {
    list: "/configuration",
    create: "/configuration/create",
  },

  system_report: {
    list: "/system-report",
    create: "/system-report/create",
  },
};
