import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';
import passport from 'passport';

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }

    const safeUserType = userType === 'shelter' ? 'shelter' : 'user';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      userType: safeUserType,
      ...(safeUserType === 'shelter' && {
        companyName: req.body.companyName,
        registrationNumber: req.body.registrationNumber,
        contactPerson: req.body.contactPerson,
        phoneNumber: req.body.phoneNumber
      })
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
        userType: user.userType
      }
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to register user', 400));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid credentials', 400);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError('Invalid credentials', 400);
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    res.json({
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to login', 400));
  }
};

export const logout = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new CustomError('No active session found', 401);
    }

    res.clearCookie("token");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to logout', 400));
  }
};

export const googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'] 
});

export const googleCallback = [
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  async (req, res, next) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id, userType: req.user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      });

      res.redirect(process.env.ROOT_URL);
    } catch (error) {
      next(new CustomError(error.message || 'Failed to authenticate with Google', 400));
    }
  }
];

export const checkSession = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.json({ user });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to check session', 400));
  }
};