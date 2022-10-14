import React from "react";

const types = {
	email: {
		regex:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
		message: "Preencha um email válido",
	},
	password: {
		regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
		message:
			"A senha precisa ter no mínimo 8 caracteres com 1 letra maíusculo, 1 minúscula e 1 dígito.",
	},
};

const useForm = (type) => {
	const [value, setValue] = React.useState("");
	const [error, setError] = React.useState(null);

	function validate(value) {
		if (type === false) return true;
		if (value.length === 0) {
			setError("Preencha um valor.");
			return false;
		} else if (types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		} else {
			setError(null);
			return true;
		}
	}

	function onChange({ target }) {
		error && validate(target.value);
		setValue(target.value);
	}

	return {
		value,
		setValue,
		onChange,
		validate: () => validate(value),
		onBlur: () => validate(value),
		error,
	};
};

export default useForm;
