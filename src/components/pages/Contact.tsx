import React, { useState, useEffect } from "react";

import ContactFilter from "../contact/ContactFilter";
import AllContacts from "../contact/AllContacts";
import { makeTheApiCall } from "../../api/makeTheApiCall";
import { ContactData, TagsData } from "../../typescript/responseApi";
import { ContactContext } from "../../context/contactContext";

const Contact: React.FC = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [tags, setTags] = useState<TagsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contactsSelected, setContactsSelected] = useState<number[]>([]);
  const [totalContact, setTotalContact] = useState<number>(0);

  const callbackFetchContactsSucess = (data: {
    contacts: Array<ContactData>;
    nextPage: string;
    totalCount: number;
  }) => {
    setContacts(data.contacts);
    setTotalContact(data.totalCount);
  };

  const callbackFetchContactsFailed = (err: string) => {
    console.log(err);
  };

  const callbackFetchTagsSucess = (data: { tags: Array<ContactData> }) => {
    setTags(data.tags);
  };

  const callbackFetchTagsFailed = (err: string) => {
    console.log(err);
  };

  const fetchContacts = () => {
    makeTheApiCall({
      method: "GET",
      url: "/contacts?returnTotalCount=true",
      callbackSucess: callbackFetchContactsSucess,
      callbackFailed: callbackFetchContactsFailed,
    });
  };

  const fetchTags = () => {
    makeTheApiCall({
      method: "GET",
      url: "/tags",
      callbackSucess: callbackFetchTagsSucess,
      callbackFailed: callbackFetchTagsFailed,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchContacts();
    fetchTags();
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <ContactContext.Provider
          value={{
            contacts,
            setContacts,
            totalContact,
            contactsSelected,
            setContactsSelected,
            tags,
          }}
        >
          <div className="d-flex flex-wrap flex-md-nowrap">
            <div className="contact__left-sidebar">
              <ContactFilter />
            </div>
            <div className="contact__right-sidebar">
              <AllContacts />
            </div>
          </div>
        </ContactContext.Provider>
      )}
    </>
  );
};

export default Contact;
