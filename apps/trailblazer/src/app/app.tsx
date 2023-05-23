// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import { Landing, Dashboard, Frontpage, Profile, Trades } from './views';
import './stylesheets/app.scss';


const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/frontpage",
    element: <Frontpage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/trades",
    element: <Trades />,
  },

]);


export function App() {
  return (
    <RouterProvider router={BrowserRouter} />
  );
}

export default App;
