import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";
import EditableBlock from "../EditableBlock/EditableBlock";
import md5 from "../../../../Utils/md5";
import { useAuth } from "../../../../hooks/useAuth";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function PageContent({ navState }) {
  const { pageDetails, setPageDetails } = useAuth();

  const pageRef = useRef(pageDetails);

  const [nextFocus, setNextFocus] = useState({});

  useEffect(() => {
    pageRef.current = pageDetails;
    console.log(pageDetails);
  }, [pageDetails]);

  useEffect(() => {
    if (nextFocus.current) nextFocus.current.nextSibling.focus();
  }, [nextFocus]);

  // Functioning add block 
  function addBlock(currentBlock) {
    const newBlock = { id: md5(), html: "", tagName: "div" };
    const index = pageRef.current
      .map((block) => block.id)
      .indexOf(currentBlock.id);

    const updatedPageDetails = [...pageRef.current];
    updatedPageDetails.splice(index + 1, 0, newBlock);
    pageRef.current = updatedPageDetails;
    setNextFocus(currentBlock.ref);
    if (currentBlock.ref.current.nextSibling) {
      currentBlock.ref.current.nextSibling.focus();
    }
  }

  function deletePreviousBlock(currentBlock) {
    const blocks = pageRef.current;
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...pageRef.current];
    updatedPageDetails[index] =
      updatedPageDetails[index] + pageRef.current.nextSibling.innerHTML;
    updatedPageDetails.splice(index + 1, 1);
    pageRef.current = updatedPageDetails;
  }

  function removeCurrentBlock(currentBlock) {
    const previousBlock = currentBlock.ref.current.previousElementSibling;
    if (previousBlock) {
      const blocks = pageRef.current;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedPageDetails = [...blocks];
      updatedPageDetails.splice(index, 1);
      pageRef.current = updatedPageDetails;
      setCaretToEnd(currentBlock.ref.current, "Backspace");
    }
  }

  function updateData(currentBlock) {
    const blocks = pageRef.current;
    console.log(blocks);
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...blocks];
    updatedPageDetails[index].html = currentBlock.html;
    pageRef.current = updatedPageDetails;
    setPageDetails(pageRef.current);
  }

  return (
    <div
      className={`PageContentWrapper ${
        navState ? "PageContentWrapper--open" : ""
      }`}
    >
      {pageRef.current.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            id={block.id}
            tabIndex={key}
            html={block.html}
            pageRef={pageRef}
            addBlock={addBlock}
            updateData={updateData}
            tagName={block.tagName}
            placeholder="Type '/' for commands"
            className="PageContentWrapper__block"
            removeCurrentBlock={removeCurrentBlock}
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
