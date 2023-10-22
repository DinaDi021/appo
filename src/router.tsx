import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import {
  AboutUsPage,
  ContactsPage,
  CoursesPage,
  MainPage,
  NotFoundPage,
  PricePage,
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
