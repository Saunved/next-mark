/* eslint-disable import/prefer-default-export */
import path from "path";
import fs from "fs";

// https://stackoverflow.com/a/71166133
export const deepReadDir = async (dirPath) =>
    Promise.all(
        fs.readdirSync(dirPath, { withFileTypes: true }).map(async (dirent) => {
            const innerPath = path.join(dirPath, dirent.name);
            return dirent.isDirectory() ? deepReadDir(innerPath) : innerPath;
        })
    );