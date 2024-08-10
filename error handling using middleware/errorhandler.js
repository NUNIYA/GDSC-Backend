const express = require('express');
const app = express();


class UnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnavailableError';
    this.statusCode = 503;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 403;
  }
}

// Middleware
const unavailableErrorHandler = (err, req, res, next) => {
  if (err instanceof UnavailableError) {
    console.log('Resource currently unavailable');
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
};

const authorizationErrorHandler = (err, req, res, next) => {
  if (err instanceof AuthorizationError) {
    console.log('Authorization failed');
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
};


app.get('/book-flight', (req, res, next) => {
  const random = Math.random();
  if (random < 0.5) {
    next(new UnavailableError('Flight booking service temporarily unavailable'));
  } else {
    res.json({ message: 'Flight booked successfully' });
  }
});

app.get('/restricted-area', (req, res, next) => {
  const random = Math.random();
  if (random < 0.5) {
    next(new AuthorizationError('Access denied: insufficient clearance'));
  } else {
    res.json({ message: 'Access granted to restricted area' });
  }
});


app.use((err, req, res, next) => {
  console.log('Unhandled error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});