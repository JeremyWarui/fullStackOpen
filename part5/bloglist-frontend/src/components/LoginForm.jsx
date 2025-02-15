const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username:{' '}
      <input
        type='text'
        data-testid='username'
        value={username}
        name='username'
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password:{' '}
      <input
        type='password'
        value={password}
        name='password'
        data-testid='password'
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>login</button>
  </form>
)

export default LoginForm
