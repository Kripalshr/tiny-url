import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorhandler from "errorhandler";
import rateLimit from "express-rate-limit";

import routes from "./routes";

const app = express();

// Middleware
app.use(helmet())
app.use(cors());
app.use(morgan("dev"));

// Body Parser
app.use(express.json());

// Routes
app.use('/', routes )

if (process.env.NODE_ENV === "development") {
    app.use(errorhandler());
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.error(err); // still log it
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;