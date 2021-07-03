import React from "react";
import { ListGroup } from "react-bootstrap";

import { TagsData } from "../../typescript/responseApi";

interface TagsFilterProps {
  type: "Include" | "Exclude";
  tags: Array<TagsData>;
  onClickTag: Function;
  tagsSelected: Array<TagsData>;
}

const TagsFilter: React.FC<TagsFilterProps> = (props) => {
  const { type, tags, onClickTag, tagsSelected } = props;

  return (
    <div className="mb-3">
      <h2 className="h6"> {type} Tags:</h2>
      <ListGroup className="tags-filter__list-group">
        {tags.map((tag) => (
          <ListGroup.Item
            key={tag.name}
            className="d-flex align-items-center"
            onClick={() => {
              onClickTag(tag, "Include");
            }}
          >
            <span className="flex-grow-1">{tag.name}</span>
            <i
              className="fas fa-trash text-danger px-2 contact__icon"
              onClick={() => {
                alert("Delete Tag");
              }}
            ></i>
            {tagsSelected.some(
              (tagSelected: TagsData) => tagSelected.name === tag.name
            ) ? (
              <i className="fas fa-check-circle text-primary px-2 "></i>
            ) : (
              <i className="fas fa-check-circle text-primary px-2 contact__icon"></i>
            )}
          </ListGroup.Item>
        ))}
        <ListGroup.Item></ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default TagsFilter;
