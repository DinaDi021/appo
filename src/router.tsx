import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import {
  AboutUsPage,
  AfterPaymentPage,
  AppointmentPage,
  AppointmentPageDetails,
  AvailableSchedulesDetailsPage,
  AvailableSchedulesPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  PayCartPage,
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
        path: "availableSchedules",
        element: <AvailableSchedulesPage />,
      },
      {
        path: "availableSchedules/:id",
        element: <AvailableSchedulesDetailsPage />,
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
        path: "cart",
        element: <CartPage />,
        children: [
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
        ],
      },
      {
        path: "cart/payment",
        element: <AfterPaymentPage />,
      },
      {
        path: "cart/checkout/liqPay",
        element: <PayCartPage />,
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
        path: "me/prices",
        element: <PricePage />,
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
