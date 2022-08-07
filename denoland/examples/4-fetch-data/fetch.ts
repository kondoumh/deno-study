// eno run --allow-net fetch.ts

const jsonResponse = await fetch("https://api.github.com/users/denoland");
const jsonData = await jsonResponse.json();
console.log(jsonData);

const textResponse = await fetch("https://deno.land");
const textData = await textResponse.text();
console.log(textData);

try {
  await fetch("https://does.not.exist");
} catch (error) {
  console.log(error);
}
