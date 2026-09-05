const prisma = require('../lib/prisma');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = await prisma.task.create({
            data: {
                title: title,
                description: description,
                userId: req.user.userId
            }
        });

        return res.status(201).json({ message: 'Task created successfully', task: newTask });

    } catch (error) {
        console.error('Error during task creation:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.getalltasks = async (req, res) => {

    try{

const tasks = await prisma.task.findMany({
  where: { userId: req.user.userId }
})

return res.status(200).json({message: 'Tasks retrieved successfully', tasks: tasks});

    }catch(error){
           console.error('Error during task listing:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}


exports.getTaskbyId = async( req,res) =>{
try{
  const taskId = Number(req.params.id)

  const task = await prisma.task.findUnique({ where: { id: taskId } })
    if(!task){
        return res.status(404).json({ message: 'this task do not exist' });
    }
    if(task.userId !== req.user.userId){
        return res.status(404).json({ message:"this task do not belong to this user"})
    }
  return res.status(200).json({message: 'Task retrieved successfully', task: task});

}catch(error){
   console.error('error during getting this task :', error);
        return res.status(500).json({ message: 'Server error' });

}
}