const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
dotenv.config({ path: "./.env" });
const ApolloServer = require("@apollo/server");
const expressMiddleware = require("@apollo/server/express4");
const ApolloServerPluginDrainHttpServer = require("@apollo/server/plugin/drainHttpServer");

const connectDB = require("../config/db");
const mergedTypeDefs = require("../graphql/typeDefs/index");
const mergedResolvers = require("../graphql/resolvers/index");
const errorHandler = require("../middleware/error");

async function initServer() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer.ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer.ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
    ],
  });

  await server.start();

  app.use(express.json());
  connectDB(); // Connect to databse
  app.use(
    "/",
    cors({
      origin: `${process.env.APP_BASE_URL}` || 'http://localhost:3000',
      credentials: true,
    }),
    expressMiddleware.expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // API Routes
  app.use("/api/auth", require("../routes/auth"));
  app.use("/api/private", require("../routes/private"));
  app.use("/api/sticker", require("../routes/sticker"));
  app.use("/api/game", require("../routes/game"));

  // --------------------------DEPLOYMENT------------------------------

  app.get("/", (_req, res) => {
    res.send("API is running");
  });

  // --------------------------DEPLOYMENT------------------------------

  // Error Handler Middleware (Should be at the end of all middlewares)
  app.use(errorHandler);

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
}

initServer();
