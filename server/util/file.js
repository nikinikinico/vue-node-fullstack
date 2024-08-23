const fs = require("fs");
const path = require("path");
const handleFile = {
  delete: async (filePaths) => {
    return new Promise(async (resolve, reject) => {
      const errors = [];
      if (!Array.isArray(filePaths)) {
        reject(false);
      } else {
        const rootDir = path.resolve(__dirname, "..");
        const deletePromises = filePaths.map(async (item) => {
          const absolutePath = path.join(rootDir, "public", item);
          try {
            await fs.accessSync(absolutePath, fs.constants.F_OK);
            await fs.unlinkSync(absolutePath);
          } catch (error) {
            errors.push({ item, error: error.message });
          }
        });
        try {
          await Promise.all(deletePromises);
        } catch (error) {
          reject(false);
        }
        resolve(errors);
      }
    });
  },
};
module.exports = handleFile;
