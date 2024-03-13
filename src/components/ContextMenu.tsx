export interface ContextMenuAction {
  text: string;
  action: () => void;
}

interface Props {
  position: { x: number; y: number };
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  actions: ContextMenuAction[];
}

export default function ContextMenu({
  position,
  isVisible = false,
  setIsVisible = () => {},
  actions = [],
}: Props) {
  return isVisible ? (
    <div
      className="fixed inset-0"
      onContextMenu={(e) => {
        e.preventDefault();
        setIsVisible(false);
      }}
      onClick={() => setIsVisible(false)}
    >
      <ul
        className="absolute backdrop-blur"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {actions.map((action) => (
          <li
            key={action.text}
            onClick={action.action}
            className="cursor-pointer bg-slate-500/50 px-4 py-2 first:rounded-t-md last:rounded-b-md hover:bg-slate-500"
          >
            {action.text}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
