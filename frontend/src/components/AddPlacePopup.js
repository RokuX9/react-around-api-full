import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup(props) {
	const [formValidation, setFormValidation] = React.useState({
		name: false,
		link: false,
	});
	const setFormState = (name, value) => {
		props.setFormState({ ...props.formState, [name]: value });
	};
	const setValidation = (name, isValid) => {
		setFormValidation({ ...formValidation, [name]: isValid });
	};
	return (
		<PopupWithForm
			name="addLocation"
			header="New Place"
			buttonText="Save"
			isOpen={props.isOpen}
			formState={props.formState}
			initialState={props.initialState}
			setFormState={props.setFormState}
			submit={props.submit}
			closeAllPopups={props.closeAllPopups}
			formValidation={formValidation}
		>
			<Input
				type="text"
				isOpen={props.isOpen}
				placeholder="Location Name"
				name="name"
				minLength={1}
				maxLength={30}
				value={props.formState.name}
				className="form__input"
				id="location-name"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
			<Input
				type="url"
				isOpen={props.isOpen}
				placeholder="Location image URL"
				name="link"
				value={props.formState.url}
				className="form__input"
				id="location-url"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
