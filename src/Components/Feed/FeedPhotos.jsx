import React from "react";

import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../utils/api";

import styles from "./FeedPhotos.module.css";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
	const { data, loading, error, request } = useFetch();

	React.useEffect(() => {
		async function fetchPhotos() {
			const total = 6;
			const { url, options } = PHOTOS_GET({ page, total, user });
			const { response, json } = await request(url, options);
			if (response && response.ok && json.length < total) setInfinite(false);
		}
		fetchPhotos();
	}, [request, page, user, setInfinite]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	if (data)
		return (
			<ul className={`${styles.feed} animeLeft`}>
				{data.map((photo) => (
					<FeedPhotosItem
						key={photo.id}
						photo={photo}
						setModalPhoto={setModalPhoto}
					/>
				))}
			</ul>
		);
	else return null;
};

export default FeedPhotos;
