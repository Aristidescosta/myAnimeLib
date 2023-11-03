import { AnimeRow, Featured } from "../../shared/components";
import { useState, useEffect } from "react";
import { RequestContext } from "../../shared/contexts/Index";

export const Home: React.FC = () => {
	const [dataRequest, setDataRequest] = useState(
		"https://api.jikan.moe/v4/seasons/now"
	);
	const [type, setType] = useState("anime");
	const [request, setRequest] = useState(null);

	const getTopRatedMovie = async (url: string) => {
		const res = await fetch(url);
		const data = await res.json();
		//Pegando o featured
		const RANDOM_CHOISE = Math.floor(Math.random() * (data.data.length - 1));
		const choice = data.data[RANDOM_CHOISE];
		setRequest(choice);
	};

	useEffect(() => {
		// setRequest("https://api.jikan.moe/v4/seasons/now")
		getTopRatedMovie(dataRequest);
	}, [dataRequest]);
	console.log(request)
	return (
		<RequestContext.Provider
			value={{ dataRequest, setDataRequest, type, setType }}
		>
			{request && (
				<>
					<Featured item={request} type={type}/>
					<AnimeRow />
				</>
			)}
		</RequestContext.Provider>
	);
};
