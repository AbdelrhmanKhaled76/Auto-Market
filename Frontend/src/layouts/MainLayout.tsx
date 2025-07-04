import Nav from "./Nav";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
