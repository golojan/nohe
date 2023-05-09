import { dbCon } from "./models";

const sayHello = (name: string) => {
  return `Hello ${name}`;
};

const sayHi = (name: string) => {
  return `Hello ${name}`;
};

const getSubPages: any = async (parent: string) => {
  const { Pages } = await dbCon();
  const pages = await Pages.find({ parent: parent }).sort({ createdAt: -1 });
  return { count: pages.length, subpages: pages };
};

const hasSubPages: any = async (parent: string) => {
  const { Pages } = await dbCon();
  let cnt = 0;
  await Pages.count({ parent: parent }).then((count) => {
    cnt = count;
  });
  return Number(cnt);
};

export default { sayHello, sayHi, getSubPages, hasSubPages };
