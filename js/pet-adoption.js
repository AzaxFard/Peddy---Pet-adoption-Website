const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach((item) => {

        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML =
            `
        <button id="btn-${item.category}" onclick="loadCategoryPets(${item.category})" class="flex items-center gap-2 border rounded-2xl px-40 py-5 font-extrabold text-xl">
        <img src="${item.category_icon}" alt="">
        ${item.category}
        </button>
        `;

        categoryContainer.append(buttonContainer);
    });
};

const loadPets = () => {
    fetch(
        `https://openapi.programming-hero.com/api/peddy/pets`
    )
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
};

const displayPets = (pets) => {
    const petContainer = document.getElementById("pets");
    // petContainer.innerHTML = "";

    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card bg-base-100 w-96 border mb-3";
        card.innerHTML = `
        <figure class="px-5 pt-5">
          <img src=${pet.image} class="rounded-xl" alt="Shoes" />
        </figure>
        <div class="card-body">
        <h2 class="card-title text-3xl font-bold">${pet.pet_name}</h2>
        <p class="text-slate-500">Breed: ${pet.breed}</p>
        <p class="text-slate-500">Birth: ${pet.date_of_birth}</p>
        <p class="text-slate-500">Gender: ${pet.gender}</p>
        <p class="text-slate-500 mb-2">Price: ${pet.price}$</p>
        <hr>
        <div class="card-actions flex justify-between mt-2">
        <button id="btn-like" class="border rounded-lg px-3 py-2 text-[#0E7A81]" onclick="addImage('${pet.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="border rounded-lg px-3 py-2 text-[#0E7A81]">Adopt</button>
        <button onclick="loadDetails('${pet.petId}')" class="border rounded-lg px-3 py-2 text-[#0E7A81]">Details</button>
        </div>
      </div>
      `;
        petContainer.append(card);
    });
};

const loadCategoryPets = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            displayPets(data.data);
        })
        .catch((error) => console.log(error));
};

const loadDetails = async (petId) => {
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);
  };

const displayDetails = (petData) => {
    console.log(petData);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML =
     `
    <div class="flex flex-col gap-2">
    <img class="rounded-xl" src=${petData.image} />
    <h2 class="card-title text-3xl font-bold">${petData.pet_name}</h2>
    <p class="text-slate-500">Breed: ${petData.breed}</p>
    <p class="text-slate-500">Birth: ${petData.date_of_birth}</p>
    <p class="text-slate-500">Gender: ${petData.gender}</p>
    <p class="text-slate-500">Price: ${petData.price}$</p>
    <p class="text-slate-500">Vaccinated Status: ${petData.vaccinated_status}</p>
    <hr>
    <p>Details information</p>
    <p class="text-slate-500">${petData.pet_details}</p>
    </div>
    `;
    document.getElementById("customModal").showModal();
  };

const addImage = (img) => {
    console.log(img);
    const LikeContainer = document.getElementById("likeBox")
    const ImgBox = document.createElement("div")
    ImgBox.classList = "p-5 rounded-xl"
    ImgBox.innerHTML=
    `
    <img class="rounded-xl w-full" src="${img}">
    `;
    LikeContainer.append(ImgBox)
}


loadCategories();
loadPets();