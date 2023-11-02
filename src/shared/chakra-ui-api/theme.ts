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
			principal: '#F29325',
			background: '#F3F3F3',
			text: '#222222',
			sideBar: '#333333'
		}
	},

	radii: {
		none: 0,
		200: '6px',
		full: '9999px',
	},
})
