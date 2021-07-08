export interface SessionStats {
	right: number;
	left: number;
	top: number;
	bottom: number;
	hit: number;
	total: number;
	sessionCount: number;
}

export interface SessionOnServer {
	_id: string;
	right: number;
	left: number;
	top: number;
	bottom: number;
	hit: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface SessionResponse {
	data: SessionOnServer[];
}

export interface AuthResponse {
	accessToken: string;
	authentication: Authentication;
	user: User;
}

export interface Authentication {
	strategy: string;
	accessToken: string;
	payload: Payload;
}

export interface Payload {
	iat: number;
	exp: number;
	aud: string;
	iss: string;
	sub: string;
	jti: string;
}

export interface User {
	_id: string;
	practiceSessions: string[];
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface signupData {
	password: string;
	passwordConfirmation: string;
	username: string;
	email: string;
}

export enum comparisonOperator {
	GT = '>',
	LT = '<',
	EQ = '='
}
