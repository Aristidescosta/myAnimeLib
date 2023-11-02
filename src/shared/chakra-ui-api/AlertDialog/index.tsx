import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
} from '@chakra-ui/react'
import React, { ReactNode, useEffect } from 'react'

interface AlertDialog {
	headerTitle: string
	messageBody: string
	show: boolean
	node?: ReactNode
	onClose: () => void
	onOpen: () => void
}

export default function AlertDialogMessage(props: AlertDialog): JSX.Element {

	const cancelRef = React.useRef<any>()

	const {
		show,
		messageBody,
		headerTitle,
		node,
		onOpen,
		onClose,
	} = props

	useEffect(() => {

		if (show) {
			onOpen()
		}

	}, [show])

	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isOpen={show}
			isCentered
		>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>{headerTitle}</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>{messageBody}</AlertDialogBody>
				<AlertDialogFooter>
					{node}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}