export const useEnterSubmit = (e, callback) => {
  let key = e.keyCode || e.which;
  if (key === 13) {
    callback(e);
  }
};