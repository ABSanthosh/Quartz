import "./DropMenu.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Item({ children, ...props }: DropdownMenu.MenuItemProps) {
  return (
    <DropdownMenu.Item className="DropMenu__Item" {...props}>
      {children}
    </DropdownMenu.Item>
  );
}

export function Separator() {
  return <DropdownMenu.Separator className="DropMenu__Separator" />;
}

export function Root({
  children,
  align = "start",
  iconHex = 58836,
  triggerButton,
}: {
  children: React.ReactNode;
  align?: "start" | "end" | "center" | undefined;
  iconHex?: number;
  triggerButton?: React.ReactNode;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerButton || (
          <button
            className="FancyButton DropMenu__Icon"
            aria-label="Customize options"
          >
            <span data-icon={String.fromCharCode(iconHex)} />
          </button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropMenu__Content"
          sideOffset={5}
          align={align}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
