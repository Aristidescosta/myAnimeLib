import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from '../pages'
import { BaseLayoutHomePage } from '../pages/BaseLayoutHomePage'

export const AppRoute = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<BaseLayoutHomePage>
					<Home />
				</BaseLayoutHomePage>
			),
			errorElement: (
				<h1>Página de erro</h1>
			),
		},
	])

	return <RouterProvider router={router} />
}
