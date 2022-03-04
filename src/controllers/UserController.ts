import ApiError from "../error/ApiError";
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')
import User = require('../models/models')

const generateJwt = (id: string, email: string) => {
  return jwt.sign(
    {id, email}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

export default class UserController {

  async registration(req: Request, res: Response, next: NextFunction){
    const {email, password, first_name, last_name} = req.body
    if(!email || !password){
      return next(ApiError.badRequest('Incorrect email or password'))
    }
    const candidate = await User.findOne({where: {email}})
    if(candidate){
      return next(ApiError.badRequest('User with entered email already exists'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashPassword, first_name, last_name})
    const token = generateJwt(user.id, user.email)
    return res.json({token})
  }

  async login(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user){
      return next(ApiError.badRequest('Incorrect email'))
    }
    const comparePassword = bcrypt.compareSync(
      password,
      user.password
    )
    if(!comparePassword){
      return next(ApiError.badRequest('Incorrect password'))
    }
    const token = generateJwt(user.id, user.email)
    return res.json({token})
  }

  async isAuth(req: Request, res: Response) {
    const token = generateJwt(req.user.id, req.user.email)
    return res.json({token})
  }

  async getUserData(req: Request, res: Response){
    const {id} = req.params
    const data = await User.findOne(
      {
        where: {id},
      }
    )
    return res.json(data)
  }
 
}

module.exports = new UserController()