import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup(props) {
	const [formValidation, setFormValidation] = React.useState({ avatar: false });
	const setFormState = (name, value) => {
		props.setFormState({ ...props.formState, [name]: value });
	};
	const setValidation = (name, isValid) => {
		setFormValidation({ ...formValidation, [name]: isValid });
	};
	return (
		<PopupWithForm
			name="dashImage"
			header="Change profile picture"
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
				type="url"
				isOpen={props.isOpen}
				placeholder="Avatar Image Link"
				name="avatar"
				value={props.formState.url}
				className="form__input"
				id="dash-image"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
