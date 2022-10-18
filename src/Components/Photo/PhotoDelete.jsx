import React from "react";

import useFetch from "../../Hooks/useFetch";
import { PHOTO_DELETE } from "../../utils/api";

import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
	const { loading, request } = useFetch();

	async function handleClick(event) {
		const confirm = window.confirm("Tem certeza que deseja deletar?");
		if (confirm) {
			const { url, options } = PHOTO_DELETE();
			const { response } = await request(url, options);
			if (response.ok) window.location.reload();
		}
	}

	return (
		<>
			{loading ? (
				<button className={styles.delete} disabled>
					Deletar
				</button>
			) : (
				<button onClick={handleClick} className={styles.delete}>
					Deletar
				</button>
			)}
		</>
	);
};

export default PhotoDelete;
