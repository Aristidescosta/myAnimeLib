import { CircularProgress, Text } from "@chakra-ui/react";
import React from "react";
import { APP_VARIANT_COLOR } from "../../shared/utils/constants";
import { useSearchParams } from "react-router-dom";

export const Search: React.FC = () => {
	const [searchParams] = useSearchParams();

	return (
		<>
			<Text m={"8rem 0 4rem 3rem"} as={"h2"}>
				Carrgando resultados para: {searchParams}
			</Text>
			<CircularProgress size={'180px'} isIndeterminate color={APP_VARIANT_COLOR}/>
		</>
	);
};
