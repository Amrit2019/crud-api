const StudentSchema = require("../models/student")

/* HTTP REQUEST GET
@ACCESS PUBLIC
@URL api/students
*/
exports.getAllStudents = async(req,res)=>{
    try{
        let payload = await StudentSchema.find({})
        res.status(200).json({message:"Fetched Data",payload})
    }
    catch (err){
        console.log(err)
        res.status(501).json({ message:"SERVER ERROR"})
    }
}
exports.getStudent = async(req,res)=>{
    try{
        let payload = await StudentSchema.findOne({_id:req.params.id})
        res.status(200).json({message:"Fetched student",payload})
    }
    catch (err){
        console.log(err)
        res.status(501).json({ message:"SERVER ERROR"})
    }
}
// exports.getStudents = (req,res)=>{
//     res.send("postman is working")
// }

exports.Createstudent = async (req,res)=>{
   try{
    let {name,std_id,email,courses} = req.body
    let payload = {
        name,
        std_id,
        email,
        courses
    }
    // Save payload into the database
    let data = await StudentSchema.create(payload)
    res.status(201).json({message:"successfully student created",data})
   } catch(err){
       console.log(err)
       res.status(501).json({ message:"SERVER_ERROR"})
   }
}
exports.UpdateStudent = async (req,res)=>{
    try {
        let {name,std_id,email,courses} = req.body
        let payload = await StudentSchema.findByIdAndUpdate(
            req.params.id,
            {
               name,
               std_id,
               email,
               courses 
            },
            {new: true}
        )
        await payload.save()
        res.status(201).json({message:"Successfully student updated",payload})
        
    } catch (error) {
        res.status(501).json({ message:"SERVER_ERROR"})
    }
}
exports.deleteStudent = async (req,res) =>{
    try {
        await StudentSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Successfully student deleted"})
    } catch (error) {
        res.status(501).json({ message:"SERVER_ERROR"})
    }
}