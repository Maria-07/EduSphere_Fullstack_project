import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from './user.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from './user.model';
import {
  IGenericResponse,
  IPaginationOption,
} from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

// Get Profile Data
const getMyProfile = async (token: string): Promise<IUser | null> => {
  console.log('Token => 🔖🔖', token);

  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  console.log('verifiedToken =======', verifiedToken);

  const { userEmail } = verifiedToken;

  const result = await User.findOne({ email: userEmail });

  return result;
};

// get all Users
const getAllUser = async (
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IUser[]>> => {
  const andCondition: string | any[] = [];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculationPagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
  getMyProfile,
  getAllUser,
};
