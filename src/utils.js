const fs = require("fs/promises");

const writeDataToFile = async (filename, data) => {
  try {
    await fs.writeFile(filename, JSON.stringify(data), "utf8");
  } catch (error) {
    console.error(error);
  }
};

const parseBodyData = (request) => {
  let body = [];

  return new Promise((resolve, reject) => {
    try {
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const parsedBody = JSON.parse(body);
          resolve(JSON.parse(body));
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  writeDataToFile,
  parseBodyData,
};
