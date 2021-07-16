import { useState } from 'react';

function useWidth() {
	if (typeof window === 'undefined') {
		return [0, 0];
	}

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	window.addEventListener('resize', () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	});

	return [width, height];
}

export default useWidth;
