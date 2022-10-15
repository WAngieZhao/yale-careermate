import {IUser} from "../graphql/models/userModel";

declare module 'express-session' {
	interface SessionData {
		user: IUser | null;
	}
}
