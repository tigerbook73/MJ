const fs = require("fs");
const path = require("path");
const symlinkDir = require("symlink-dir");

const source = path.resolve(__dirname, "shared/src");
const target = path.resolve(__dirname, "client/src/common");

async function createLink() {
  try {
    if (fs.existsSync(target)) {
      console.log(`Symlink target already exists: ${target}`);
      return;
    }
    await symlinkDir(source, target);
    console.log(`Symlink created: ${target} -> ${source}`);
  } catch (err) {
    console.error("Failed to create symlink:", err);
    process.exit(1);
  }
}

createLink();
