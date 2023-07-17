const { StatusCodes } = require('http-status-codes');
const { UserRepository,RoleRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {  Enums } = require('../utils/common');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const {ServerConfig}=require('../config')

const userRepo = new UserRepository();
const roleRepo = new RoleRepository();

async function create(data) {
    try {
        const user = await userRepo.create(data);
        
        const res=await roleRepo.getRoleByName(Enums.USER_ROLE_ENUMS.CUSTOMER)
    
        user.addRole(res);
        return user;
         
  
     
    } catch(error) {
        console.log(error.name);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function signIn(data){
    try{
  const user= await userRepo.getUserByEmail(data.email);
  if(!user){
     throw new AppError('cannot find user with same email', StatusCodes.NOT_FOUND);
  }

const matchedPassword= checkPassword(data.password,user.password);
if(!matchedPassword){
    throw new AppError('password not validated', StatusCodes.BAD_REQUEST);
}
return createToken({id:user.id, email:user.email});

} 
catch(error){
console.log(error);
throw error;
    }
}

    function checkPassword(plainPassword,encryptedPassword){
    const res=  bcrypt.compareSync(plainPassword,encryptedPassword)
    return res;
}

 function createToken(input){
 const res= jwt.sign(input,ServerConfig.JWT_SECRET_KEY,{expiresIn:ServerConfig.EXPIRES_IN})
 return res;
}

 
function isAuthentication(token){
    try{
        if (!token){
            throw new AppError('missing JWT token', StatusCodes.BAD_REQUEST);}
      const user= verifyToken(token)
     
return user.id;
}
    catch(error){
        if (error instanceof AppError) throw error;
        if(error.name=='JsonWebTokenError'){
            throw new AppError('invalid jwt token', StatusCodes.BAD_REQUEST);
        }
        console.log(error);

    throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }


}


function verifyToken(token){
    const res= jwt.verify(token,ServerConfig.JWT_SECRET_KEY);
    return res;
}

module.exports = {
    create,signIn,isAuthentication
   
}