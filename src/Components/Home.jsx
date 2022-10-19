import React from "react";
import Head from "./Helper/Head";

import Feed from "./Feed/Feed";

const Home = () => {
	return (
		<section className="container mainContainer">
			<Head
				title="Fotos"
				description="Home do site Social Pet, com o feed de fotos."
			/>
			<Feed />
		</section>
	);
};

export default Home;
