import jwt = require('jsonwebtoken')
export default function isAuth (req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    )
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" })
  }
}




