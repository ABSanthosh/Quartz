import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";
import EditableBlock from "../EditableBlock/EditableBlock";
import md5 from "../../../../Utils/md5";
import { useAuth } from "../../../../hooks/useAuth";
import { setCaretToPos } from "../../../../Utils/setCaretToEnd";

function PageContent({ navState }) {
  const { setPageDetails, pageDetails, currentBoard } = useAuth();

  const pageRef = useRef(pageDetails);

  const [nextFocus, setNextFocus] = useState({});
  const [backspaceFocus, setBackspaceFocus] = useState(null);
  const [newLineFocus, setNewLineFocus] = useState(null);

  useEffect(() => {
    pageRef.current = pageDetails;
    currentBoard.blocks = pageRef.current;
  }, [pageDetails]);

  useEffect(() => {
    if (newLineFocus !== null) {
      // console.log("newLineFocus", newLineFocus);
      setCaretToPos(0, newLineFocus);
      setNewLineFocus(null);
    }
  }, [newLineFocus]);

  useEffect(() => {
    if (nextFocus.current) {
      nextFocus.current.nextSibling.focus();
      setNextFocus({ current: null });
    }
  }, [nextFocus]);

  useEffect(() => {
    if (backspaceFocus !== null) {
      setCaretToPos(backspaceFocus[0], backspaceFocus[1]);
      backspaceFocus[1].focus();
      setBackspaceFocus(null);
    }
  }, [backspaceFocus]);

  // Functioning add block
  function addBlock(currentBlock) {
    const remainingOldLine = currentBlock.ref.current.innerHTML.slice(
      0,
      currentBlock.offset
    );

    const newBlock = {
      id: md5(),
      html: currentBlock.ref.current.innerHTML.slice(
        currentBlock.offset,
        currentBlock.ref.current.innerHTML.length
      ),
      tagName: "div",
    };

    const index = pageRef.current
      .map((block) => block.id)
      .indexOf(currentBlock.id);

    const updatedPageDetails = [...pageRef.current];
    updatedPageDetails[index].html = remainingOldLine;
    updatedPageDetails.splice(index + 1, 0, newBlock);
    pageRef.current = updatedPageDetails;
    setPageDetails(pageRef.current);
    if (currentBlock.ref.current.nextSibling) {
      currentBlock.ref.current.nextSibling.focus();
    }
    setNewLineFocus(currentBlock.ref.current.nextSibling);
  }

  function deletePreviousBlock(currentBlock) {
    const nextBlock = currentBlock.ref.current.nextSibling;
    if (nextBlock) {
      const blocks = pageRef.current;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedPageDetails = [...blocks];
      updatedPageDetails[index].html += updatedPageDetails[index + 1].html;
      updatedPageDetails.splice(index + 1, 1);
      pageRef.current = updatedPageDetails;
      setPageDetails(pageRef.current);
      setBackspaceFocus([
        currentBlock.ref.current.innerHTML.length,
        currentBlock.ref.current,
      ]);

      // console.log(updatedPageDetails[index + 1]);
      setNewLineFocus(currentBlock.ref.current);
    }
  }

  // Functioning delete block function
  function removeCurrentBlock(currentBlock) {
    const previousBlock = currentBlock.ref.current.previousElementSibling;
    if (previousBlock) {
      const blocks = pageRef.current;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      // console.log(currentBlock.id, index);
      if (index > 0) {
        const updatedPageDetails = [...blocks];
        const previousBlockLength = updatedPageDetails[index - 1].html.length;
        updatedPageDetails[index - 1].html =
          updatedPageDetails[index - 1].html +
          currentBlock.ref.current.innerHTML;
        updatedPageDetails.splice(index, 1);
        pageRef.current = updatedPageDetails;
        setBackspaceFocus([previousBlockLength, previousBlock]);
        setPageDetails(pageRef.current);
      }
    }
  }

  function updateData(currentBlock) {
    const blocks = pageRef.current;
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
            isPageBlock={true}
            addBlock={addBlock}
            updateData={updateData}
            tagName={block.tagName}
            placeholder="Type '/' for commands (comming soon)"
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

PageContent.defaultProps = {};

export default PageContent;
