import * as fs from 'fs';
import { Letter } from '../models/letter';
import { Word } from '../models/word';

export function writeJSON(data: Word[] | Letter[], fileName: string): void {
  // convert JSON object to a string
  const dataStringified = JSON.stringify(data);

  // write file to disk
  fs.writeFile('./src/data/' + fileName, dataStringified, 'utf8', (err) => {
    if (err) {
      console.log(`Error writing file: ${err.message}`);
    } else {
      console.log(`File is written successfully!`);
    }
  });
}
