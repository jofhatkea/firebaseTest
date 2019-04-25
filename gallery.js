let urlParams = new URLSearchParams(window.location.search);
const database = firebase.database();
let catId = urlParams.get("category");
const gallery = document.querySelector("#app");

let listOfBusinesses = [];

const Business = {
  name: "",
  description: "",
  location: "",
  contact: {
    fblink: "",
    telephone: "",
    weblink: ""
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
  ],
  filters: [],

  createBadges(filters) {
    filters.forEach(filter => {
      let averageRate = filter.rate / filter.votes;

      if (averageRate > 5) {
        this.filters.push(filter.name);
      }
    });
  }
};

function init() {
  buildBusinessList();
  //console.log(listOfBusinesses);
  //showListBusiness();
}

init();

function buildBusinessList() {
  database.ref(catId + "/").on("child_added", snapshot => {
    const key = snapshot.key;
    const data = snapshot.val();

    const business = Object.create(Business);

    business.name = data.name;
    business.description = data.description;
    business.location = data.location;
    business.badges = data.badges;
    business.createBadges(data.badges);

    //listOfBusinesses.push(business);
    showListBusiness(business);
  });
}

function showListBusiness(business) {
  //console.log(listOfBusinesses);
  console.log("hello");
  //listOfBusinesses.forEach(business => {
  console.log("here no");
  let clone = document.querySelector("template").content.cloneNode(true);
  clone.querySelector(".business_name").textContent = business.name;
  clone.querySelector(".business_desc").textContent = business.description;
  clone.querySelector(".gmap_canvas").src = business.location;
  let badgesList = clone.querySelector(".badges_list");
  business.filters.forEach(filter => {
    let li = document.createElement("li");
    li.textContent = filter;
    console.log(li);
    badgesList.appendChild(li);
  });
  gallery.appendChild(clone);
  //});
}
