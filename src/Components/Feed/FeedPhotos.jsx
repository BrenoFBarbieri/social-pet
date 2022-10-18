import React from "react";

import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../utils/api";

import styles from "./FeedPhotos.module.css";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

const FeedPhotos = () => {
	const { data, loading, error, request } = useFetch();

	React.useEffect(() => {
		async function fetchPhotos() {
			const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
			const { response, json } = await request(url, options);
			console.log(json);
		}
		fetchPhotos();
	}, [request]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	return (
		<ul className={`${styles.feed} animeLeft`}>
			{data.map((photo) => (
				<FeedPhotosItem key={photo.id} photo={photo} />
			))}
		</ul>
	);
};

export default FeedPhotos;
