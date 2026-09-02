require('dotenv').config()
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
 

exports.register = async (req,res)=>{
    try{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'});
    }
const existingUser = await prisma.user.findUnique({ where: { email: email } })
    if(existingUser){
        return res.status(409).json({message: 'User already exists'});
    }
const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
  data: {
    email: email,
    passwordHash: hashedPassword
  }
})

res.status(201).json({ message: 'User created successfully', id: newUser.id, email:newUser.email });

} catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
}

exports.login = async (req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'});
    }
    const existingUser = await prisma.user.findUnique({ where: { email: email } })
    if(!existingUser){
        return res.status(404).json({message: 'invalid credentials'});
    }
     const isMatch = await bcrypt.compare(password, existingUser.passwordHash)
     if (!isMatch){
        return res.status(401).json({message: 'invalid credentials'});
     }
     const secret = process.env.JWT_SECRET;
     if (!secret) {
       console.error('Error during login: JWT_SECRET is missing in environment variables (.env)');
       return res.status(500).json({ message: 'Internal server error: JWT secret not configured' });
     }
     const token = jwt.sign(
       { userId: existingUser.id },
       secret,
       { expiresIn: '15m' }
     )

     res.status(200).json({ message: 'Login successful', token: token });

}catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });}
}