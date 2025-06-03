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
import AdsIcon from "../icons/ads_&_campaigns";

export const SideNavMenus = [
  {
    id: "read_dashboard",
    permission: "read_dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    path: routes.dashboard,
    collapsable: false,
  },

  {
    id: "read_institution",
    permission: "read_institution",
    title: "Institution Management",
    icon: <InstitutionIcon />,
    path: routes.institution.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_message_broadcast",
    permission: "read_message_broadcast",
    title: "Message Broadcast",
    icon: <MessageIcon />,
    path: routes.messages.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_subscription",
    permission: "read_subscription",
    title: "Subscriptions",
    icon: <StarIcon />,
    path: routes.subscription.list,
    collapsable: true,
    children: [
      {
        id: "read_subscription",
        permission: "read_subscription",
        title: "Subscription Plans",
        icon: <></>,
        path: routes.subscription.list,
        collapsable: false,
        children: [],
      },
      {
        id: "read_subscription-read_subscribers",
        permission: "read_subscription",
        title: "Subscribers",
        icon: <></>,
        path: routes.subscription.subscribers,
        collapsable: false,
        children: [],
      },
    ],
  },
  {
    id: "ads_campaigns",
    permission: "read_user",
    title: "Ads & Campaigns",
    icon: <AdsIcon />,
    path: routes.adverts.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_user",
    permission: "read_user",
    title: "Customers",
    icon: <UserIcon />,
    path: routes.customers.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_user",
    permission: "read_user",
    title: "User Management",
    icon: <UserGroupIcon />,
    path: routes.user.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_role",
    permission: "read_role",
    title: "Role & Permissions",
    icon: <HRIcon />,
    path: routes.role_permission.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_configuration",
    permission: "read_configuration",
    title: "System Configurations",
    icon: <SettingIcon />,
    path: routes.configuration.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_report",
    permission: "read_report",
    title: "System  Report",
    icon: <AnalyticsIcon />,
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },
  {
    id: "api-key-integration",
    permission: "read_api-key-integration",
    title: "API Key Integration",
    icon: <PluginIcon />,
    path: routes.api_keys.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_activity_log",
    permission: "read_activity_log",
    title: "System Log",
    icon: <LogIcon />,
    path: routes.system_log.list,
    collapsable: false,
    children: [],
  },
  {
    id: "read_system_health",
    permission: "read_system_health",
    title: "System Health",
    icon: <HealthIcon />,
    path: routes.system_health.list,
    collapsable: false,
    children: [],
  },
];
