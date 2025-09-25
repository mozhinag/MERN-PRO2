import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    { name :
       {
        type: String,
        required:[true,"please add a name"]
       },
     email :
       {
        type: String,
        required:[true,"please add an email"]
       },
     password :
       {
        type: String,
        required:[true,"please add a password"]
       }
    
    },
    {
timestamps:true
    }
)

// export default mongoose.model('User', userSchema);

const User  = mongoose.model('User',userSchema)

export default User;