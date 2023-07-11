import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const ROUTES = import.meta.glob("./pages/**/[a-z[]*.tsx", { eager: true });

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  // @ts-ignore
  return { path, component: ROUTES[route].default };
});

export function Router() {
  const BrowserRouter = createBrowserRouter(
    routes.map((route) => ({
      path: route.path.replace(/^\.\/pages/, "").toLowerCase(),
      element: <Fragment>{route.component()}</Fragment>,
    }))
  );

  return (
    <Fragment>
      <RouterProvider router={BrowserRouter} />
    </Fragment>
  );
}

// Ref: https://omarelhawary.me/blog/file-based-routing-with-react-router/