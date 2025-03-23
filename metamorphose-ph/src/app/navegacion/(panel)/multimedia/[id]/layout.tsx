const LayoutId = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-opacity-5 backdrop-blur-md max-w-screen-xl flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default LayoutId;