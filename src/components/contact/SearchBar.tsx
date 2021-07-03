import React, { useContext } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { debounce } from "lodash";

import { ContactData } from "../../typescript/responseApi";
import { ContactContext } from "../../context/contactContext";
import { makeTheApiCall } from "../../api/makeTheApiCall";

const SearchBar: React.FC = () => {
  const { setContacts } = useContext<any>(ContactContext);

  const callbackFilterByQuerySucess = (data: {
    contacts: Array<ContactData>;
    nextPage: string;
  }) => {
    setContacts([...data.contacts]);
  };

  const callbackFilterByQueryFailed = (err: string) => {
    console.log(err);
  };

  const onSearchContact = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      makeTheApiCall({
        method: "GET",
        url: `/contacts?q=${event.target.value}`,
        callbackSucess: callbackFilterByQuerySucess,
        callbackFailed: callbackFilterByQueryFailed,
      });
    },
    500
  );

  return (
    <Form.Group className="mb-3">
      <InputGroup>
        <InputGroup.Prepend>
          {" "}
          <Button className="bg-gray search-bar__button-search">
            <i className="fas fa-search text-grey-secondary "></i>
          </Button>
        </InputGroup.Prepend>
        <Form.Control
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onSearchContact(event);
          }}
          type="text"
          placeholder="Search contacts"
          className="bg-gray search-bar__input"
        />
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBar;
