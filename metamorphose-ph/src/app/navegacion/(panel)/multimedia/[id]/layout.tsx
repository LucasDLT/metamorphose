const LayoutId = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-white bg-opacity-5 rounded backdrop-blur-md max-w-screen-xl mx-auto my-32 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default LayoutId;