import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { OutlineButton } from "../common/Buttons";
import { SimpleHeading } from "../common/Heading";
import { SimpleParagraph } from "../common/Paragraph";
import style from "./index.module.less";

const NoResultsFound = () => {
    const history = useHistory();
  return (
    <div>
      <SimpleHeading heading={"No Results Found!"} size={22} weight={800} />
      <div className={style.paraContainer}>
        <SimpleParagraph
          paragraph={"Oops! We can’t seem to find what you are looking for."}
          size={16}
          margin = {"15px 0px"}
        />
        <SimpleParagraph
          paragraph={
            "  Maybe try a different search or add a new directory listing if you know anyone or LBS that sells this item."
          }
          size={16}
          margin = {"15px 0px"}
        />
        <SimpleParagraph
          paragraph={
            " Not only would this be a great help to us, but also to your community looking for the same stuff as you! "
          }
          size={16}
          margin = {"15px 0px"}
        />
      </div>
      <div className={style.noResultButtonsContainer}>
      <Button
            variant="transparent"
            className={style.simple}
            onClick={() => history.push("")}
          >
            <u>Try a new Search</u>
          </Button>
          <OutlineButton
            text='ADD NEW DIRECTORY LISTING'
            size='small'
            cssClass={style.addNewBtn}
          />
      </div>
    </div>
  );
};

export default NoResultsFound;
