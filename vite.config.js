import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	/*
	server: {
		https: {
			key: fs.readFileSync(
				path.resolve(__dirname, "/home/sarthak/Documents/certs/key.pem")
			),
			cert: fs.readFileSync(
				path.resolve(__dirname, "/home/sarthak/Documents/certs/cert.pem")
			),
		},
	},
	*/
});
