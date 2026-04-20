const production = "production";
const development = "development";

const mode = development;

let base_url = "";

if (mode === production) {
  base_url = ""; // production API
} else {
  base_url = "http://localhost:5000"; // local API
}

export { base_url };