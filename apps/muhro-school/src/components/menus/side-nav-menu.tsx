import { routes } from "@/lib/config/routes";
import HomeIcon from "../icons/home";
import SettingIcon from "../icons/setting";
import AnalyticsIcon from "../icons/analytics";
import SchoolIcon from "../icons/school";
import UserGroupIcon from "../icons/user-group";
import HRIcon from "../icons/human-resource";
import StudentIcon from "../icons/student";
import EventCalendar from "../icons/event-calender";
import ReceiptIcon from "../icons/receipt";
import ChatIcon from "../icons/chat-icon";
import RoleFolder from "../icons/role-folder";

export const SideNavMenus = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    path: routes.dashboard,
    collapsable: false,
  },

  {
    id: "read_school",
    title: "School Management",
    icon: <SchoolIcon />,
    path: routes.school_management.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_students",
    title: "Students Management",
    icon: <StudentIcon />,
    path: routes.student_management.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_parents",
    title: "Parents Management",
    icon: <UserGroupIcon />,
    path: routes.parents_management.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_academic_events",
    title: "Academic Events",
    icon: <EventCalendar />,
    path: routes.academic_events.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_fees",
    title: "School Fee Management",
    icon: <ReceiptIcon />,
    path: routes.school_fee_management.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_human_resource",
    title: "School Staffs",
    icon: <HRIcon />,
    path: routes.human_resource.list,
    collapsable: false,
    children: [],
  },

  {
    id: "read_communications",
    title: "Communication",
    icon: <ChatIcon />,
    path: routes.messages.list,
    collapsable: false,
    children: [],
  },

  {
    id: "system_configuration",
    title: "Configurations",
    icon: <SettingIcon />,
    path: routes.configuration.list,
    collapsable: true,
    children: [
      {
        id: "system_configuration-read_permissions",
        title: "Roles & Permissions",
        icon: <RoleFolder />,
        path: routes.role_permission.list,
        collapsable: false,
        children: [],
      },
    ],
  },

  {
    id: "analytics-report",
    title: "Analytics Report",
    icon: <AnalyticsIcon />,
    path: routes.system_report.list,
    collapsable: false,
    children: [],
  },
];
