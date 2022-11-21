import pkg from 'mongoose';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching'

const {Schema, model} = pkg;

export interface IUser {
    id: string
    name: string
    email: string
    picture: string
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        default: '',
    },
    contact_email: {
        type: String,
        lowercase: true,
        default: '',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    company: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: ""
    }
}, {
    // collection: 'users'
});


// userSchema.plugin(mongoose_fuzzy_searching, {
//     fields: [{
//         name: 'name',
//         minSize: 2,
//         prefixOnly: false
//     },
//         // {
//         //     name: 'company',
//         //     minSize: 2,
//         //     prefixOnly: false
//         // }
//     ]
// })
// ;

userSchema.plugin(mongoose_fuzzy_searching, {
    fields: ['name','company']
})
;
export const userModel = model('user', userSchema);

// export default userModel;
