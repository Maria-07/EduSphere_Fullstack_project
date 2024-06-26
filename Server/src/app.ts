import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// app.use(express.static('image'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
// console.log(process.env.DATABASE_URL)

app.use('/api/v1/', routes);

// testing purpose
app.get('/', async (req: Request, res: Response) => {
  res.send('EduSphere Application WOrking SuccessFully');
});

// global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
