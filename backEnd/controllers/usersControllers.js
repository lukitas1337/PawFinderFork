import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/usersModel.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
    } catch (error) {
        next(new CustomError('Failed to retrieve users', 404));
    }
    };

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(user);
    } catch (error) {
        next(new CustomError(error.message || 'Failed to retrieve user', 404));
    }
    };

// Create new user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, fullName, userType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      userType,
      ...req.body
    });
    
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: { ...user.toObject(), password: undefined }
    });
    } catch (error) {
        next(new CustomError(error.message || 'Failed to create user', 400));
    }
    };

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    Object.assign(user, req.body);
    await user.save();
    
    res.status(200).json({ 
      message: 'User updated successfully', 
      user: { ...user.toObject(), password: undefined } 
    });
    } catch (error) {
        next(new CustomError(error.message || 'Failed to update user', 400));
    }
    };

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete user', 400));
    }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid credentials', 401);
    }
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });
    
    res.status(200).json({ 
      message: 'Login successful', 
      user: { ...user.toObject(), password: undefined } 
    });
  } catch (error) {
      next(new CustomError('Login failed', 500));
    }
};

// Logout user
export const logoutUser = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(new CustomError('Logout failed', 500));
  }
};

// Check session
export const checkSession = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw new CustomError('Session invalid', 401);
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError('Session check failed', 500));
    }
  }
};

// Google authentication handlers
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err) {
      return next(new CustomError('Google authentication failed', 500));
    }
    
    try {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      });
      
      res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
      next(new CustomError('Failed to process Google authentication', 500));
    }
  })(req, res, next);
};