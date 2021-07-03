import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { ContactContext } from "../../context/contactContext";
import { ContactData } from "../../typescript/responseApi";

const HeaderContact: React.FC = () => {
  const { totalContact } = useContext<ContactData | any>(ContactContext);

  return (
    <header className="d-flex justify-content-between align-items-end py-3">
      <h1 className="h3 mb-0">All Contacts ({totalContact && totalContact})</h1>
      <Button
        color="primary"
        className="header-contact__plus-button"
        onClick={() => {
          alert("Add Contact");
        }}
      >
        <i className="fas fa-plus"></i>
      </Button>
    </header>
  );
};

export default HeaderContact;
