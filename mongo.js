const mongoose = require('mongoose')
const mongoPath = 'MANGOPATH HERE'


module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    return mongoose
}