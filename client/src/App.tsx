import { Routes, Route } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import NotFound from "./pages/NotFound";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminMessages from "./pages/admin/AdminMessages";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/login" element={<AdminLogin />} />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects/new"
            element={
              <ProtectedRoute>
                <AdminProjectForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects/:id/edit"
            element={
              <ProtectedRoute>
                <AdminProjectForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
