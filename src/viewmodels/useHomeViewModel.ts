import { getRoomsQuery } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function useHomeViewModel() {
  const [username, setUsername, isUsernameLoading] = useLocalStorage(
    "username",
    "",
  );
  const [rooms, isRoomsLoading] = useCollectionData(
    getRoomsQuery({ limit: 10 }),
  );

  return { username, setUsername, isUsernameLoading, rooms, isRoomsLoading };
}
