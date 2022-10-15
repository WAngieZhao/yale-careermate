import pkg from 'mongoose';

const {Schema, model} = pkg;

export interface IUser {
    userName: string
    year?: string
    reviews: string[]
    auths: string[]
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
    },
    // thumbnail: {
    //     type: String,
    // },
    // reviews: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'review',
    //     },
    // ],
    contact_email: {
        type: String,
        lowercase: true,
        unique: true
    },
    status: {
        type: String,
    },
    company: {
        type: String,
    }
}, {
    // collection: 'users'
});

export const userModel = model('user', userSchema);

// export default userModel;
