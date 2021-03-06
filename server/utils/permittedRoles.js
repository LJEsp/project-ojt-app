// https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff#file-app-js-L9

function permittedRoles(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (request, response, next) => {
    if (request.user && isAllowed(request.user.role)) next();
    // role is allowed, so continue on the next middleware
    else {
      response.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
  };
}

module.exports = permittedRoles;
