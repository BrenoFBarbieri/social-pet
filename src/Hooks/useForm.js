import React from "react";

const types = {
	email: {
		regex:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
		message: "Preencha um email válido",
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
