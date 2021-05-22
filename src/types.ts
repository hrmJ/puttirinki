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
