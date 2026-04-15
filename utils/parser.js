export async function jsonBodyParser(req) {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.includes("application/json")) {
    return {};
  }

  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", err => {
      reject(err);
    });
  });
}

export function queryParser(req) {
  const { pathname: url, searchParams } = new URL(
    `http://localhost:8080${req.url}`
  );
  console.log(url);


  const query = Object.fromEntries(searchParams);

  return { query, url, method: req.method };
}

export async function parser(req) {
  const { query, url, method } = queryParser(req);

  let body = {};

  if (["POST", "PUT"].includes(method)) {
    body = await jsonBodyParser(req);
  }

  req.query = query;
  req.body = body;
  req.url = url;

  return req;
}

export function resHelper(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export default {
  queryParser,
  jsonBodyParser,
  parser,
  resHelper,
};