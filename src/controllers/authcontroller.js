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