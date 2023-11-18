import { httpsCallable, getFunctions } from 'firebase/functions'

/**
 *
 * @param functionName - function name created on firebase function (string)
 */
export function onCreateCallableFunction(functionName: string) {
	return httpsCallable(getFunctions(), functionName)
}
