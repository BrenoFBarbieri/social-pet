import React from "react";

import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../utils/api";

import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import Error from "../Helper/Error";

const PhotoCommentsForm = ({ id, setComments }) => {
	const [comment, setComment] = React.useState("");

	const { request, error } = useFetch();

	async function handleSubmit(event) {
		event.preventDefault();
		const { url, options } = COMMENT_POST(id, { comment });
		const { response, json } = await request(url, options);
		if (response.ok) {
			setComment("");
			setComments((comments) => [...comments, json]);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				id="comment"
				name="comment"
				placeholder="Escreva..."
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			></textarea>
			<button>
				<Enviar />
			</button>
			<Error error={error} />
		</form>
	);
};

export default PhotoCommentsForm;