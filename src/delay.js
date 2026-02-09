export const delay = async (time) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
};
