export const UpdateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject,
  };
};
