import React from "react";
import "./styles.css";

type InputProps = {
  label: string;
  fieldId: string;
  type: "text" | "email" | "password";
  value: string;
  required: boolean;
  setValue: (value: string) => void;
};

export function TextInput(props: InputProps) {
  return (
    <div className="inputContainer">
      <label htmlFor={props.fieldId}>{props.label}</label>
      <input
        type={props.type}
        id={props.fieldId}
        value={props.value}
        onChange={(event) => props.setValue(event.target.value)}
        required={props.required}
      />
    </div>
  );
}
