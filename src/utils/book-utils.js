export const generateIsbn = async (title, author) => {
 const isbn = `${title.substring(0,4).toUpperCase()}-${author}`;
 return isbn;
};

export const generateCoverImageURL = async (title) => {
 const coverImageURL = `https://picsum.photos/seed/${title.substring(
  0,
  3
 )}/200`;
 return coverImageURL;
};
