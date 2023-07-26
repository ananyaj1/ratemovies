import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader.substring(7); // remove Bearer
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY_AUTH); // Replace 'your-secret-key' with your actual JWT secret key
      req.userId = decoded.userId;
      req.username = decoded.username;
      req.user_pic = decoded.userPic;
      next();
    } catch (error) {
        //console.log('i must be here');
      res.status(401).json({ message: 'Invalid token' });
    }
};
  
export default authMiddleware;