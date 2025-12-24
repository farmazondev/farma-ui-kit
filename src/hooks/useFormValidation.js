import { useRef } from "react";

export const useFormValidation = (fieldNames = []) => {
  const refsMap = useRef({});

  // Initialize refs on first render
  fieldNames.forEach((fieldName) => {
    if (!refsMap.current[fieldName]) {
      refsMap.current[fieldName] = { current: null };
    }
  });

  const validate = () => {
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
