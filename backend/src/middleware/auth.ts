import jwt from 'jsonwebtoken';

const authorize = async (req: any, res: any, next: any) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access token is missing.' });
      }

      // Verify the access token and extract the payload
      // @ts-expect-error
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (user.type !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden.' });
      }

      // Move to the next middleware or route handler as no errors have occured at this point
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }
};

export { authorize };
