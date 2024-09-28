import { readFile, readFileSync, writeFileSync } from "fs";

// taki mongodb z chin
const DATABASE_LMAO = JSON.parse(readFileSync("database.json", "utf8"));

export namespace Database {
	export let data = DATABASE_LMAO;

	export function save_db() {
		writeFileSync("database.json", JSON.stringify(data, null, 4));
	}
}
