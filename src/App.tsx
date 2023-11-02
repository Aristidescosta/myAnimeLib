import '@fontsource/poppins'
import '@fontsource/open-sans/700.css'

import { ChakraProvider } from '@chakra-ui/react'


/* import MasterMenuRoutes from './app/routes/Routes' */
import { theme } from './shared/chakra-ui-api/theme'
import { AppRoute } from './routes/routes'

function App() {
	return (
		<ChakraProvider theme={theme}>
			<AppRoute />
		</ChakraProvider>
	)
}

export default App
