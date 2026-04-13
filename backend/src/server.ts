import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { requestLogger } from "./middleware/request-logger.js";
import { authRouter } from "./routes/auth.js";
import { employerProfileRouter } from "./routes/employer-profile.js";
import { healthRouter } from "./routes/health.js";
import { opsStatusRouter } from "./routes/ops-status.js";
import { workerProfileRouter } from "./routes/worker-profile.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(healthRouter);
app.use("/auth", authRouter);
app.use(opsStatusRouter);
app.use("/profiles/worker", workerProfileRouter);
app.use("/profiles/employer", employerProfileRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Backend running at http://localhost:${env.PORT}`);
});
