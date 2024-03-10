import useLocalStorage from "@/hooks/useLocalStorage";

export default function useSignupViewModel() {
  const [username, setUsername, isUsernameLoading] = useLocalStorage(
    "username",
    "",
  );

  return {username, setUsername, isUsernameLoading};
}