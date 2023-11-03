/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AnimeData {
	aired: {
		from: string;
		to: string | null;
		prop: any; // Você pode definir um tipo apropriado para 'prop'
		string: string;
	};
	airing: boolean;
	approved: boolean;
	background: any; // Você pode definir um tipo apropriado para 'background'
	broadcast: {
		day: string;
		time: string;
		timezone: string;
		string: string;
	};
	demographics: any[]; // Você pode definir um tipo apropriado para 'demographics'
	duration: string;
	episodes: number;
	explicit_genres: any[]; // Você pode definir um tipo apropriado para 'explicit_genres'
	favorites: number;
	genres: {
		mal_id: number;
		name: string;
		type: string;
		url: string;
	}[];
	images: {
		jpg: any; // Você pode definir um tipo apropriado para 'jpg'
		webp: any; // Você pode definir um tipo apropriado para 'webp'
	};
	licensors: any[]; // Você pode definir um tipo apropriado para 'licensors'
	mal_id: number;
	members: number;
	popularity: number;
	producers: {
		// Você pode definir a estrutura apropriada para os produtores
	}[];
	rank: number;
	rating: string;
	score: number;
	scored_by: number;
	season: string;
	source: string;
	status: string;
	studios: any[]; // Você pode definir um tipo apropriado para 'studios'
	synopsis: string;
	themes: {
		// Você pode definir a estrutura apropriada para 'themes'
	}[];
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	titles: {
		// Você pode definir a estrutura apropriada para 'titles'
	}[];
	trailer: {
		embed_url: string;
		images: {
			image_url: string;
			large_image_url: string;
			maximum_image_url: string;
			medium_image_url: string;
			small_image_url: string;
		};
		url: string;
		youtube_id: string;
	};
	type: string;
	url: string;
	year: number;
}
