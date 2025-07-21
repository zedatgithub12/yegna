import { routes } from "@/lib/config/routes";
import HomeIcon from "../icons/home";
import MessageIcon from "../icons/message";
import UserGroupIcon from "../icons/user-group";
import SettingIcon from "../icons/setting";
import AnalyticsIcon from "../icons/analytics";
import LogIcon from "../icons/logs";
import HealthIcon from "../icons/system-health";
import SchoolIcon from "../icons/school";
import JobIcon from "../icons/hr-icon";
import AdsIcon from "../icons/ads_&_campaigns";
import UserManaIcon from "../icons/user-manage";

export const SideNavMenus = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    path: routes.dashboard,
    collapsable: false,
  },
  {
    id: "read_institution",
    permission: "read_institution",
    title: "Institution Management",
    icon: <SchoolIcon />,
    path: routes.institution.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_human_resource",
    title: "Human Resource",
    icon: <JobIcon />,
    path: routes.human_resource.list,
    collapsable: false,
    children: [],
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
    id: "user-management",
    title: "User Management",
    icon: <UserManaIcon />,
    path: routes.messages.list,
    collapsable: true,
    children: [
      {
        id: "parent-management",
        title: "Parent",
        path: routes.user.parent,
        collapsable: false,
      },
      {
        id: "student-management",
        title: "Student",
        path: routes.user.student,
        collapsable: false,
      },
      {
        id: "teacher-management",
        title: "Teacher",
        path: routes.user.teacher,
        collapsable: false,
      },
    ],
  },

  {
    id: "read_campaign",
    permission: "read_campaign",
    title: "Ads & Campaigns",
    icon: <AdsIcon />,
    path: routes.messages.list,
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
    id: "users",
    title: "System Users",
    icon: <UserGroupIcon />,
    path: routes.user.list,
    collapsable: false,
    children: [],
  },
  {
    id: "analytics-report",
    title: "Analytics Report",
    icon: <AnalyticsIcon />,
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },

  {
    id: "log",
    title: "Log",
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
