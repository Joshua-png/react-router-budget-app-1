// HELPERS
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";

// LOADER
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

// IMAGE
import wave from "../assets/wave.svg";

// COMPONENTS
import Nav from "../components/Nav";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>

      <img src={wave} alt="footer image" />
    </div>
  );
};
export default Main;
