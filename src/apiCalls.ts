export enum requestState {
	IDLE = 'idle',
	STARTED = 'started',
	ERROR = 'error',
	COMPLETE = 'complete'
}

export type handledResponse = {
	state: requestState;
	error: string | null;
};

export const processResponse = (resp: Response | undefined): requestState => {
	if (!resp || !resp.ok) {
		return requestState.ERROR;
	}
	return requestState.COMPLETE;
};

export const handleFetchError = (error: unknown): string => {
	if (error instanceof TypeError) {
		return error.message;
	}
	return 'unkown error when fetching data';
};

export const getResponseError = (resp: Response): null | string => {
	if (resp.ok) {
		return null;
	}
	return resp.statusText;
};

export const handleResponseOrErrorString = (resp: Response | string): handledResponse => {
	if (typeof resp === 'string') {
		return { state: requestState.ERROR, error: resp };
	}
	const ret = { state: processResponse(resp), error: getResponseError(resp) };
	return ret;
};
