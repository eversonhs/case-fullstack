import React, { FormEvent } from "react";
import { useHistory } from "react-router";
import { userApi, UserCredential } from "../api/userApi";
import { SignUp, UserData } from "../views/SignUp";

type PasswordIssues = {
  tooShort: boolean;
  withoutNumberChar: boolean;
  withoutSpecialChar: boolean;
  withoutAlphaChar: boolean;
  confirmationDontMatch: boolean;
};

export function SignUpController() {
  const history = useHistory();

  function handleSubmit(event: FormEvent, { user, password, passwordConfirmation }: UserData
  ) {
    event.preventDefault();

    const userTrimmed = user.trim();
    const passwordTrimmed = password.trim();
    const confirmationPasswordTrimmed = passwordConfirmation.trim();
    const allFieldsIsFilled =
      userTrimmed.length > 0 &&
      passwordTrimmed.length > 0 &&
      confirmationPasswordTrimmed.length > 0;

    if (allFieldsIsFilled) {
      const [passwordIsValid, passwordIssues] = validatePassword(
        passwordTrimmed,
        confirmationPasswordTrimmed
      );

      if (passwordIsValid as boolean) {
        try {
          userApi.saveUser({
            user: userTrimmed,
            password: passwordTrimmed,
          } as UserCredential);
          history.push("/leads");
        } catch (error) {
          alert(error);
        }
      } else {
        let errorMessage = "";
        errorMessage += (passwordIssues as PasswordIssues).tooShort
          ? "Password deve conter no mínimo 8 caracteres.\n"
          : "";
        errorMessage += (passwordIssues as PasswordIssues).withoutAlphaChar
          ? "Password deve conter no mínimo um carácter alfanumérico.\n"
          : "";
        errorMessage += (passwordIssues as PasswordIssues).withoutNumberChar
          ? "Password deve conter no mínimo um carácter numérico.\n"
          : "";
        errorMessage += (passwordIssues as PasswordIssues).withoutSpecialChar
          ? "Password deve conter no mínimo um carácter especial.\n"
          : "";
        errorMessage += (passwordIssues as PasswordIssues).confirmationDontMatch
          ? "Password e confirmação de Password devem ser iguais.\n"
          : "";
        alert(errorMessage);
      }
    } else {
      let errorMessage = "";
      errorMessage += userTrimmed === "" ? "Campo Usuário vazio\n" : "";
      errorMessage += passwordTrimmed === "" ? "Campo Password vazio\n" : "";
      errorMessage +=
        confirmationPasswordTrimmed === ""
          ? "Campo Confirmação do Password vazio\n"
          : "";
      alert(errorMessage);
    }
  }

  function validatePassword(password: string, passwordConfirmation: string) {
    const numberPattern = /\d+/g;
    const alphaPattern = /[A-Z]+/gi;
    const specialPattern =
      /(!|"|#|\$|%|&|'|\*|\+|,|\.|\/|:|;|=|@|\\|\^|`|\||~)+/g;
    const passwordIssues: PasswordIssues = {
      tooShort: false,
      withoutNumberChar: false,
      withoutSpecialChar: false,
      withoutAlphaChar: false,
      confirmationDontMatch: false,
    };
    let passwordIsValid = true;

    if (password.length < 8) {
      passwordIssues.tooShort = true;
      passwordIsValid = false;
    }
    if (!numberPattern.test(password)) {
      passwordIssues.withoutNumberChar = true;
      passwordIsValid = false;
    }
    if (!alphaPattern.test(password)) {
      passwordIssues.withoutAlphaChar = true;
      passwordIsValid = false;
    }
    if (!specialPattern.test(password)) {
      passwordIssues.withoutSpecialChar = true;
      passwordIsValid = false;
    }
    if (password !== passwordConfirmation) {
      passwordIssues.confirmationDontMatch = true;
      passwordIsValid = false;
    }

    return [passwordIsValid, passwordIssues];
  }

  return <SignUp onSubmit={handleSubmit} />;
}
