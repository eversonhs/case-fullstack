import { Lead } from "../classes/Lead";

export const leadApi = {
  saveLead: (lead: Lead) => {
    const leadName = `Lead@${lead.name}`;
    if (localStorage.getItem(leadName) === null) {
      localStorage.setItem(
        leadName,
        JSON.stringify({
          name: lead.name,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          status: lead.status,
          opportunities: lead.opportunities,
        })
      );
    } else {
      throw Error("Lead already exists");
    }
  },

  loadLead: (name: string) => {
    const lead = localStorage.getItem(`Lead@${name}`);
    if (lead !== null) {
      const leadObject = JSON.parse(lead);
      return new Lead(
        name,
        leadObject.phoneNumber,
        leadObject.email,
        leadObject.opportunities,
        leadObject.status
      );
    } else return null;
  },

  updateLead: (lead: Lead) => {
    if (localStorage.getItem(`Lead@${lead.name}`) !== null) {
      localStorage.setItem(
        `Lead@${lead.name}`,
        JSON.stringify({
          name: lead.name,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          status: lead.status,
          opportunities: lead.opportunities,
        })
      );
    }
  },

  getLeads: () => {
    const leads = [] as Lead[];
    for (let i = 0; i < localStorage.length; ++i) {
      let key = localStorage.key(i);
      if (key?.startsWith("Lead@")) {
        leads.unshift(leadApi.loadLead(key.split("@")[1]) as Lead);
      }
    }

    return leads;
  },
};
