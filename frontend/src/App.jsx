import { useSelector } from "react-redux";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Loading, Navbar } from "./components";
import { Join, Dashboard } from "./pages";
import { Toaster } from "./components/ui/toaster";

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

const publicRoutes = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "*",
    element: <Navigate to="/join" replace />,
  },
]);

function App() {
  const { handleRefreshToken } = useAuth();
  const { accessToken } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.app);

  useEffect(() => {
    handleRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <RouterProvider
        router={accessToken ? privateRoutes : publicRoutes}
      ></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
