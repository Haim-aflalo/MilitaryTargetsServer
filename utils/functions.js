import fs from 'fs';
export function hasSameProps(obj) {
  const obj2 = {
    id: 0,
    codeName: 0,
    region: 0,
    priority: 0,
    status: 0,
    createdAt: 0,
  };
  return Object.keys(obj).every(function (prop) {
    return obj2.hasOwnProperty(prop);
  });
}

export async function read(path) {
  return JSON.parse(await fs.promises.readFile(path));
}

export async function write(path, data, f = null) {
  await fs.promises.writeFile(path, JSON.stringify(data, f, 2));
}
