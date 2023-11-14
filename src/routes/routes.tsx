import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BaseLayoutHomePage } from "../pages/BaseLayoutHomePage";
import { ROUTE_LOGIN } from "../shared/utils/constants";
import { Auth, Home, Search } from "../pages";


export const AppRoute = () => {
	const router = createBrowserRouter([
		{
			path: "/myAnimeLib",
			element: (
				<BaseLayoutHomePage>
					<Home />
				</BaseLayoutHomePage>
			),
			errorElement: <h1>Página de erro</h1>,
		},
		{
			path: "/search",
			element: (
				<BaseLayoutHomePage>
					<Search />
				</BaseLayoutHomePage>
			),
			errorElement: <h1>Página de erro</h1>,
		},
		{
			path: ROUTE_LOGIN.route,
			element: <Auth />,
		},
	]);

	return <RouterProvider router={router} />;
};
