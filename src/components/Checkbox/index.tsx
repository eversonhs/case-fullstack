import React, { CSSProperties } from "react";
import "./styles.css";

type CheckboxProps = {
  label: string;
  name: string;
  id: string;
  value: string;
  checked: true | false
  style: CSSProperties
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export function Checkbox(props: CheckboxProps) {
  return (
    <div className="checkboxContainer" style={props.style}>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label className="checkboxLabel" htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
