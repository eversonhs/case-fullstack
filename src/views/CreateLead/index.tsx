import React, { useState } from "react";
import { Checkbox } from "../../components/Checkbox";
import { Header } from "../../components/Header";
import { TextInput } from "../../components/TextInput";
import "./styles.css";

export type leadData = {
  name: string;
  phoneNumber: string;
  email: string;
  opportunities: {
    rpa?: string;
    digitalProduct?: string;
    analytics?: string;
    bpm?: string;
  };
};

type CreateLeadProps = {
  onSubmit: (data: leadData) => void;
};

export function CreateLead(props: CreateLeadProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [allOpportunities, setAllOpportunities] = useState(false);
  const [rpa, setRpa] = useState(false);
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [bpm, setBpm] = useState(false);

  function checkAll(event: React.ChangeEvent<HTMLInputElement>) {
    setAllOpportunities(event.target.checked);
    setRpa(event.target.checked);
    setDigitalProduct(event.target.checked);
    setAnalytics(event.target.checked);
    setBpm(event.target.checked);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rpa || digitalProduct || analytics || bpm) {
      props.onSubmit({
        name,
        phoneNumber,
        email,
        opportunities: {
          rpa: rpa ? "RPA" : undefined,
          digitalProduct: digitalProduct ? "Produto Digital" : undefined,
          analytics: analytics ? "Analytics" : undefined,
          bpm: bpm ? "BPM" : undefined,
        },
      });
    } else {
      alert("Selecione ao menos uma oportunidade");
    }
  }

  return (
    <div className="createLeadContainer">
      <Header text="Novo Lead" />
      <form className="createLeadForm" onSubmit={submitForm}>
        <fieldset className="textInputs">
          <TextInput
            label="Nome*"
            fieldId="leadName"
            type="text"
            value={name}
            setValue={setName}
            required
          />
          <TextInput
            label="Telefone*"
            fieldId="leadphoneNumber"
            type="text"
            value={phoneNumber}
            setValue={setphoneNumber}
            required
          />
          <TextInput
            label="Email*"
            fieldId="leadEmail"
            type="email"
            value={email}
            setValue={setEmail}
            required
          />
        </fieldset>
        <div className="opportunitiesContainer">
          <legend>Oportunidades*</legend>
          <Checkbox
            id="checkboxAll"
            name="opportunities"
            label=""
            value="All"
            checked={allOpportunities}
            onChange={checkAll}
            style={{backgroundColor:"gray"}}
            />
          <Checkbox
            id="checkboxRpa"
            name="opportunities"
            label="RPA"
            value="RPA"
            checked={rpa}
            onChange={(event) => setRpa(event.target.checked)}
            style={{backgroundColor:"lightgray"}}
            />
          <Checkbox
            id="checkboxProdutoDigital"
            name="opportunities"
            label="Produto Digital"
            value="Produto digital"
            checked={digitalProduct}
            onChange={(event) => setDigitalProduct(event.target.checked)}
            style={{backgroundColor:"lightgray"}}
            />
          <Checkbox
            id="checkboxAnalytics"
            name="opportunities"
            label="Analytics"
            value="Analytics"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
            style={{backgroundColor:"lightgray"}}
            />
          <Checkbox
            id="checkboxBpm"
            name="opportunities"
            label="BPM"
            value="BPM"
            checked={bpm}
            onChange={(event) => setBpm(event.target.checked)}
            style={{backgroundColor:"lightgray"}}
          />
          <button className="saveButton" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
