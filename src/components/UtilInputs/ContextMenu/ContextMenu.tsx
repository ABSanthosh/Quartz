import "./ContextMenu.scss";
import * as ContextMenu from "@radix-ui/react-context-menu";

export function Item({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & ContextMenu.MenuItemProps) {
  return (
    <ContextMenu.Item
      {...props}
      className={`ContextMenu__Item ${className ? className : ""}`}
    >
      {children}
    </ContextMenu.Item>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu.Portal>
      <ContextMenu.Content
        className="ContextMenu__Content"
        alignOffset={5}
        data-align="end"
      >
        {children}
      </ContextMenu.Content>
    </ContextMenu.Portal>
  );
}

export function Root({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenu__Trigger">
        {trigger}
      </ContextMenu.Trigger>
      {children}
    </ContextMenu.Root>
  );
}
