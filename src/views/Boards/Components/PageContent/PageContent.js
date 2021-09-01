import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";
import EditableBlock from "../EditableBlock/EditableBlock";
import md5 from "../../../../Utils/md5";
import { useAuth } from "../../../../hooks/useAuth";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function PageContent({ navState }) {
  const initialBlock = { id: md5(), html: "", tagName: "div" };
  // const { pageDetails, setPageDetails } = useAuth();

  const [pageDetails, setPageDetails] = useState([initialBlock]);

  const [nextFocus, setNextFocus] = useState({});

  useEffect(() => {
    if (nextFocus.current) nextFocus.current.nextSibling.focus();
  }, [nextFocus]);

  function addBlock(currentBlock) {
    const newBlock = { id: md5(), html: "", tagName: "div" };
    const index = pageDetails.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...pageDetails];
    updatedPageDetails.splice(index + 1, 0, newBlock);

    setPageDetails(updatedPageDetails);
    setNextFocus(currentBlock.ref);
    if (currentBlock.ref.current.nextSibling) {
      currentBlock.ref.current.nextSibling.focus();
    }
  }

  function deletePreviousBlock(currentBlock) {
    console.log(currentBlock.ref.current.nextSibling.innerText);
    const blocks = pageDetails;
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...pageDetails];
    updatedPageDetails[index] =
      updatedPageDetails[index] +
      currentBlock.ref.current.nextSibling.innerHTML;
    updatedPageDetails.splice(index + 1, 1);
    setPageDetails(updatedPageDetails);
  }

  function removeCurrentBlock(currentBlock) {
    const previousBlock = currentBlock.ref.current.previousElementSibling;
    if (previousBlock) {
      const blocks = pageDetails;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedPageDetails = [...blocks];
      updatedPageDetails.splice(index, 1);
      setPageDetails(updatedPageDetails);
      setCaretToEnd(currentBlock.ref.current, "Backspace");
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
            deletePreviousBlock={deletePreviousBlock}
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
