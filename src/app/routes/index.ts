import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserBookRoutes } from "../modules/userBook/userBook.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/user-book",
    route: UserBookRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
