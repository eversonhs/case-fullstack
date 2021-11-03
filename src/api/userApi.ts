export type UserCredential = {
  user: string;
  password: string;
};
export const userApi = {
  saveUser: (credential: UserCredential) => {
    if (localStorage.getItem(`User@${credential.user}`) === null)
      localStorage.setItem(
        `User@${credential.user}`,
        JSON.stringify(credential)
      );
    else {
      throw Error("User already exists");
    }
  },
};
