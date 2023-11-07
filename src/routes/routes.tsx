import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BaseLayoutHomePage } from "../pages/BaseLayoutHomePage";
import { ROUTE_LOGIN } from "../shared/utils/constants";
import { Search } from "../pages/Search";
import { Auth } from "../pages/Auth";
import Home from "../pages/Home";

export const AppRoute = () => {
	const router = createBrowserRouter([
		{
			path: "/",
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
