import { ReactNode } from "react";

interface MainPageProps {
  children: ReactNode;
  componentStyle?: React.CSSProperties;
}

const MainPage = ({ children, componentStyle }: MainPageProps): JSX.Element => {
  return (
    <div style={{ minHeight: "100vh", padding: 20, ...componentStyle }}>
      {children}
    </div>
  );
};

export default MainPage;
