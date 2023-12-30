export const updateForm = (e, dataSetter) => {
  const { name, value } = e.target;
  dataSetter((prevData) => {
    return {
      ...prevData,
      [name]: value,
    };
  });
};
