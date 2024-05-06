const mongoose = require('mongoose')
import mongoosePaginate from 'mongoose-paginate-v2';

const adminSchema =mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
        // select: false
    },
    phone: {
        type: Number,
    },
    image: {
        type: String,
        default: ""
    },
    accessToken: {
        type: String
    },
    isDeleted:{
        type: Boolean,
        default: 0
    },
    status :{
        type: Number,
        // 0 inactive 1 active
        enum : [0,1],
        default: 1
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
    },
}, {timestamps:true} );

adminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Admin',adminSchema)