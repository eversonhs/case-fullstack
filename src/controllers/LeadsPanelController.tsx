import React, { DragEvent, useEffect, useState } from "react";
import { leadApi } from "../api/leadApi";
import { LeadsPanel } from "../views/LeadsPanel";
import { Lead } from "../classes/Lead";

export function LeadsPanelController() {
  const [leads, setLeads] = useState([] as Lead[]);

  useEffect(() => {
    setLeads(leadApi.getLeads())
  }, []);

  function allowDrop(event: DragEvent<HTMLTableCellElement>) {
    event.preventDefault();
  }

  function drag(event: DragEvent<HTMLParagraphElement>, lead: Lead) {
    const sourceId = (event.target as EventTarget & HTMLParagraphElement)
      .parentElement?.id as string;

    event.dataTransfer.setData(
      "text",
      JSON.stringify({
        leadName: lead.name,
        sourceId,
      })
    );
  }

  function drop(event: DragEvent<HTMLTableCellElement>) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    const [lead] = leads.filter((lead) => lead.name === data.leadName);
    const elementId = (event.target as EventTarget & HTMLTableCellElement).id;

    const [sourceLine, sourceColumn] = getLineAndColumnFromId(data.sourceId);
    const [destinationLine, destinationColumn] = getLineAndColumnFromId(
      elementId as string
    );

    if (
      sourceLine === destinationLine &&
      sourceColumn === destinationColumn - 1
    ) {
      changeLeadstatus(lead);
      setLeads(leadApi.getLeads());
    }
  }

  function getLineAndColumnFromId(elementId: string) {
    const [, cellLine, cellColumn] = elementId.split(/\D+/) as string[];
    return [Number.parseInt(cellLine), Number.parseInt(cellColumn)];
  }

  function changeLeadstatus(lead: Lead) {
    lead.promoteStatus();
    leadApi.updateLead(lead);
  }

  return (
    <LeadsPanel
      leads={leads}
      onDragOver={allowDrop}
      onDrag={drag}
      onDrop={drop}
    />
  );
}
