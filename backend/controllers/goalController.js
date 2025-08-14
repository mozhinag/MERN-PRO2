import expressAsyncHandler from "express-async-handler";
// @desc    Get goals
// @route   GET /api/goals
// @access  Private

export const getGoals = expressAsyncHandler(async(req,res) =>{
    
res.status(200).json({msg:' Get Goals'})
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

    res.status(200).json({ msg: 'Set Goal', text: req.body.text });
})


// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private

 export const updateGoal = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({msg:`Update Goals${req.params.id}`})
}

)
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private

 export const deleteGoal = expressAsyncHandler(async(req, res) =>{
    res.status(200).json({msg:`Delete Goals ${req.params.id}`})
})
