export const baseUrl = 'https://api.themoviedb.org/3/';

export const originalImageURL = (imgPath: string) => `https://image.tmdb.org/t/p/original${imgPath}`;
export const w500ImageURL = (imgPath: string) => `https://image.tmdb.org/t/p/w500${imgPath}`;
export const searchUrl=(title:string)=> `${baseUrl}search/multi?query=${title}`;
