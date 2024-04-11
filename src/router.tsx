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
  GalleryPageForMaster,
  LoginPage,
  MainPage,
  NotFoundPage,
  PayCartPage,
  PersonalAccount,
  PricePage,
  RegisterPage,
  ResetPasswordPage,
  ScheduleAddPage,
  SchedulePages,
  SchedulesPageDetails,
  ServicesPage,
  UserInfoPage,
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
            path: "info",
            element: <UserInfoPage />,
          },
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
            path: "addSchedules",
            element: <ScheduleAddPage />,
          },
          {
            path: "schedules/:id",
            element: <SchedulesPageDetails />,
          },
          {
            path: "prices",
            element: <PricePage />,
          },
          {
            path: "gallery",
            element: <GalleryPageForMaster />,
            children: [
              {
                path: ":id",
                element: <GalleryPageForMaster />,
              },
            ],
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
