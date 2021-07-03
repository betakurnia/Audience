import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames";

import { ContactContext } from "../../context/contactContext";
import { ContactData } from "../../typescript/responseApi";

const SelectAllContact: React.FC = () => {
  const { contacts, contactsSelected, setContactsSelected } = useContext<
    ContactData[] | any
  >(ContactContext);

  const onClickSelectAllContact = () => {
    if (contactsSelected.length === contacts.length) {
      setContactsSelected([]);
    } else {
      const contactSelectedState = contacts.map((contact: ContactData) => {
        return contact.id;
      });

      setContactsSelected([...contactSelectedState]);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <i
          onClick={() => {
            onClickSelectAllContact();
          }}
          className={classNames(
            "fas fa-check-circle   utility_font-size-24px",
            {
              "text-primary": contactsSelected.length === contacts.length,
              "text-grey-secondary":
                contactsSelected.length !== contacts.length,
            }
          )}
          style={{ paddingRight: 16, cursor: "pointer" }}
        ></i>
        <h2 className="h6 mb-0"> Select All</h2>
      </div>
      <Button
        className="search-all-contact__export-all-button"
        color="primary"
        onClick={() => {
          alert("Export All");
        }}
        disabled={contactsSelected.length !== contacts.length}
      >
        Export All
      </Button>
    </div>
  );
};

export default SelectAllContact;
