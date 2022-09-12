import { PageLayoutType } from '@enums/page-layout-type';
import useAppSelector from '@hooks/useAppSelector';
import AdminLayout from './AdminLayout';
import ClientLayout from './ClientLayout';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { pageLayoutType } = useAppSelector((state) => state.layout);

  return (
    <>
      {pageLayoutType === PageLayoutType.ADMIN && (
        <AdminLayout>{children}</AdminLayout>
      )}
      {pageLayoutType === PageLayoutType.CLIENT && (
        <ClientLayout>{children}</ClientLayout>
      )}
    </>
  );
};

export default Layout;
