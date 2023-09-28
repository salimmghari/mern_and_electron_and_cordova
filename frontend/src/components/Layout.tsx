import React from 'react';


interface LayoutProps {
  className?: string | undefined;
  children?: any;
}


const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <div className={"w-full flex flex-col justify-center items-center p-10 secondary-bg-color " + props.className}>
      {props.children}
    </div>
  );
}


export default Layout;
