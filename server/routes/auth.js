const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwtSecret = process.env.JWT_SECRET; // Use JWT secret from environment variables

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Google Login route
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID // Use Google Client ID from environment variables
    });
    const { email_verified, email, name } = ticket.getPayload();

    if (email_verified) {
      let user = await User.findOne({ email });
      if (!user) {
        const password = email + jwtSecret; // Generate a dummy password
        user = new User({ email, name, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      res.status(400).json({ msg: 'Google login failed' });
    }
  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(500).send('Server error');
  }
});

// Google Signup route
router.post('/google-signup', async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID // Use Google Client ID from environment variables
    });
    const { email_verified, email, name } = ticket.getPayload();

    if (email_verified) {
      let user = await User.findOne({ email });
      if (!user) {
        const password = email + jwtSecret; // Generate a dummy password
        user = new User({ email, name, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      } else {
        return res.status(400).json({ msg: 'User already exists' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      res.status(400).json({ msg: 'Google signup failed' });
    }
  } catch (err) {
    console.error('Google signup error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
