import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// my profile get
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  UserController.getMyProfile
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

export const UserRoutes = router;
