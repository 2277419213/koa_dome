class returnModel {
  success = (data) => ({
    code: 200,
    data: data,
    msg: "ok",
  });
  error = (data, msg) => ({
    code: 0,
    data: data,
    msg: msg,
  });
}

module.exports = new returnModel();
