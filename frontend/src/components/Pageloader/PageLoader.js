import React from "react";
import "./PageLoader.css";

function PageLoader() {
	return (
		<div
			class="text-center "
			style={{
				marginTop: "50%",
			}}
		>
			<div class="spinner-grow text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}

export default PageLoader;
