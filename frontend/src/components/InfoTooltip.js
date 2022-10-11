import React from "react";
import "../blocks/Overlay.css";
import "../blocks/InfoToolTip.css";
import Button from "./Button";

export default function InfoToolTip(props) {
  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      onClick={props.onClick}
    >
      <div
        className={
          props.isOpen
            ? "tool-tip overlay__element overlay__element_opened"
            : "tool-tip overlay__element"
        }
      >
        <div
          className={
            props.success
              ? "tool-tip__icon tool-tip__icon_type_success"
              : "tool-tip__icon tool-tip__icon_type_fail"
          }
        ></div>
        <p className="tool-tip__message">{props.message}</p>
        <Button
          type="button"
          className="overlay__button overlay__button_type_close tool-tip__close-button"
          onClick={props.closeAllPopups}
        />
      </div>
    </div>
  );
}
