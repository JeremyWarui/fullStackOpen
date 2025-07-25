import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "./queries";
import { useState } from "react";
// fetch allbooks using useQuery

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre || undefined,
    },
  });

  if (result.loading) <div>...loading</div>;

  if (!props.show) {
    return null;
  }

  // console.log( { result } );

  const books = result.data ? result.data.allBooks : [];

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre("classic")}>classic</button>
        <button onClick={() => setGenre("security")}>security</button>
        <button onClick={() => setGenre("crime")}>crime</button>
        <button onClick={() => setGenre("revolution")}>revolution</button>
        <button onClick={() => setGenre("refactoring")}>refactoring</button>
        <button onClick={() => setGenre("agile")}>agile</button>
        <button onClick={() => setGenre("patterns")}>patterns</button>
        <button onClick={() => setGenre("design")}>design</button>
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
