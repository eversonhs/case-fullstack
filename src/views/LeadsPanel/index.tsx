import React, { DragEvent } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Lead } from "../../classes/Lead";
import "./styles.css";

export type LeadsPanelProps = {
  leads: Lead[];
  onDrag: (event: DragEvent<HTMLParagraphElement>, lead: Lead) => void;
  onDrop: (event: DragEvent<HTMLTableCellElement>) => void;
  onDragOver: (event: DragEvent<HTMLTableCellElement>) => void;
};

export function LeadsPanel(props: LeadsPanelProps) {
  return (
    <div className="panelContainer">
      <Header text="Painel de Leads" />
      <Link to="create-lead">
        <button className="newLeadButton">Novo Lead (+)</button>
      </Link>

      <table className="leadsTable">
        <thead>
          <tr>
            <th className="tableHeader">Cliente em Potencial</th>
            <th className="tableHeader">Dados Confirmados</th>
            <th className="tableHeader">Reunião Agendada</th>
          </tr>
        </thead>

        <tbody>
          {props.leads.map((lead, index) => {
            return (
              <tr key={lead.name} style={index % 2 !== 0 ? {backgroundColor: "lightgray"} :{backgroundColor: "white"}}>
                <td
                  className="tableData"
                  id={`ln${index}Col0`}
                  onDrop={(event) => props.onDrop(event)}
                  onDragOver={props.onDragOver}
                >
                  {lead.status === "potential customer" ? (
                    <p
                      className="leadName"
                      id={lead.name}
                      draggable
                      onDragStart={(event) => props.onDrag(event, lead)}
                    >
                      {lead.name}
                    </p>
                  ) : (
                    ""
                  )}
                </td>

                <td
                  className="tableData"
                  id={`ln${index}Col1`}
                  onDrop={(event) => props.onDrop(event)}
                  onDragOver={props.onDragOver}
                >
                  {lead.status === "confirmed data" ? (
                    <p
                      className="leadName"
                      id={lead.name}
                      draggable
                      onDragStart={(event) => props.onDrag(event, lead)}
                    >
                      {lead.name}
                    </p>
                  ) : (
                    ""
                  )}
                </td>

                <td
                  className="tableData"
                  id={`ln${index}Col2`}
                  onDrop={(event) => props.onDrop(event)}
                  onDragOver={props.onDragOver}
                >
                  {lead.status === "scheduled meeting" ? (
                    <p className="leadName" id={lead.name}>
                      {lead.name}
                    </p>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
