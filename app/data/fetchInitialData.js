const fetchInitialData = async () => {
  return fetch(
    'view-source:https://gist.githubusercontent.com/SBoscarino/344d305dfb47acf213fe7b92fa7268eb/raw/be5e76a5476ab6ff901617db23c3625547cd167d/mock-api-questions.json',
  ).then((response) =>
    response.json().then((data) => ({
      data,
    })),
  );
};

export { fetchInitialData };
