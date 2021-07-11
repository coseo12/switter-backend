import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'express-async-error';
import tweetRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';
import { csrfCheck } from './middleware/csrf.js';
import rateLimit from './middleware/rate-limiter.js';
import yaml from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import * as OpenAPIValidator from 'express-openapi-validator';
import * as apis from './controller/index.js';
import { authHandler } from './middleware/auth.js';

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
};

const openAPIDocument = yaml.load('./src/api/openapi.yaml');

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));
app.use(rateLimit);

app.use(csrfCheck);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));

app.use('/tweets', tweetRoute);
app.use('/auth', authRoute);

app.use(
  OpenAPIValidator.middleware({
    apiSpec: './src/api/openapi.yaml',
    validateResponses: true,
    operationHandlers: {
      resolver: (_, route, apiDoc) => {
        const pathKey = route.openApiRoute.substring(route.basePath.length);
        const operation = apiDoc.paths[pathKey][route.method.toLowerCase()];
        const methodName = operation.operationId;
        return apis[methodName];
      },
    },
    validateSecurity: {
      handler: {
        jwt_auth: authHandler,
      },
    },
  })
);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(error.status || 500).json({ message: error.message });
});

sequelize
  .sync()
  .then(client => {
    const server = app.listen(config.host.PORT, () => {
      console.log(`Server started... ${new Date()}`);
    });
    initSocket(server);
  })
  .catch(console.error);
