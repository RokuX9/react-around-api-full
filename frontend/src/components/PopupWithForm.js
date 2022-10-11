import React from "react";
import Button from "./Button";
import "../blocks/Form.css";

function PopupWithForm({ children, ...props }) {
	const [disableButton, setDisableButton] = React.useState(true);

	const formRef = React.useRef(null);
	const setButtonDisabled = React.useCallback(() => {
		Object.values(props.formValidation).every((element) => element === true)
			? setDisableButton(false)
			: setDisableButton(true);
	}, [props.isOpen, props.formValidation]);

	React.useEffect(() => {
		if (props.isOpen) {
			setButtonDisabled();
			return;
		}
		props.setFormState(props.initialState);
		formRef.current.reset();
	}, [props.isOpen]);

	React.useEffect(() => {
		setButtonDisabled();
	}, [props.formValidation]);

	const submit = (e) => {
		disableButton ? e.preventDefualt() : props.submit(e);
	};

	return (
		<div
			className={props.isOpen ? "overlay overlay_opened" : "overlay"}
			onClick={props.onClick}
		>
			<div
				className={
					props.isOpen
						? "overlay__form overlay__element overlay__element_opened"
						: "overlay__form overlay__element"
				}
			>
				<form
					name={props.name}
					ref={formRef}
					className="form"
					onSubmit={submit}
				>
					<h2 className="form__title">{props.header}</h2>
					<fieldset className="form__inputs">
						{React.Children.map(children, (child, i) => {
							return (
								<div
									className="form__row"
									key={i}
								>
									{child}
								</div>
							);
						})}
					</fieldset>
					<Button
						type="submit"
						disabled={disableButton}
						className="form__button form__button_type_save button"
					>
						{props.buttonText}
					</Button>
				</form>
				<Button
					type="button"
					className="overlay__button overlay__button_type_close button"
					onClick={props.closeAllPopups}
				></Button>
			</div>
		</div>
	);
}

export default PopupWithForm;
