interface menuItem {
  id: string;
  title: string;
  icon?: string;
  path: string;
  collapsable: boolean;
  children?: menuItem[];
}
