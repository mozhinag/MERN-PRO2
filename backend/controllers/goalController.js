import expressAsyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";





// @desc    Get goals
// @route   GET /api/goals
// @access  Private

export const getGoals = expressAsyncHandler(async(req,res) =>{
    
    const goals = await Goal.find();
res.status(200).json(goals);
}
)

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal =expressAsyncHandler( async(req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
            // .json({ msg: 'Please provide a text field' });
            throw new Error('Please add a text field')

    }
 
    const goal = await Goal.create({text:req.body.text})
    res.status(201).json(goal);

})


// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private

export const updateGoal = expressAsyncHandler(async (req, res) => {

    
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }   
  );

res.status(200).json(updatedGoal);

});


// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private

 export const deleteGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.deleteOne();  

  res.status(200).json({ id: req.params.id });
});
