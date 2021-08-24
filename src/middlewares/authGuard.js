const authGuard = (to, from, next) => {
  switch (to.meta.auth) {
    case "log":
      if (!localStorage.getItem("token")) return next.redirect("/");
      return next();
    case "unlog":
      if (localStorage.getItem("token")) return next.redirect("/dashboard");
      return next();
    default:
  }
  return next();
};
export default authGuard;
