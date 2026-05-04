import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BackgroundLayout from "./BackgroundLayout";

export default function MainLayout() {
  return (
    <BackgroundLayout>
      <Navbar />
      <Outlet />
    </BackgroundLayout>
  );
}
