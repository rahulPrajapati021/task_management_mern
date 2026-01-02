// generate token function
// authenticate the valid token
import jwt, { decode } from 'jsonwebtoken'

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY});
}

// authenticate middleware 
export function authenticateUser(req, res, next) {
    // token in headers 
    const authorization = req.headers.authorization;
    try {
        if(!authorization) {
            throw new Error("auth token not found");
        }
        const token = authorization.substring(7);

        if(jwt.verify(token, process.env.JWT_SECRET)) {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).json({msg: "invalid token"});
        }
    } catch (error) {
        res.status(401).json({msg: error.message});
    }
}