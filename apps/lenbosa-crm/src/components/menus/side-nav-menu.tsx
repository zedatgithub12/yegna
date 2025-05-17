import { routes } from "@/lib/config/routes";

export const SideNavMenus = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "/icons/Home.svg",
    path: routes.dashboard,
    collapsable: false,
  },

  {
    id: "message-broadcast",
    title: "Message Broadcast",
    icon: "/icons/Email.svg",
    path: routes.messages.list,
    collapsable: false,
    children: [],
  },

  {
    id: "subscription",
    title: "Subscription Management",
    icon: "/icons/Rate-1.svg",
    path: routes.subscription.list,
    collapsable: false,
    children: [],
  },

  {
    id: "api-key-integration",
    title: "API Key Integration",
    icon: "/icons/plugin.svg",
    path: routes.api_keys.list,
    collapsable: false,
    children: [],
  },

  {
    id: "users",
    title: "User Management",
    icon: "/icons/user-group.svg",
    path: routes.user.list,
    collapsable: false,
    children: [],
  },

  {
    id: "role-permission",
    title: "Role & Permissions",
    icon: "/icons/HR.svg",
    path: routes.role_permission.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-configuration",
    title: "System Configurations",
    icon: "/icons/settings-01.svg",
    path: routes.configuration.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-report",
    title: "System  Report",
    icon: "/icons/analytics-01.svg",
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-log",
    title: "System Log",
    icon: "/icons/Log.svg",
    path: routes.system_log.list,
    collapsable: false,
    children: [],
  },
  {
    id: "system-health",
    title: "System Health",
    icon: "/icons/Health.svg",
    path: routes.system_health.list,
    collapsable: false,
    children: [],
  },
];
