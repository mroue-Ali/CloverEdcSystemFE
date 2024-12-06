export interface RouteInfo {
  path: string;
  title: string;
  iconType: 'material-icons-two-tone' | 'img' | string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  submenu: RouteInfo[];
}
