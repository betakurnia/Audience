import React, { useContext } from "react";

import { ContactContext } from "../../context/contactContext";
import { ContactData } from "../../typescript/responseApi";

const HeaderFilter: React.FC = () => {
  const { totalContact } = useContext<ContactData | any>(ContactContext);

  return (
    <header className="d-flex justify-content-between align-items-end py-3">
      <a href="/#" className="h3 mb-0 text-decoration-none text-black">
        <i className="fas fa-align-right" style={{ paddingRight: "16px" }}></i>
        Audience
      </a>
      <p className="text-grey-secondary mb-0">
        {totalContact && totalContact} Contacts
      </p>
    </header>
  );
};

export default HeaderFilter;
