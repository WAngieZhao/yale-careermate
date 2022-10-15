import pkg from 'mongoose';
const { Schema, model } = pkg;

export interface IAuthSchema {
    user: string,
    email: string
}

const authSchema = new Schema<IAuthSchema>({
// @ts-ignore
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // email: {
    //     type: String,
    //     required: true,
    //     lowercase: true
    // },
    // picture: {
    //     type: String,
    //     // required: true,
    // },
}, {
    collection: 'authenticators',
    discriminatorKey: 'authType'
});

export const authModel = model('auth', authSchema);

export interface IPasswordAuthModel extends IAuthSchema {
    hash: string
    salt: string
}

export const passwordAuthModel = authModel.discriminator<IPasswordAuthModel>('passwordAuth', new Schema({
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}));

export interface IGoogleAuthModel extends IAuthSchema {
    googleId: string
    email: string
    picture: string
    name: string
}

export const googleAuthModel = authModel.discriminator<IGoogleAuthModel>('googleAuth', new Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    name: {
        type: String
    }
}));

// export default userModel;
