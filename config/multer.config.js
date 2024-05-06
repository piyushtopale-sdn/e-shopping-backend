import multer from "multer";
import path from "path";
import fse from "fs-extra";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirpath = "uploads";

    if (file.fieldname == "image") {
      const fileDir = path.resolve(dirpath);
      fse.ensureDirSync(fileDir); // Make sure that the upload path exits

      cb(null, fileDir);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname)
    );
  },
});
