import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constance/paginationC';
import pick from '../../../shared/pick';

// Get Profile Data
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  const result = await UserService.getMyProfile(token as string);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users information retrieved successfully',
    data: result,
  });
});

// get all User [search and filter]
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(paginationOption);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  getMyProfile,
  getAllUser,
};
