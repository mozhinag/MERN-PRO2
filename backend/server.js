import express from 'express'
import goalRoutes from './routes/goalRoutes.js';
import  { errorHandler }  from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:false }))


app.use('/api/goals',goalRoutes)

app.use(errorHandler)

app.listen(port,() =>{
    console.log(`server is running on ${port}`)
})

