import { useState, useEffect } from "react";
import { LOGIN } from "./queries";
import { useMutation } from "@apollo/client";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    // onError: (error) => {
    //   setError(error.graphQLErrors[0].message);
    // },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    props.setPage("authors")
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <div>username</div>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <div>password</div>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
