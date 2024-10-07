const fs = require("fs");
const path = require("path");
const moveFiles = require("../utils/moveFiles");
function handleTempUploads(req, res, next) {
  if (!req.body.thumbnail_url || !req.body.content) {
    next();
  } else {
    const imageUrlDir =
      req.protocol + "://" + req.get("host") + "/public/blogsimages/";
    const tempImageUrlDir =
      req.protocol + "://" + req.get("host") + "/tempUploads/";
    //   Find matches url in content
    const regex = /src="([^"]+)"/g;

    const matchUrls = [];
    let matchUrl;
    let newContent = req.body.content;
    const content = req.body.content;
    while ((matchUrl = regex.exec(content)) !== null) {
      matchUrls.push(matchUrl[1]);
    }
    //   Image file name
    const contextImageFilename = matchUrls.map(
      (url) => url.split("/").slice(-1)[0]
    );
    const thumbnailFilename = req.body.thumbnail_url.split("/").slice(-1)[0];
    // Remove all temporary files that not matches
    const allTempUrls = fs.readdirSync(
      path.join(__dirname, "../../tempUploads")
    );
    allTempUrls.forEach((file) => {
      if (file !== thumbnailFilename) {
        if (!contextImageFilename.includes(file)) {
          fs.rmSync(path.join(__dirname, "../../tempUploads", file));
        } else {
          // Replace all temporary image url to new image url
          newContent = newContent.replace(
            new RegExp(
              String.raw`src="${tempImageUrlDir.replace(/\//g, "\\/")}${file}"`,
              "g"
            ),
            `src="${imageUrlDir + file}"`
          );
        }
      }
    });
    // Move all temporary images to main uploads folder, then delete all
    allTempUrls.forEach((file) => {
      const oldPath = path.join(__dirname, "../../tempUploads", file);
      const newPath = path.join(__dirname, "../../public/blogsimages", file);
      moveFiles(oldPath, newPath, () => {
        console.log("Files has been moved");
      });
    });
    // Passing new thumbnail url to controller
    res.locals.thumbUrl = imageUrlDir + thumbnailFilename;
    res.locals.newContent = newContent;
    next();
  }
}

module.exports = { handleTempUploads };
