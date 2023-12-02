import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from '../shared/components/Header'

export const BaseLayoutHomePage = (props: PropsWithChildren) => {
	

	return (
		<Box>
			<Header/>
			{ props.children }
		</Box>
	)
}
