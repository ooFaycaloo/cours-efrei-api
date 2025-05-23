export const sendError = (res,status, error) => {
  res.status(status).send({ "error": error });
}
