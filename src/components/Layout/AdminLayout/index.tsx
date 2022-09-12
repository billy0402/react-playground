type Props = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <h1>AdminLayout</h1>
      {children}
    </>
  );
};

export default AdminLayout;
