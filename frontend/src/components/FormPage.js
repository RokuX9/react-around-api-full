import React from "react";
import Input from "./Input";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import "../blocks/Form.css";

function Form(props) {
	const [formValidation, setFormValidation] = React.useState(
		props.inputs.reduce((prev, curr) => {
			return { ...prev, [curr.name]: true };
		}, {})
	);
	const [disableButton, setDisableButton] = React.useState(true);
	const renderInput = (input) => {
		const setFormState = (name, value) => {
			props.setFormState({ ...props.formState, [name]: value });
		};
		const setValidation = (name, isValid) => {
			setFormValidation({ ...formValidation, [name]: isValid });
		};
		switch (input.type) {
			case "text":
				return (
					<Input
						type="text"
						isOpen={null}
						placeholder={input.placeHolder}
						name={input.name}
						minLength={input.minLength}
						maxLength={input.maxLength}
						onChange={setFormState}
						value={input.value}
						className="form__input form__input_type_page"
						id={input.id}
						setValidation={setValidation}
						setFormState={setFormState}
						required
					/>
				);
			case "url":
				return (
					<Input
						type="url"
						isOpen={null}
						placeholder={input.placeHolder}
						name={input.name}
						onChange={setFormState}
						value={input.value}
						className="form__input form__input_type_page"
						id={input.id}
						setValidation={setValidation}
						setFormState={setFormState}
						required
					/>
				);
			case "hidden":
				return (
					<Input
						type="hidden"
						isOpen={null}
						name={input.name}
						className="form__input form__input_type_page"
						id={input.id}
						setValidation={setValidation}
						setFormState={setFormState}
						required
					/>
				);
			case "password":
				return (
					<Input
						type="password"
						isOpen={null}
						name={input.name}
						placeholder={input.placeHolder}
						className="form__input form__input_type_page"
						id={input.id}
						setValidation={setValidation}
						setFormState={setFormState}
						required
					/>
				);
			case "email":
				return (
					<Input
						type="email"
						isOpen={null}
						name={input.name}
						placeholder={input.placeHolder}
						className="form__input form__input_type_page"
						id={input.id}
						setValidation={setValidation}
						setFormState={setFormState}
					/>
				);
		}
	};

	const formRef = React.useRef(null);
	const setButtonDisabled = React.useCallback(() => {
		Object.values(formValidation).every((element) => element === true)
			? setDisableButton(false)
			: setDisableButton(true);
	}, [formValidation]);

	React.useEffect(() => {
		setButtonDisabled();
	}, [formValidation]);

	const submit = (e) => {
		disableButton ? e.preventDefualt() : props.submit(e);
	};

	return (
		<form
			name={props.name}
			ref={formRef}
			className="form form_type_page"
			onSubmit={submit}
		>
			<h2 className="form__title form__title_type_page">{props.header}</h2>
			<fieldset className="form__inputs form__inputs_type_page">
				{props.inputs.map((input, i) => {
					return (
						<div
							className="form__row"
							key={input.name + "-" + i}
						>
							{renderInput(input)}
						</div>
					);
				})}
			</fieldset>
			<Button
				type="submit"
				disabled={disableButton}
				overide={true}
				className="form__button form__button_type_save button form__button_type_page"
			>
				{props.buttonText}
			</Button>
			{props.linkText && (
				<NavLink
					className="form__link"
					to={props.linkPath}
				>
					{props.linkText}
				</NavLink>
			)}
		</form>
	);
}

export default Form;
