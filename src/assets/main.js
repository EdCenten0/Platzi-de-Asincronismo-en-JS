import APIKey from "./api.json" assert { type: "json" };

const API = "https://api.thecatapi.com/v1/images/search?";
const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "x-api-key": `${APIKey.api.key}`,
  },
};

async function fetchData(urlAPI, searchParameter) {
  const response = await fetch(`${urlAPI}${searchParameter}`, options);
  const data = await response.json();
  return data;
}

//Este tipo de funcion se ejecuta automaticamente cuando se carga el archivo
(async () => {
  try {
    const photos = await fetchData(API, "limit=10");
    let view = `
    ${photos
      .map(
        (photo) => `
    <div class="group relative">
    <div
      class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
    >
      <img src="${photo.url}" alt="${photo.id}" class="w-full" style="width:100%; height:300px;"/>
    </div>
    <div class="mt-4 flex justify-between">
      <h3 class="text-sm text-gray-700">
        <span aria-hidden="true" class="absolute inset-0"></span>
      </h3>
    </div>
  </div>
    `
      )
      .slice(0, 4)
      .join("")}`;

    content.innerHTML = view;
  } catch (err) {
    console.log(err);
  }
})();
