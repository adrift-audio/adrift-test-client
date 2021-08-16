async function Home(anchor) {
  $(anchor).empty().append(`
<div>
  Loading...
</div>  
  `);

  const token = getToken();
  if (!token) {
    return Index();
  }

  const { data } = await $.ajax({
    headers: {
      Authorization: token,
    },
    method: 'GET',
    url: `${BACKEND_ENDPOINT}/api/account`,
  });

  const { user } = data;

  const socketsAnchor = 'websockets-anchor';
  $(anchor).empty().append(`
<h1>Hello ${user.firstName} ${user.lastName}!</h1>
<mark>Logged in as ${CLIENT_TYPE}</mark>
<div id="${socketsAnchor}"></div>
<div>
  <button
    id="logout"
    type="button"
  >
    Logout
  </button>
</div>
  `);

  await Sockets(`#${socketsAnchor}`);
}
