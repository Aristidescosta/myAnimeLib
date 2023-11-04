import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home, Search } from '../pages'
import { BaseLayoutHomePage } from '../pages/BaseLayoutHomePage'
import { Auth } from '../pages/Auth'
import { ROUTE_LOGIN } from '../shared/utils/constants'

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
		{
			path: '/search',
			element: (
				<BaseLayoutHomePage>
					<Search />
				</BaseLayoutHomePage>
			),
			errorElement: (
				<h1>Página de erro</h1>
			),
		},
		{
			path: ROUTE_LOGIN.route,
			element: <Auth />,
		},
	])

	return <RouterProvider router={router} />
}
