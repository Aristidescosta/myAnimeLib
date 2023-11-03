import { createContext } from "react";

interface IRequestContextData{
	dataRequest: string
	setDataRequest: (request: string) => void
	type: string
	setType: (type: string) => void
}

export const RequestContext = createContext({} as IRequestContextData);