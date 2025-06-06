import { routes } from "@/lib/config/routes";
import HomeIcon from "../icons/home";
import MessageIcon from "../icons/message";
import UserGroupIcon from "../icons/user-group";
import SettingIcon from "../icons/setting";
import AnalyticsIcon from "../icons/analytics";
import LogIcon from "../icons/logs";
import HealthIcon from "../icons/system-health";

export const SideNavMenus = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    path: routes.dashboard,
    collapsable: false,
  },

  {
    id: "message-broadcast",
    title: "Message Broadcast",
    icon: <MessageIcon />,
    path: routes.messages.list,
    collapsable: false,
    children: [],
  },

  {
    id: "users",
    title: "User Management",
    icon: <UserGroupIcon />,
    path: routes.user.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-configuration",
    title: "System Configurations",
    icon: <SettingIcon />,
    path: routes.configuration.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-report",
    title: "System  Report",
    icon: <AnalyticsIcon />,
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system-log",
    title: "System Log",
    icon: <LogIcon />,
    path: routes.system_log.list,
    collapsable: false,
    children: [],
  },
  {
    id: "system-health",
    title: "System Health",
    icon: <HealthIcon />,
    path: routes.system_health.list,
    collapsable: false,
    children: [],
  },
];
