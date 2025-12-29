import { useRef } from "react";

interface FieldRef {
  current: any;
}

interface RefsMap {
  [key: string]: FieldRef;
}

export const useFormValidation = (fieldNames: string[] = []) => {
  const refsMap = useRef<RefsMap>({});

  // Initialize refs on first render
  fieldNames.forEach((fieldName) => {
    if (!refsMap.current[fieldName]) {
      refsMap.current[fieldName] = { current: null };
    }
  });

  const validate = (): boolean => {
    let isValid = true;

    fieldNames.forEach((fieldName) => {
      const ref = refsMap.current[fieldName]?.current;
      const isFieldValid = ref?.validate?.() ?? true;
      if (!isFieldValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  return { refs: refsMap.current, validate };
};
