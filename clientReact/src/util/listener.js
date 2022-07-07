let history = createBrowserHistory();
history.listen(({ location, action }) => {
  console.log(locaiton);
});