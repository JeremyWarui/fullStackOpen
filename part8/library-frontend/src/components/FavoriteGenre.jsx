import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "./queries";

const FavoriteGenre = (props) => {
  const userResult = useQuery(CURRENT_USER);
  if (userResult.loading) <div>...loading</div>;

  const favoriteGenre = userResult.data?.me?.favoriteGenre;

  const bookResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: favoriteGenre,
    },
    skip: !favoriteGenre,
  });

  if (bookResult.loading) <div>...loading</div>;

  if (!props.show) {
    return null;
  }

  // console.log( { result } );

  const books = bookResult.data ? bookResult.data.allBooks : [];

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

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
    </div>
  );
};

export default FavoriteGenre;
