import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type UseLocalStorageState<T> = {
  value: T;
  updatedAt: Date;
};

function parse<T>(value: string): UseLocalStorageState<T> {
  const parsed = JSON.parse(value);
  parsed.updatedAt = new Date(parsed.updatedAt);
  return parsed;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<UseLocalStorageState<T>>({
    value: initialValue,
    updatedAt: new Date(),
  });

  const value = useMemo(() => state.value, [state]);
  const setValue = useCallback((value: SetStateAction<T>) => {
    setState((prevState) => {
      const nextState =
        typeof value === "function"
          ? (value as (prevState: T) => T)(prevState.value)
          : value;
      return { value: nextState, updatedAt: new Date() };
    });
  }, []);

  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        setState(parse<T>(value));
      } catch (error) {
        console.error(error);
      }
    }
    setFirstTime(false);
  }, [key]);

  useEffect(() => {
    if (firstTime) return;
    localStorage.setItem(
      key,
      JSON.stringify({ value: state.value, updatedAt: new Date() }),
    );
  }, [key, state, firstTime]);

  return [value, setValue, firstTime];
}
