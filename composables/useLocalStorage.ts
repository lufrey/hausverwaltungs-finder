import type { ZodSchema } from "zod";

const localStorageContent = ref<string | any>({});

const jsonSafeParse = (value: string) => {
  try {
    return JSON.parse(value) as unknown;
  } catch (e) {
    return null;
  }
};

export function useLocalStorage<T>(
  key: string,
  schema: ZodSchema<T>,
  initial: T,
): {
  get: () => T | null;
  set: (value: T) => void;
  state: Ref<T>;
};

export function useLocalStorage<T>(
  key: string,
  schema: ZodSchema<T>,
): {
  get: () => T | null;
  set: (value: T) => void;
  state: Ref<T | null>;
};

export function useLocalStorage<T>(
  key: string,
  schema: ZodSchema<T>,
  initial?: T,
) {
  const get = () => {
    // return null if run on server
    if (typeof window === "undefined") {
      return null;
    }

    // Get the value from localStorage
    const storageValue = localStorage.getItem(key);
    if (!storageValue) {
      return null;
    }

    // Parse the JSON string from localStorage
    const parsedObjectValue = jsonSafeParse(storageValue);
    if (!parsedObjectValue) {
      return null;
    }

    // Parse the value with the schema
    const parsedSchemaValue = schema.safeParse(parsedObjectValue);
    if (parsedSchemaValue.success) {
      return parsedSchemaValue.data;
    }
    return null;
  };

  const set = (value: T) => {
    // return if run on server
    if (typeof window === "undefined") {
      return;
    }
    const result = schema.safeParse(value);
    if (result.success) {
      localStorageContent.value[key] = result.data;
      localStorage.setItem(key, JSON.stringify(result.data));
    }
  };

  localStorageContent.value[key] = get();

  return {
    get,
    set,
    state: computed(() => localStorageContent.value[key] ?? initial),
  };
}
