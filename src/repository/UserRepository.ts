import { AuthenticationType } from "../shared/types/AuthenticationType"
import { signUp } from "../shared/database/UserDAO"

function isValidEmail(email: string): boolean {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailPattern.test(email)
}

export const createAccount = (user: AuthenticationType, confirmPassword: string): Promise<string | boolean> => {
	return new Promise((resolve, reject) => {
		if (user.email.trim() === "") {
			resolve("Digite o seu email de utilizador")
		} else if (!isValidEmail(user.email)) {
			resolve("Digite um email válido")
		} else if (user.password.trim() === "") {
			resolve("Digite a sua senha de utilizador")
		} else if (!/^[^\s]*$/.test(user.password)) {
			resolve('Digite uma palavra-passe válida')
		} else if (user.password.length < 6) {
			resolve('A sua palavra-passe deve ter no mínimo 6 caracteres')
		} else if (confirmPassword !== user.password) {
			resolve('A sua palavra-passe não confere')
		}else{
			const email = user.email
			const password = user.password
			signUp(email, password)
				.then(resolve)
				.catch(reject)
		}
	})
}