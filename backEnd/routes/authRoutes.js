import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/authMiddleware.js';
import passport from 'passport';

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
      { 
        userId: user._id,
        userType: user.userType 
      },
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
    console.error('Registration error:', error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        userType: user.userType 
      },
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
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.post("/logout", auth, (req, res) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      success: false,
      message: "No active session found",
    });
  }

  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  async (req, res) => {
    if (req.user) {
      req.user.userType = 'user';
      await req.user.save();
    }

    const token = jwt.sign(
      { 
        userId: req.user._id,
        userType: req.user.userType 
      },
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
  }
);

router.get('/session', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Session check error:', error);
    res.status(500).json({ message: 'Error checking session' });
  }
});

export default router;