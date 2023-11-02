import { useToast, ToastPosition } from '@chakra-ui/react'
enum ToastStatus {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
	LOADING = 'loading',
}

export type toastMessageProps = {
	title: string
	description?: string
	statusToast: ToastStatus
	duration?: number
	isClosable?: boolean
	position?: ToastPosition | undefined
}

export function useToastMessage() {
	const toast = useToast()

	/**
	* @param title: string
	* @param description?: string
	* @param statusToast: ToastStatus
	* @param duration?: number
	* @param isClosable?: boolean
	* @param position?: ToastPosition | undefined
	**/
	function toastMessage(params: toastMessageProps) {
		toast({
			title: params.title,
			description: params.description,
			status: params.statusToast,
			duration: params.duration ?? 3000,
			isClosable: params.isClosable ?? true,
			position: params.position ?? 'bottom',
		})
	}

	return {
		toastMessage,
		ToastStatus,
	}
}
