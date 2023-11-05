import { useCallback, useRef } from "react";


export const useTheBounce = (delay = 300, notDelayInFirstTime = true) => {
	const isFirstTime = useRef(notDelayInFirstTime);
	const theBouncing = useRef<Timeout>();

	const theBounce = useCallback(
		(func: () => void) => {
			if (isFirstTime.current) {
				isFirstTime.current = false;
				func();
			} else {
				if (theBouncing.current) clearTimeout(theBouncing.current);

				theBouncing.current = setTimeout(() => {
					func();
				}, delay);
			}
		},
		[delay]
	);

	return { theBounce };
};
