import type { ZodSchema } from "zod";

const jsonSafeParse = (value: string) => {
  try {
    return JSON.parse(value) as unknown;
  } catch (e) {
    return null;
  }
};

export const useLocalStorage = <T>(key: string, schema: ZodSchema<T>) => {
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
      localStorage.setItem(key, JSON.stringify(result.data));
    }
  };

  return {
    get,
    set,
  };
};
