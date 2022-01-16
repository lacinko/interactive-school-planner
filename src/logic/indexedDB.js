import Dexie from "dexie";
import { calculateSemester } from "./apiLogic";

const db = new Dexie("ReactDexie");
const semester = calculateSemester();

db.version(1).stores({
  testData: "datakey",
});

export default db;

export async function saveDataInIndexDB(data) {
  if (data) {
    if (db.testData) db.testData.clear();
    db.testData.add({ datakey: "datakey", data }).then(() => {});
  }
}

export async function getDataFromIndexDB() {
  const testData = await db.testData
    .where("datakey")
    .equals("datakey")
    .toArray();
  if (testData && testData.length > 0) {
    return testData[0];
  }
  return null;
}

export const getDataFromDB = async () => {
  let data = await getDataFromIndexDB();
  console.log("Data ", data);
};

saveDataInIndexDB(semester);
