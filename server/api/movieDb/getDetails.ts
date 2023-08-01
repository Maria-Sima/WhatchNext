import axios from "axios";

const dotenv=require("dotenv");
dotenv.config()
const key=dotenv.end.process.TMDB_Key;

export async function GetDetails({ title }: { title: string }) {
  try {
    console.log(title)

  const url = `https://api.themoviedb.org/3/search/multi?query=${title}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
  };
  const res = await axios.get(url, options)
    .catch(err => console.error('error:' + err));
  const details = await res?.data;
  return details;
}
catch (error){
  console.error('Error while fetching details:', error);
  }
}
