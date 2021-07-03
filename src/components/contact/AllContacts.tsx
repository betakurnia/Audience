import React from "react";

import HeaderContact from "./HeaderContact";
import SearchBar from "./SearchBar";
import SelectAllContact from "./SelectAllContact";
import ContactList from "./ContactList";

const AllContacts: React.FC = () => {
  return (
    <div>
      <HeaderContact />
      <SearchBar />
      <SelectAllContact />
      <ContactList />
    </div>
  );
};

export default AllContacts;
