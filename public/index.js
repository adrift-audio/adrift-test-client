function Index() {
  const anchor = '#root';

  const token = getToken();
  if (!token) {
    return SignIn(anchor);
  }

  return Home(anchor); 
}

$(document).ready(Index);
