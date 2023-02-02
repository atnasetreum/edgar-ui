export const createUrlImage = (img: string, folder: string = "sellers") => {
  return `${process.env.NEXT_PUBLIC_API_ROUTE}/static/images/${folder}/${img}`;
};
