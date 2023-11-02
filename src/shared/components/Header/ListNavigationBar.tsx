import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { TNavbarItem } from "../../types/NavbarItem";
import { APP_VARIANT_COLOR } from "../../utils/constants";

interface IListNavigationbarProps {
	items: TNavbarItem[];
}

export const ListNavigationbar: React.FC<IListNavigationbarProps> = ({
	items,
}) => {
	return (
		<>
			{items.map((item) => (
				<Link key={item.menu} to={item.link}>
					<Text
						fontSize={["2px, 8px, 19px"]}
						_hover={{
							color: APP_VARIANT_COLOR,
							borderBottom: `2px solid ${APP_VARIANT_COLOR}`,
						}}
					>
						{item.menu}
					</Text>
				</Link>
			))}
		</>
	);
};
