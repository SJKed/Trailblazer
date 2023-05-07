// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import { Landing, Dashboard } from './views';
import './stylesheets/App.scss';


const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);


export function App() {
  return (
    <RouterProvider router={BrowserRouter} />
  );
}

export default App;
