const express = require('express');
const app = express();

// --- Custom Error Classes ---

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

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

// --- Body Parsing Middleware ---

app.use(express.json());

// --- Routes ---

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

app.get('/profile', (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next(new AuthenticationError('Authentication required'));
  }
  res.json({ message: 'Profile data retrieved' });
});

app.post('/submit', (req, res, next) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return next(new ValidationError('Both "name" and "email" fields are required'));
  }
  res.json({ message: 'Submission received', data: { name, email } });
});

app.get('/flight/:id', (req, res, next) => {
  const validIds = ['1', '2', '3'];
  if (!validIds.includes(req.params.id)) {
    return next(new NotFoundError(`Flight with id ${req.params.id} not found`));
  }
  res.json({ message: `Details for flight ${req.params.id}` });
});

// 404 handler for undefined routes (before error handlers so it flows through the pipeline)
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});

// --- Error Handling Middleware ---

const syntaxErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON in request body' });
  }
  next(err);
};

const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  next(err);
};

const authenticationErrorHandler = (err, req, res, next) => {
  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  next(err);
};

const authorizationErrorHandler = (err, req, res, next) => {
  if (err instanceof AuthorizationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  next(err);
};

const unavailableErrorHandler = (err, req, res, next) => {
  if (err instanceof UnavailableError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  next(err);
};

const genericErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'An unexpected error occurred'
    : err.message;

  console.error(`[${err.name || 'Error'}] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

// Register error handlers (order matters — specific first, generic last)
app.use(syntaxErrorHandler);
app.use(validationErrorHandler);
app.use(authenticationErrorHandler);
app.use(authorizationErrorHandler);
app.use(notFoundErrorHandler);
app.use(unavailableErrorHandler);
app.use(genericErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});