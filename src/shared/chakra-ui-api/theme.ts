// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'main.background',
				color: 'main.text'
			},
		},
	},

	fonts: {
		heading: 'open sans',
		body: 'poppins',
	},

	colors: {
		main: {
			principal: '#3ba4b1',
			background: '#101018',
			text: '#F3F3F3',
			sideBar: '#333333'
		}
	},

	radii: {
		none: 0,
		200: '6px',
		full: '9999px',
	},
})
