const jwt = require('jsonwebtoken')
exports.authmiddleware = (req, res, next) => {
    const authHeader =req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({message: 'Authorization header missing'})
    }
const token = authHeader.split(' ')[1]
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // we can access the userId in the decoded token in the next middleware or route handler
   next()
}catch(err){
    return res.status(401).json({message: 'Invalid or expired token'})
}}