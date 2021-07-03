import React from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames";

import { ContactData } from "../../typescript/responseApi";

interface ContactCredentialProps {
  contact: ContactData;
  contactsSelected: Array<number>;
  onClickContactCheck: Function;
}

const ContactCredential: React.FC<ContactCredentialProps> = (props) => {
  const { contactsSelected, onClickContactCheck } = props;

  const { id, name, phoneNumber, tags } = props.contact;

  return (
    <div className="d-flex align-items-center mb-3" key={id}>
      <div className="flex-grow-1">
        {" "}
        <div className="contact-credential-left__container">
          <i
            className={classNames(
              "fas fa-check-circle   utility_font-size-24px",
              {
                "text-primary": contactsSelected.includes(id),
                "text-grey-secondary": !contactsSelected.includes(id),
              }
            )}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClickContactCheck(id);
            }}
          ></i>
          <img
            src="https://picsum.photos/id/870/200/300?grayscale&blur=2"
            className="img-fluid rounded-circle "
            alt="img"
            style={{ height: 48, width: 48 }}
          />
          <div>
            {" "}
            <h4 className="h6">{name ? name : "(This user has no name)"}</h4>
            <p className="text-grey-secondary mb-0">+{phoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="contact-credential-right__container">
        {tags.map((tag) => (
          <Button
            color="primary"
            className="contact-credential__tag-button"
            key={tag.name}
            onClick={() => {
              alert("Delete Tag");
            }}
          >
            {tag.name}
            <i className="fas fa-times-circle " style={{ paddingLeft: 12 }}></i>
          </Button>
        ))}

        <Button
          color="primary"
          className="contact-credential__plus-button"
          onClick={() => {
            alert("Add Tag");
          }}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
    </div>
  );
};

export default ContactCredential;
