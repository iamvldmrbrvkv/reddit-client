import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root