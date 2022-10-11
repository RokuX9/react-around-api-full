import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Input from "./Input";

function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [formValidation, setFormValidation] = React.useState({
		name: false,
		about: false,
	});
	const setFormState = (name, value) => {
		props.setFormState({ ...props.formState, [name]: value });
	};
	const setValidation = (name, isValid) => {
		setFormValidation({ ...formValidation, [name]: isValid });
	};

	React.useEffect(() => {
		props.setFormState({
			name: currentUser.name,
			about: currentUser.about,
		});
	}, [currentUser, props.isOpen]);

	return (
		<PopupWithForm
			name="dashInfo"
			header="Edit Profile"
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
				placeholder="Name"
				name="name"
				minLength={2}
				maxLength={40}
				value={props.formState.name}
				className="form__input"
				id="dash-name"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
			<Input
				type="text"
				isOpen={props.isOpen}
				placeholder="About"
				name="about"
				minLength={2}
				maxLength={200}
				value={props.formState.about}
				className="form__input"
				id="dash-subtitle"
				setValidation={setValidation}
				setFormState={setFormState}
				required
			/>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
