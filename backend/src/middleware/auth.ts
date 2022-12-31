import jwt from 'jsonwebtoken';

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  // @ts-expect-error
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendSatus(403);
    req.user = user;
    next();
  });
};

export { authenticateToken };
