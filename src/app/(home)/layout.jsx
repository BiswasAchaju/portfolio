import { Navbar } from "./_components/Navbar";

export default function HomeLayout({ children }) {
  return <>
  <Navbar/>
  {children}
  
  </>;
}
