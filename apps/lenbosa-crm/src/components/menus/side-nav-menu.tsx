import { routes } from "@/lib/config/routes";
import HomeIcon from "../icons/home";
import MessageIcon from "../icons/message";
import StarIcon from "../icons/star";
import PluginIcon from "../icons/plugin";
import UserGroupIcon from "../icons/user-group";
import HRIcon from "../icons/human-resource";
import SettingIcon from "../icons/setting";
import AnalyticsIcon from "../icons/analytics";
import LogIcon from "../icons/logs";
import HealthIcon from "../icons/system-health";
import InstitutionIcon from "../icons/institution";
import UserIcon from "../icons/user-icon";

export const SideNavMenus = [
  {
    id: "read_dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    path: routes.dashboard,
    collapsable: false,
  },

  {
    id: "read_institution",
    title: "Institution Management",
    icon: <InstitutionIcon />,
    path: routes.institution.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_message_broadcast",
    title: "Message Broadcast",
    icon: <MessageIcon />,
    path: routes.messages.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_subscription",
    title: "Subscriptions",
    icon: <StarIcon />,
    path: routes.subscription.list,
    collapsable: true,
    children: [
      {
        id: "read_subscription",
        title: "Subscription Plans",
        icon: <></>,
        path: routes.subscription.list,
        collapsable: false,
        children: [],
      },
      {
        id: "read_subscribers",
        title: "Subscribers",
        icon: <></>,
        path: routes.subscription.list,
        collapsable: false,
        children: [],
      },
    ],
  },

  {
    id: "read_user",
    title: "Customers",
    icon: <UserIcon />,
    path: routes.customers.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_user",
    title: "User Management",
    icon: <UserGroupIcon />,
    path: routes.user.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_role",
    title: "Role & Permissions",
    icon: <HRIcon />,
    path: routes.role_permission.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system_configuration",
    title: "System Configurations",
    icon: <SettingIcon />,
    path: routes.configuration.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system_report",
    title: "System  Report",
    icon: <AnalyticsIcon />,
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },
  {
    id: "api-key-integration",
    title: "API Key Integration",
    icon: <PluginIcon />,
    path: routes.api_keys.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_activity_log",
    title: "System Log",
    icon: <LogIcon />,
    path: routes.system_log.list,
    collapsable: false,
    children: [],
  },
  {
    id: "system_health",
    title: "System Health",
    icon: <HealthIcon />,
    path: routes.system_health.list,
    collapsable: false,
    children: [],
  },
];
