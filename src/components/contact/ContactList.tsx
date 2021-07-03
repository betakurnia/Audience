import React, { useContext, useState } from "react";
import { sortBy } from "lodash";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

import ContactCredential from "./ContactCredential";
import { ContactContext } from "../../context/contactContext";

import { ContactData } from "../../typescript/responseApi";

const ContactList: React.FC = () => {
  const [contactLimit, setContactLimit] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { contacts, contactsSelected, setContactsSelected } = useContext<
    ContactData[] | any
  >(ContactContext);

  const loadFunc = () => {
    setTimeout(() => {
      // It's supposed to call https://api-im.chatdaddy.tech/contacts?page=1 but somehow this api don't work on my side
      new Promise((resolve, reject) => {
        resolve("");
      })
        .then(() => {
          if (
            (contacts.length > 0 && contactLimit > contacts.length) ||
            contacts.length === 0
          ) {
            setHasMore(false);
            return;
          }
          setContactLimit(contactLimit + 10);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };

  const onClickContactCheck = (id: number) => {
    if (contactsSelected.includes(id)) {
      const contactsSelectedState = contactsSelected.filter(
        (contactSelected: number) => {
          return contactSelected !== id;
        }
      );
      setContactsSelected([...contactsSelectedState]);
    } else {
      contactsSelected.push(id);
      setContactsSelected([...contactsSelected]);
    }
  };

  return (
    <div className="mt-3">
      {contacts.length > 0 ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={hasMore}
          loader={
            <Spinner
              className="mx-auto d-block text-primary my-3"
              animation="border"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
        >
          {contacts &&
            sortBy(contacts.slice(0, contactLimit), [
              function (o) {
                return o.name;
              },
            ]).map((contact: ContactData) => (
              <ContactCredential
                contactsSelected={contactsSelected}
                onClickContactCheck={onClickContactCheck}
                contact={contact}
              />
            ))}
        </InfiniteScroll>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "70vh" }}
        >
          <p className="h2">Data is not exist</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
