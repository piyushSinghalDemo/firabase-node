import { Application } from "express";
import { all, get, patch, remove } from "./controller";

import { isAuthenticated } from "../auth/authenticated";

export function routesConfig(app: Application) {
  //..
  // lists all users
  app.get("/users", [isAuthenticated, all]);
  // get :id user
  app.get("/users/:id", [isAuthenticated, get]);
  // updates :id user
  app.patch("/users/:id", [isAuthenticated, patch]);
  // deletes :id user
  app.delete("/users/:id", [isAuthenticated, remove]);
}
