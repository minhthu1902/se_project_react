import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    // get name and value from the event target, e.target is the input
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
