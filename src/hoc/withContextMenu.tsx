import { FunctionComponent, useContext } from "react";

import { ContextMenuAction } from "@/components/ContextMenu";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";

interface Props {
  actions: ContextMenuAction[];
}

export default function withContextMenu<T>(
  WrappedComponent: FunctionComponent<T>,
) {
  return function WithContextMenu({ actions, ...props }: T & Props) {
    const { setPosition, setVisibility, setActions } =
      useContext(ContextMenuContext);

    const handleContextMenu = (e: PointerEvent) => {
      e.preventDefault();
      const { clientX, clientY } = e;
      setPosition(clientX, clientY);
      setVisibility(true);
      setActions(actions);
    };

    return (
      <WrappedComponent {...(props as T)} onContextMenu={handleContextMenu} />
    );
  };
}
