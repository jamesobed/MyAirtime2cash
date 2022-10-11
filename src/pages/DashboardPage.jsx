import React from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { UpdateUserSetting } from "../components/Dashboard/update/UpdateUser";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Landing/Navbar";
import AdminDashboard from "./AdminDashboard";
import { ProtectedRoute } from "../routes/AdminProtectedRoute";
import { Error } from "./ErrorPage";

export const DashboardPage = () => {
  return (
    <>
      <Navbar dashboard />
      <Routes>
        <Route path="/:token" element={<Dashboard />}></Route>
        <Route path="/UpdateUser" element={<UpdateUserSetting />}></Route>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
};
