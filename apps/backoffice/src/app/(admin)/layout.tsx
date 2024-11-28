import type React from 'react';
import { AdminLayout as UILayout } from '../../components/admin-layout';
import { adminMenu, siteMetadata } from '../providers';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Readonly<AdminLayoutProps>> = ({ children }) => {
  return (
    <UILayout sidebarMenuItem={adminMenu} siteMetadata={siteMetadata}>
      {children}
    </UILayout>
  );
};

export default AdminLayout;
