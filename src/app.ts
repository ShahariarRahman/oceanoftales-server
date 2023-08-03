import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application routes
// app.use("/api/v1/users/", UserRoutes);

app.use("/api/v1", routes);

// root
app.get("/", async (req, res) => {
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Welcome to Ocean Of Tales Server" });
});

app.use(globalErrorHandler);

// handle not found:
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    succuss: false,
    message: req.originalUrl,
    errorMessages: [{ path: ".", message: "API Not Found" }],
  });
  next();
});

// test:

// const test = async () => {
//   console.log("hello");
// };

// test();

export default app;
