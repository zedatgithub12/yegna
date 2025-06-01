interface menuItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path: string;
  collapsable: boolean;
  children?: menuItem[];
}
