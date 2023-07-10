const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_LINK).then(()=>{
    console.log('Database Connection Success')
}).catch((e)=>{
    console.log('Database Connection Error', e)
})
