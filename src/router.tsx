import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import {
  AboutUsPage,
  AppointmentPage,
  AppointmentPageDetails,
  ContactsPage,
  CoursesPage,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  PersonalAccount,
  PricePage,
  RegisterPage,
  ResetPasswordPage,
  SchedulePages,
  SchedulesPageDetails,
  ServicesPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"main"} />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "aboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "services/price",
        element: <PricePage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "me",
        element: <PersonalAccount />,
        children: [
          {
            path: "appointments",
            element: <AppointmentPage />,
          },
          {
            path: "appointments/:id",
            element: <AppointmentPageDetails />,
          },
          {
            path: "schedules",
            element: <SchedulePages />,
          },
          {
            path: "schedules/:id",
            element: <SchedulesPageDetails />,
          },
        ],
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "resetPassword/:email/:token",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
