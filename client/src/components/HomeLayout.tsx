import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BackgroundLayout from "./BackgroundLayoutNeon";

export default function HomeLayout() {
  return (
    <BackgroundLayout>
      <Navbar />
      <Outlet />
    </BackgroundLayout>
  );
}
