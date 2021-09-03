export function setCaretToPos(pos, el) {
  for (var node of el.childNodes) {
    if (node.nodeType === 3) {
      if (node.length >= pos) {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1;
      } else {
        // pos -= node.length;
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
      }
    } else {
      pos = setCaretToPos(pos, node);
      if (pos === -1) {
        return -1;
      }
    }
  }
  return pos;
}

export function left(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

export function right(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

export default function setCaretToEnd(el, direction) {
  const sel = window.getSelection();

  if (direction === "ArrowDown") {
    if (el.nextSibling.innerText !== "") {
      setCaretToPos(sel.anchorOffset, el.nextSibling);
    } else {
      right(el.nextSibling);
    }
  }
  if (direction === "ArrowUp") {
    if (el.previousElementSibling.innerText !== "") {
      setCaretToPos(sel.anchorOffset, el.previousElementSibling);
    } else {
      left(el.previousElementSibling);
    }
  }
  if (direction === "ArrowLeft" && el.previousElementSibling) {
    left(el.previousElementSibling);
  }
  if (direction === "ArrowRight" && el.nextSibling) {
    right(el.nextSibling);
  }
  if (direction === "Backspace") {
    left(el.previousElementSibling);
  }
}
