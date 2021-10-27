const koa = require("koa");
const mysql = require("./mysql");
const returnModel = require("./returnModel");
const app = new koa();

app.use(async (ctx, next) => {
  if (ctx.url == "/") {
    ctx.response.body = "<h1>Hello, koa2!</h1>";
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.url == "/queryUser") {
    const sqlyj = "SELECT * FROM user";
    let data = await mysql.query(sqlyj);
    ctx.body = returnModel.success(data);
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.url.includes("/insertUser")) {
    const sqlyj = "INSERT INTO user (createdTime,name,sex) VALUES(?,?,?)";
    const sqlobj = [new Date(), ctx.query.name, ctx.query.sex];
    let data = await mysql.insert(sqlyj, sqlobj);
    console.log(data);
    if (data) {
      ctx.body = returnModel.success("插入成功");
    } else {
      ctx.body = returnModel.error([], "插入失败");
    }
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.url.includes("/updateUser")) {
    const sqlyj =
      "UPDATE user SET name = '" + ctx.query.name + "' where id = 1";
    let data = await mysql.query(sqlyj);
    console.log(data);
    if (data) {
      ctx.body = returnModel.success("修改成功");
    } else {
      ctx.body = returnModel.error([], "修改失败");
    }
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  console.log(ctx.url);
  ctx.body = ctx.query;
});

// 在端口3000监听:
app.listen(3000);
console.log("app started at port 3000...");
