const database = firebase.database();

console.log(database);

const form = document.querySelector("form");
const menu = document.querySelector("#catMenu");
console.log(form);

const nameEl = document.querySelector("#form_name");
const descriptionEl = document.querySelector("#form_desc");
const locationEl = document.querySelector("#locationSrc");
const category_form = document.querySelector("#category_form");

form.addEventListener("submit", e => {
  e.preventDefault();
  let categoryNode = category_form.value;
  console.log(categoryNode);
  database.ref(categoryNode + "/").push({
    name: nameEl.value,
    description: descriptionEl.value,
    location: locationEl.value,
    image: "imagepath",
    contact: {
      fblink: "facebookLink",
      weblink: "webLink",
      telefone: "50505050"
    },
    badges: [
      {
        name: "vegetarian",
        rate: 0,
        votes: 0
      },
      {
        name: "vegan",
        rate: 0,
        votes: 0
      },
      {
        name: "zeroWaste",
        rate: 0,
        votes: 0
      },
      {
        name: "plasticFree",
        rate: 0,
        votes: 0
      },
      {
        name: "organic",
        rate: 0,
        votes: 0
      }
    ]
  });
  nameEl.value = "";
  descriptionEl.value = "";
  locationEl.value = "";
});

database.ref("/").on("child_added", snapshot => {
  const key = snapshot.key;
  const data = snapshot.val();
  console.log(key);
  let a = document.createElement("a");
  a.textContent = key;
  a.href = "gallery.html?category=" + key;

  menu.appendChild(a);
});
