import { envs } from "../config/enviroments/enviroments.js";
import { AppError, catchAsync } from "../errors/index.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AuthService } from "./auth.service.js";

const authService = new AuthService()

export const protect = catchAsync(async(req,res,next) => {

  //1. obtener el token
  let token;
  
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')  
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  //2. validad si el token existe
  if(!token){
    return next(
      new AppError('You are not logged in!, Please log in to get access', 401)
    )
  }

  //3. decodificar el token
  const decoded = await promisify(jwt.verify)(
    token,
    envs.SECRET_JWT_SEED,
  )

  //4. buscar el usuario dueño del token, y validar si existe
  const user = await authService.findOneUserById(decoded.id)

  if(!user){
    return next(
      new AppError('The owner of this token is not longer available', 401)
    )
  }
  
  //5. validar si el usuario cambio la contrase recientemente, si es asi enviar un error
 if(user.chagedPasswordAt) {
  const changedTimeStamp = parseInt(
    user.chagedPasswordAt.getTime() / 1000,
    10
  )

  if(decoded.iat < changedTimeStamp){
    return next(
      new AppError('User recently changed password!, please login again.', 401)
    )
  }
 }

 //6. adjuntar el usuario en session, el usuario en session es el usuario dueño del token
 req.sessionUser = user;
 next();

})


export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.sessionUser.role)){
      return next(new AppError('You do not have permission to perform this action', 403))
    }
    next();
  }
}

export const protectAccountOwner = ( req, res, next) => {
  const { user, sessionUser } = req;

  if( user.id !== sessionUser.id ){
    return next(new AppError('You do not own this account', 401))
  }

  next();

}

export const validExistUser = catchAsync(async(req,res,next) => {
  const { id } = req.params;

  const user = await authService.findOneUserById(id)

  if(!user){
    return next(new AppError('User not found', 404))
  }

  req.user = user;
  next()
})