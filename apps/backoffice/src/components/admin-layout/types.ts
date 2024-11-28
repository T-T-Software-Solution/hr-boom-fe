import type { PropsWithChildren } from 'react';

export interface SidebarMenuItem {
  icon: React.ElementType;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  childrens?: { label: string; link: string }[];
}

export interface SiteMetadata {
  title?: string;
  logoPath?: string;
}

export interface AdminLayoutProps extends PropsWithChildren {
  sidebarMenuItem: SidebarMenuItem[];
  siteMetadata?: SiteMetadata;
}
