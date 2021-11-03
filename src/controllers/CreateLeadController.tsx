import React from "react";
import { useHistory } from "react-router";
import { leadApi } from "../api/leadApi";
import { CreateLead, leadData } from "../views/CreateLead";
import { Lead } from "../classes/Lead";

export function CreateLeadController() {
  const history = useHistory();

  function saveLead(data: leadData) {
    const opportunities = [] as string[];
    for (let opportunity of Object.entries(data.opportunities)) {
      if (opportunity[1] !== undefined) opportunities.push(opportunity[1]);
    }

    const lead = new Lead(
      data.name,
      data.phoneNumber,
      data.email,
      opportunities,
      "potential customer"
    );
    try {
      leadApi.saveLead(lead);
      alert("Lead incluído com sucesso");
      history.push("leads");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return <CreateLead onSubmit={saveLead} />;
}
