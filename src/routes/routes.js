import { Home } from "../Component/home/Home";
import { User } from "../Component/user/User";
import { LayoutBasic } from "../layouts/LayoutBasic";
import { Error404 } from "./../Component/errors/Error404";


export const routes = [
  

  {
    path: "/",
    layout: LayoutBasic,
    component: Home,
    exact: true,
  },
  {
    path: "/:userName",
    layout: LayoutBasic,
    component: User,
    exact: true,
  },
  {
    layout: LayoutBasic,
    component: Error404,
  },
];
