import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(error.message || 'Failed to update user', 400));
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json({ 
      success: true,
      message: 'User deleted successfully',
      deletedUser: { 
        email: user.email, 
        fullName: user.fullName 
      }
    });
  } catch (error) {
    next(new CustomError(error.message || 'Failed to delete user', 400));
  }
};

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