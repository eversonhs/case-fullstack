import React, { FormEvent, useState } from "react";
import { TextInput } from "../../components/TextInput";
import "./styles.css";
import Logo from "../../assets/logo.jpg";

export type UserData = {
  user: string;
  password: string;
  passwordConfirmation: string;
};

export type SignUpProps = {
  onSubmit: (
    event: FormEvent,
    formData: UserData
  ) => void;
};

export function SignUp({ onSubmit }: SignUpProps) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div className="signUpContainer">
      <img className="logo" src={Logo} alt="ELOGROUP" />
      <form
        className="signUpForm"
        onSubmit={(event) =>
          onSubmit(event, { user, password, passwordConfirmation })
        }
      >
        <TextInput
          label="Usuário *"
          fieldId="userName"
          type="text"
          required={true}
          value={user}
          setValue={setUser}
        />
        <TextInput
          label="Password *"
          fieldId="userPassword"
          type="password"
          required={true}
          value={password}
          setValue={setPassword}
        />
        <TextInput
          label="Confirmação do Password *"
          fieldId="userPasswordConfirmation"
          type="password"
          required={true}
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
        />

        <button className="registerButton" type="submit">Registrar</button>
      </form>
    </div>
  );
}
