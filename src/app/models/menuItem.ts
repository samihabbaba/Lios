export interface MenuItem {
  label: string;
  icon?: string;
  isActive: boolean;
  toggled: boolean;
  route?: string;
  children?: any[];
  visible: any[];
}
