import React from 'react'
import Header from './_component/Header';

function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
<Header />
{children}
    </div>
  )
}

export default Dashboardlayout
