import type { SidebarMenuItem, SiteMetadata } from '../types';

export interface SidebarProps {
  onClose?: () => void;
  sidebarMenuItem: SidebarMenuItem[];
  siteMetadata?: SiteMetadata;
}
