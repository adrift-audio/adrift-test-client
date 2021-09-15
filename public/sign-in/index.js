async function SignIn(anchor = '#root') {
  $(anchor).empty().append(`
  <div class="flex direction-col justify-content-center h-100 sign-in">
    <form
      class="flex direction-col"
      id="sign-in-form"
    >
      <h1 class="text-center noselect">
        Adrift Testing Client
      </h1>
      <input
        class="mt-1"
        id="email"
        name="email"
        placeholder="Email"
        type="email"
      />
      <input
        class="mt-1"
        id="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <button
        class="mt-1 noselect"
        type="submit"
      >
        Sgin in
      </button>
      <div
        class="flex items-center error-board-wrap text-center mt-1 w-100 noselect"
        id="error"
      ></div>
    </form>
  </div>
  `);

  $('#sign-in-form').on('submit', async (event) => {
    event.preventDefault();
    $('#error').empty();

    const email = $('#email').val();
    const password = $('#password').val();

    loader();

    try {
      const { data } = await $.ajax({
        data: {
          client: CLIENT_TYPE,
          email,
          password,
        },
        method: 'POST',
        url: `${BACKEND_ENDPOINT}/api/auth/sign-in`,
      });
  
      loader.hide();
      const { token } = data;
      if (!token) {
        return $('#error').empty().append('Access denied!');
      }
  
      setToken(token);
      return Home(anchor);
    } catch (error) {
      loader.hide();

      const { responseJSON: { status = null } = {} } = error;

      if (status) {
        if (status === 400) {
          return $('#error').empty().append('<div class="error-board">Missing data!</div>');
        }
        if (status === 401) {
          return $('#error').empty().append('<div class="error-board">Access denied!</div>');
        }
      }
      return $('#error').empty().append('<div class="error-board">Something went wrong!</div>');
    }
  });
}