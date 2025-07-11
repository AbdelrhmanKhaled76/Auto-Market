import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import CarDetails from "../layouts/carDetails";

const Home = lazy(() => import("../pages/Home"));
const BrowseCars = lazy(() => import("../pages/BrowseCars"));
const SellCar = lazy(() => import("../pages/SellCar"));
const Signup = lazy(() => import("../pages/Signup"));
const SignIn = lazy(() => import("../pages/SignIn"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading ....</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="browse-cars" element={<BrowseCars />} />
          <Route path="car-details" element={<CarDetails />} />
          <Route path="sell-car" element={<SellCar />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
