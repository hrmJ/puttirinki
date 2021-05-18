export enum requestState {
	IDLE = 'idle',
	STARTED = 'started',
	ERROR = 'error',
	COMPLETE = 'complete'
}

export const processResponse = (resp: Response): requestState => {
	if (!resp.ok) {
		return requestState.ERROR;
	}
	return requestState.COMPLETE;
};
