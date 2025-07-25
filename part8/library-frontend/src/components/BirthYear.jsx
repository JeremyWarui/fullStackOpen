import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORNYEAR } from "./queries";

const BirthYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBornYear] = useState("");

  const [updateAuthor] = useMutation(EDIT_BORNYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache) => {
      cache.evict({ fieldName: "allAuthors" });
      cache.gc();
    },
  });

  const submit = (event) => {
    event.preventDefault();

    updateAuthor({
      variables: { name, setBornTo: Number(born) },
    });

    setName("");
    setBornYear("");
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          born{" "}
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>

        <button type="submit" onClick={submit}>
          update author
        </button>
      </form>
    </div>
  );
};

export default BirthYear;
