import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";
import EditableBlock from "../EditableBlock/EditableBlock";
import md5 from "../../../../Utils/md5";
import { useAuth } from "../../../../hooks/useAuth";

function PageContent({ navState }) {
  const { pageDetails, setPageDetails } = useAuth();

  const [nextFocus, setNextFocus] = useState({});

  useEffect(() => {
    // console.log(nextFocus.current);
    if (nextFocus.current) nextFocus.current.nextSibling.focus();
  }, [nextFocus]);

  function caretToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  function addBlock(currentBlock) {
    const newBlock = { id: md5(), html: "", tagName: "div" };
    const index = pageDetails.map((block) => block.id).indexOf(currentBlock.id);
    const updatedPageDetails = [...pageDetails];
    updatedPageDetails.splice(index + 1, 0, newBlock);

    setPageDetails(updatedPageDetails);
    setNextFocus(currentBlock.ref);
  }

  function removeBlock(currentBlock) {
    const previousBlock = currentBlock.ref.current.previousElementSibling;
    if (previousBlock) {
      const blocks = pageDetails;
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedPageDetails = [...blocks];
      updatedPageDetails.splice(index, 1);
      setPageDetails(updatedPageDetails);
      caretToEnd(previousBlock);
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
            id={block.id}
            className="PageContentWrapper__block"
            tagName={block.tagName}
            html={block.html}
            placeholder="Type '/' for commands"
            addBlock={addBlock}
            removeBlock={removeBlock}
            updateData={updateData}
          />
        );
      })}
      {/* <EditableBlock
        id={md5()}
        className="PageContentWrapper__block"
        tagName="div"
        placeholder="Type '/' for commands"
        addBlock={addBlock}
      /> */}
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
