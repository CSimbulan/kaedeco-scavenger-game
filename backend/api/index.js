import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
dotenv.config({ path: "./.env" });
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { connectDB } from "../config/db.js";
import { mergedTypeDefs } from "../graphql/typeDefs/index.js";
import { mergedResolvers } from "../graphql/resolvers/index.js";
import { errorHandler } from "../middleware/error.js";

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
  ],
});

await server.start();

app.use(express.json());
await connectDB(); // Connect to databse
app.use(
  "/",
  cors({
    origin: `${process.env.APP_BASE_URL}` || "http://localhost:3000",
    credentials: true,
  }),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// API Routes from old REST
// app.use("/api/auth", require("../routes/auth"));
// app.use("/api/private", require("../routes/private"));
// app.use("/api/sticker", require("../routes/sticker"));
// app.use("/api/game", require("../routes/game"));

// --------------------------DEPLOYMENT------------------------------
// app.get("/", (req, res) => {
//   res.send("API is running");
// });
// --------------------------DEPLOYMENT------------------------------

// Error Handler Middleware (Should be at the end of all middlewares)
console.log("pre errorhandler");
app.use(errorHandler);
console.log("post errorhandler");

const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () =>
//   console.log(`Server running on PORT ${PORT}`)
// );
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
