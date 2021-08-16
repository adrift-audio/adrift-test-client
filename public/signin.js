async function SignIn(anchor = 'root') {
  $(anchor).empty().append(`
<form id="sign-in-form">
  <h1>Log in as ${CLIENT_TYPE}</h1>
  <input
    id="email"
    name="email"
    placeholder="Email"
    type="email"
  />
  <input
    id="password"
    name="password"
    placeholder="Password"
    type="password"
  />
  <button type="submit">
    Sgin in
  </button>
  <div id="error"></div>
</form>
  `);

  $('#sign-in-form').on('submit', async (event) => {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    const { data } = await $.ajax({
      data: {
        client: CLIENT_TYPE,
        email,
        password,
      },
      method: 'POST',
      url: `${BACKEND_ENDPOINT}/api/auth/sign-in`,
    });

    const { token } = data;
    if (!token) {
      return $('#error').empty().append('Access denied!');
    }

    setToken(token);
    return Home(anchor);
  });
}