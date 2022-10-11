import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function DeletePlacePopup(props) {
	const [formValidation, setFormValidation] = React.useState({ id: false });
	const setFormState = (name, value) => {
		props.setFormState({ ...props.formState, [name]: value });
	};
	const setValidation = (name, isValid) => {
		setFormValidation({ ...formValidation, [name]: isValid });
	};

	return (
		<PopupWithForm
			name="deleteLocation"
			header="Are you sure?"
			buttonText="Yes"
			isOpen={props.isOpen}
			formState={props.formState}
			initialState={props.initialState}
			setFormState={props.setFormState}
			submit={props.submit}
			closeAllPopups={props.closeAllPopups}
			formValidation={formValidation}
		>
			<Input
				type="hidden"
				isOpen={props.isOpen}
				name="id"
				className="form__input"
				id="location-id"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
		</PopupWithForm>
	);
}

export default DeletePlacePopup;
