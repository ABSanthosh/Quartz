import Sidebar from "@/components/Sidebar/Sidebar";
import { useStoreActions, useStoreState } from "@/hooks/useStoreHooks";
import "@/styles/routes/main-app.scss";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@/styles/routes/markdown.scss";
import useDebounce from "@/hooks/useDebounce";
import { IFolder } from "@/store/models/data.model";

export default function MainApp() {
  const isNavOpen = useStoreState((state) => state.ui.isNavOpen);
  const activePage = useStoreState((actions) => actions.data.activePage);
  const currentFolder = useStoreState((state) => state.data.currentFolder);
  const folders = useStoreState((state) => state.data.folders);

  const updatePageData = useStoreActions(
    (actions) => actions.data.updatePageData
  );
  const [markdown, setMarkdown] = useState<string>(`# Hello, world!`);
  const debouncedValue = useDebounce(markdown, 1000);

  useEffect(() => {
    if (currentFolder && activePage) {
      updatePageData({
        folderId: currentFolder,
        pageId: activePage,
        data: markdown,
      });
      console.log("updated");
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (currentFolder && activePage) {
      const pageData = (folders[currentFolder] as IFolder).pages[activePage].data
      console.log(pageData);
      setMarkdown(pageData);
    }
  }, [activePage]);

  return (
    <main className={`MainApp ${!isNavOpen ? "MainApp--open" : ""}`}>
      <Sidebar />
      <div className="MainApp__content">
        <textarea
          className="MainApp__content--textarea MarkdownBody"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <ReactMarkdown
          children={markdown}
          className="MarkdownBody"
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </main>
  );
}
