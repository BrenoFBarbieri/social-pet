import React from "react";

import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../utils/api";

import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
	const navigate = useNavigate();

	const name = useForm();
	const weight = useForm("number");
	const age = useForm("number");
	const [img, setImg] = React.useState({});

	const { data, error, loading, request } = useFetch();

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("img", img.raw);
		formData.append("nome", name.value);
		formData.append("peso", weight.value);
		formData.append("idade", age.value);

		const token = window.localStorage.getItem("token");
		const { url, options } = PHOTO_POST(formData, token);
		request(url, options);
	}

	function handleImgChange({ target }) {
		setImg({
			preview: URL.createObjectURL(target.files[0]),
			raw: target.files[0],
		});
	}

	React.useEffect(() => {
		if (data) navigate("/conta");
	}, [data, navigate]);

	return (
		<section className={`${styles.photoPost} animeLeft`}>
			<Head title="Poste sua foto" />
			<form onSubmit={handleSubmit}>
				<Input label="Nome" type="text" name="name" {...name} />
				<Input label="Peso" type="number" name="weight" {...weight} />
				<Input label="Idade" type="number" name="age" {...age} />
				<input
					className={styles.file}
					id="img"
					type="file"
					name="img"
					onChange={handleImgChange}
				/>
				<Error error={error} />
				{loading ? (
					<Button disabled>Enviado...</Button>
				) : (
					<Button>Enviar</Button>
				)}
			</form>
			{img.preview && (
				<div>
					<div
						className={styles.preview}
						style={{ backgroundImage: `url(${img.preview})` }}
					></div>
				</div>
			)}
		</section>
	);
};

export default UserPhotoPost;
