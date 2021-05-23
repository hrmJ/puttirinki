export type feathersAuthResponse = {
	accessToken: string;
};

const authenticateByResponse = async (resp: Response): Promise<boolean> => {
	if (!resp.ok) {
		return false;
	}
	const json: feathersAuthResponse = await resp.json();
	localStorage.setItem('accessToken', json.accessToken);
	return true;
};

export const setAuthToken = async (email: string, password: string): Promise<boolean> => {
	try {
		const url = `http://${import.meta.env.VITE_API_URL}/authentication`;
		const resp = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ strategy: 'local', email, password })
		});
		return authenticateByResponse(resp);
	} catch (error) {
		console.log('NETWORK ERROR', error);
	}
	return false;
};

export const hasAuthToken = (): boolean => {
	return !(localStorage.getItem('accessToken') === null);
};
