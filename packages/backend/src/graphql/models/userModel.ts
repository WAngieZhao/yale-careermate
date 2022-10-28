import pkg from 'mongoose';

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

export const userModel = model('user', userSchema);

// export default userModel;
