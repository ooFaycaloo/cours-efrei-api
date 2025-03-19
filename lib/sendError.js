export const sendError = (res,error) => {
  res.send({ "error": error });
}