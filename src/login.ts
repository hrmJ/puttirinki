import { requestState } from './apiCalls';
import { authStore, setAuthToken, setUser, submitSignUp } from './auth';
import type { signupData } from './types';
import loginForm from './loginFormStore';

export const processlogin = async (tokenOk: boolean): Promise<void> => {
	if (!tokenOk) {
		return null;
	}
	authStore.update(setUser);
};

export const initiateLogin = async (signupData: signupData): Promise<void> => {
	const { username, password } = signupData;
	loginForm.update((val) => ({ ...val, isLoading: true, errorMessage: '' }));
	const tokenOk = await setAuthToken(username, password);
	loginForm.update((val) => ({
		...val,
		isLoading: false,
		errorMessage: tokenOk ? '' : 'Kirjautuminen epäonnistui, yritä uudestaan!'
	}));
	processlogin(tokenOk);
};

export const initiateSignup = async (
	validate: () => boolean,
	signupData: signupData
): Promise<void | null> => {
	loginForm.update((val) => ({ ...val, isLoading: true, errorMessage: '' }));
	const resp = await submitSignUp(validate(), signupData);
	if (resp === requestState.COMPLETE) {
		return await initiateLogin(signupData);
	}
	loginForm.update((val) => ({
		...val,
		isLoading: false,
		errorMessage: 'Käyttäjätunnuksen luominen ei onnistunut. Yritä uudestaan!'
	}));
	return null;
};
