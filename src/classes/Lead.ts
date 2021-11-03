export class Lead {
  readonly name: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly opportunities: string[];
  status: string;

  constructor(
    name: string,
    phoneNumber: string,
    email: string,
    opportunities: string[],
    status: string
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.opportunities = opportunities;
    this.status = status;
  }

  promoteStatus() {
    if (this.status === "potential customer") this.status = "confirmed data";
    else if (this.status === "confirmed data")
      this.status = "scheduled meeting";
  }
}
