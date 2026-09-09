const prisma = require('../lib/prisma')
// POST /category — create a category (name required, color optional)
// GET /category — list all of my categories
// PATCH /category/:id — update one (only if mine)
// DELETE /category/:id — delete one (only if mine)

exports.createCategory = async(req, res)=>{
    try{
const {name,color}=req.body
        if(!name){
            return res.status(400).json({message: 'name is required'})
        }
        const category = await prisma.category.create({
            data: {
                name,
                color,
                        userId: req.user.userId

            }
        })
        res.status(201).json(category)
    }catch(error){
console.error('Error during category creation:', error);
        return res.status(500).json({ message: 'Server error' });    }
}


exports.getCategory = async (req,res)=>{
try{
    
const category = await prisma.category.findMany({
  where: { userId: req.user.userId }
})

return res.status(200).json({message: 'Categories retrieved successfully', categories: category});


}catch(error){
    console.error('Error during category retrieval:', error);
        return res.status(500).json({ message: 'Server error' });
}

}


exports.editcategory = async (req, res) => {
    try{ 
         const categoryId = Number(req.params.id)
        const { name, color } = req.body;
  const category = await prisma.category.findUnique({ where: { id: categoryId } })
    if(!category){
        return res.status(404).json({ message: 'this category do not exist' });
    }
    if(category.userId !== req.user.userId){
        return res.status(404).json({ message:"this category do not belong to this user"})
    }
    const dataToUpdate = {}

if (name!== undefined) dataToUpdate.name = name
if (color!== undefined) dataToUpdate.color = color

 const updatedCategory = await prisma.category.update({
  where: { id: categoryId },
  data: dataToUpdate
})

  return res.status(200).json({message: 'Category edited successfully', category: updatedCategory});


    }catch(error){
        console.error('Error during category editing:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.deletecategory = async (req,res) =>{
    try{
        const categoryId = Number(req.params.id)
        const category =await prisma.category.findUnique({ where: { id: categoryId } })
        if(!category){
            return res.status(404).json({ message: 'this category do not exist' })}
        if(category.userId !== req.user.userId){
            return res.status(404).json({ message: 'this category do not belong to this user' })}
         
             await prisma.category.delete({ where: { id: categoryId } })

            return res.status(200).json({ message: 'Category deleted successfully' });
    }catch(error){
        console.error('Error during category deletion:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}