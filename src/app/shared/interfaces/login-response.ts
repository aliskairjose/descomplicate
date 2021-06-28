import { User } from './user';

export interface LoginResponse {
	data: string;
	user: User;
	message: string;
}


