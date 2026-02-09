 export function getInputProps({
    name,
    label,
    type = "text",
    placeholder,
    endContent,
    required = true,
    errors,
  }) {
    return {
      label,
      type,
      placeholder,
      isRequired: required,
      isInvalid: !!errors?.[name],
      errorMessage: errors?.[name]?.message,
      classNames: {
        inputWrapper: "bg-white/90",
      },
      endContent,
    };
  }

 export function getSelectProps({
    name,
    label,
    required = true,
    errors,
  }) {
    return {
      label,
      isRequired: required,
      isInvalid: !!errors?.[name],
      errorMessage: errors?.[name]?.message,
      classNames: {
        trigger: "bg-white/90",
      },
      name,
    };
  }