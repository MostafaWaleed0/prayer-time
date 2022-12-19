export const convertToLink = (value1: string, value2?: string) => {
  return `${value1.split(' ').join('%20')}${value2 && `&country=${value2.split(' ').join('%20')}`}}`;
};
