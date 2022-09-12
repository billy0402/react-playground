type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <>
      <h1>ClientLayout</h1>
      {children}
    </>
  );
};

export default ClientLayout;
