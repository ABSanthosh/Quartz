import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";
import EditableBlock from "../EditableBlock/EditableBlock";
import md5 from "../../../../Utils/md5";
import { useAuth } from "../../../../hooks/useAuth";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function PageContent({ navState }) {
  const { pageDetails, setPageDetails } = useAuth();

  const [nextFocus, setNextFocus] = useState({});

  useEffect(() => {
    if (nextFocus.current) nextFocus.current.nextSibling.focus();
  }, [nextFocus]);


  function addBlock(currentBlock) {
    const newBlock = { id: md5(), html: "", tagName: "div" };
    const index = pageDetails.map((block) => block.id).indexOf(currentBlock.id);
    console.log(pageDetails);
    const updatedPageDetails = [...pageDetails];
    updatedPageDetails.splice(index + 1, 0, newBlock);

    setPageDetails(updatedPageDetails);
    setNextFocus(currentBlock.ref);
    if (currentBlock.ref.current.nextSibling) {
      currentBlock.ref.current.nextSibling.focus();
    }
  }

  function removeCurrentBlock(currentBlock) {
    const previousBlock = currentBlock.ref.current.previousElementSibling;
    if (previousBlock) {
      const blocks = pageDetails;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedPageDetails = [...blocks];
      updatedPageDetails.splice(index, 1);
      setPageDetails(updatedPageDetails);
      setCaretToEnd(previousBlock);
      previousBlock.focus();
    }
  }

  function updateData(currentBlock) {
    const blocks = pageDetails;
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...blocks];
    updatedPageDetails[index].html = currentBlock.html;
    setPageDetails(updatedPageDetails);
  }

  return (
    <div
      className={`PageContentWrapper ${
        navState ? "PageContentWrapper--open" : ""
      }`}
    >
      {pageDetails.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            tabIndex={key}
            id={block.id}
            className="PageContentWrapper__block"
            tagName={block.tagName}
            html={block.html}
            placeholder="Type '/' for commands"
            addBlock={addBlock}
            removeCurrentBlock={removeCurrentBlock}
            updateData={updateData}
          />
        );
      })}
    </div>
  );
}

PageContent.propTypes = {
  navState: PropTypes.bool.isRequired,
};

PageContent.defaultProps = {
  // bla: 'test',
};

export default PageContent;
