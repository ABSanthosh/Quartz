import LeftPane from "@/components/LeftPane/LeftPane";
import { useStoreActions, useStoreState } from "@/hooks/useStoreHooks";
import "@/styles/routes/main-app.scss";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@/styles/routes/markdown.scss";
import useDebounce from "@/hooks/useDebounce";
import { IFolder } from "@/store/models/data.model";
import Split from "react-split-grid";
import RightPane from "@/components/RightPane/RightPane";

export default function Workbench() {
  const isNavOpen = useStoreState((state) => state.ui.isNavOpen);
  const activePage = useStoreState((actions) => actions.data.activePage);
  const currentFolder = useStoreState((state) => state.data.currentFolder);
  const folders = useStoreState((state) => state.data.folders);

  const updatePageData = useStoreActions(
    (actions) => actions.data.updatePageData
  );
  const [markdown, setMarkdown] = useState<string>(`# Hello, world!`);
  const debouncedValue = useDebounce(markdown, 1000);
  const [gridTemplate, setGridTemplate] = useState("290px 4px 1fr 4px 290px");

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
      const pageData = (folders[currentFolder] as IFolder).pages[activePage]
        .data;
      console.log(pageData);
      setMarkdown(pageData);
    }
  }, [activePage]);

  return (
    // @ts-ignore
    <Split
      // snapOffset={240}
      onDrag={(_, __, gridTemplateStyle) => setGridTemplate(gridTemplateStyle)}
    >
      {({
        getGridProps,
        getGutterProps,
      }: {
        getGridProps: any;
        getGutterProps: any;
      }) => (
        <main
          className="Workbench"
          {...getGridProps()}
          style={{
            gridTemplateColumns: gridTemplate,
          }}
        >
          <LeftPane />
          <span
            role="presentation"
            className="Workbench__sash Workbench__sash--left"
            {...getGutterProps("column", 1)}
          />
          <div className="Workbench__content"></div>

          <span
            role="presentation"
            className="Workbench__sash Workbench__sash--right"
            {...getGutterProps("column", 3)}
          />
          <RightPane />
        </main>
      )}
    </Split>
  );
}
