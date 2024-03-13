"use client";

import { createContext, useState } from "react";

import { ContextMenu } from "@/components";
import { ContextMenuAction } from "@/components/ContextMenu";

interface ContextMenuContextType {
  setPosition: (x: number, y: number) => void;
  setVisibility: (visibility: boolean) => void;
  setActions: (actions: ContextMenuAction[]) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>({
  setPosition: () => {},
  setVisibility: () => {},
  setActions: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ContextMenuProvider({ children }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visibility, setVisibility] = useState(false);
  const [actions, setActions] = useState<ContextMenuAction[]>([]);

  return (
    <ContextMenuContext.Provider
      value={{
        setPosition: (x, y) => setPosition({ x, y }),
        setVisibility,
        setActions,
      }}
    >
      {children}

      <ContextMenu
        position={position}
        isVisible={visibility}
        setIsVisible={setVisibility}
        actions={actions}
      />
    </ContextMenuContext.Provider>
  );
}
