import { createRoot } from '@wordpress/element';
import App from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("helpgent-root");
	if ( ! container ) {
		return;
	}

	if(createRoot){
		const root = createRoot(container);

		root.render(<App />);
	}else{
		render(<App />, container);
	}
	
});