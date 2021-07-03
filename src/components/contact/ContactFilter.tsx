import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { debounce } from "lodash";
import qs from "qs";

import HeaderFilter from "./HeaderFilter";
import TagsFilter from "./TagsFilter";
import MessageCountFilter from "./MessageCountFilter";
import { ContactData, TagsData } from "../../typescript/responseApi";
import { ContactContext } from "../../context/contactContext";
import { makeTheApiCall } from "../../api/makeTheApiCall";

const ContactFilter: React.FC = () => {
  const [messageSent, setMessageSent] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({
    min: undefined,
    max: undefined,
  });
  const [messageReceived, setMessageReceived] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({
    min: undefined,
    max: undefined,
  });
  const [tagsSelected, setTagsSelected] = useState<TagsData[]>([]);
  const { tags, setContacts } = useContext<TagsData[] | any>(ContactContext);

  const callbackSetContactsSucess = (data: {
    contacts: Array<ContactData>;
    nextPage: string;
  }) => {
    setContacts(data.contacts);
  };

  const callbackSetContactsFailed = (err: string) => {
    console.log(err);
  };

  const onClickTag = debounce((tag: TagsData, type: "Include" | "Exclude") => {
    var tagsSelectedState = [];

    if (
      tagsSelected.some(
        (tagSelected: TagsData) => tagSelected.name === tag.name
      )
    ) {
      tagsSelectedState = tagsSelected.filter((tags: TagsData) => {
        return tags.name !== tag.name;
      });
    } else {
      tagsSelectedState = tagsSelected.slice(0);

      tagsSelectedState.push({ name: tag.name });
    }
    const params =
      type === "Include"
        ? {
            tags: tagsSelectedState,
          }
        : {
            notTags: tagsSelectedState,
          };

    makeTheApiCall({
      method: "GET",
      url: `/contacts`,
      headers: {
        params: params,
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { arrayFormat: "comma" });
        },
      },
      callbackSucess: callbackSetContactsSucess,
      callbackFailed: callbackSetContactsFailed,
    });
    setTagsSelected([...tagsSelectedState]);
  }, 500);

  const onChangeMessageCountFilter = debounce(
    (value: string, type: "Sent" | "Received", minMax: "Min" | "Max") => {
      var params:
        | {
            minMessagesSent: string;
            maxMessagesSent: string;
            minMessagesRecv: string;
            maxMessagesRecv: string;
          }
        | any = {
        minMessagesSent: "",
        maxMessagesSent: "",
        minMessagesRecv: "",
        maxMessagesRecv: "",
      };

      if (type === "Sent") {
        if (minMax === "Min") {
          params.minMessagesSent = value;
          params.maxMessagesSent = messageSent.max
            ? `${Number(messageSent.max)}`
            : "";
          params.minMessagesRecv = messageReceived.min
            ? `${Number(messageReceived.min)}`
            : "";
          params.maxMessagesRecv = messageReceived.max
            ? `${Number(messageReceived.max)}`
            : "";
          setMessageSent({ ...messageSent, min: Number(value) });
        } else if (minMax === "Max") {
          params.minMessagesSent = messageSent.min
            ? `${Number(messageSent.min)}`
            : "";
          params.maxMessagesSent = value;
          params.minMessagesRecv = messageReceived.min
            ? `${Number(messageReceived.min)}`
            : "";
          params.maxMessagesRecv = messageReceived.max
            ? `${Number(messageReceived.max)}`
            : "";
          setMessageSent({ ...messageSent, max: Number(value) });
        }
      } else if (type === "Received") {
        if (minMax === "Min") {
          params.minMessagesSent = messageSent.min
            ? `${Number(messageSent.min)}`
            : "";
          params.maxMessagesSent = messageSent.max
            ? `${Number(messageSent.max)}`
            : "";
          params.minMessagesRecv = value;
          params.maxMessagesRecv = messageReceived.max
            ? `${Number(messageSent.max)}`
            : "";
          setMessageReceived({ ...messageReceived, min: Number(value) });
        } else if (minMax === "Max") {
          params.minMessagesSent = messageSent.min
            ? `${Number(messageSent.min)}`
            : "";
          params.maxMessagesSent = value;
          params.minMessagesRecv = messageReceived.min
            ? `${Number(messageReceived.min)}`
            : "";
          params.maxMessagesRecv = value;
          setMessageReceived({ ...messageReceived, max: Number(value) });
        }
      }

      const paramsInArray = Object.entries(params).filter(
        (param: any) => param[1]
      );

      const q = paramsInArray.map((k: any) => k[0] + "=" + k[1]).join("&");

      makeTheApiCall({
        method: "GET",
        url: `/contacts?${q}`,
        callbackSucess: callbackSetContactsSucess,
        callbackFailed: callbackSetContactsFailed,
      });
    },
    300
  );

  return (
    <div className="contact-filter__container">
      <div>
        <HeaderFilter />
        <TagsFilter
          onClickTag={onClickTag}
          tags={tags.slice(0, 4)}
          type="Include"
          tagsSelected={tagsSelected}
        />
        <TagsFilter
          onClickTag={onClickTag}
          tags={tags.slice(5, 9)}
          type="Exclude"
          tagsSelected={tagsSelected}
        />
        <MessageCountFilter
          onChangeMessageCountFilter={onChangeMessageCountFilter}
          minMax={messageSent}
          type="Sent"
        />
        <MessageCountFilter
          onChangeMessageCountFilter={onChangeMessageCountFilter}
          minMax={messageReceived}
          type="Received"
        />
      </div>
      <Button
        color="primary"
        className="mb-3"
        onClick={() => {
          alert("Save Filters");
        }}
      >
        Save Filters
      </Button>
    </div>
  );
};

export default ContactFilter;
