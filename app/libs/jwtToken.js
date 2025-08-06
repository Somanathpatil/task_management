import jwt from "jsonwebtoken";

const secratKey = process.env.JWT_KEY;

if(!secratKey){
    throw new Error("JWT Secrat key is not found");
}

export const genrateToken = (payload) => {
    return jwt.sign(payload, secratKey, {expiresIn: '1h'});
}

export const verifyToken = (token) =>{
    try{
        return jwt.verify(token, secratKey);
    }catch(err){
        return null;
    }
}