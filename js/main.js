
// side bar
function closeSideBar(){
    sideMenu.animate({ width: '250px' }, 500);
            sideMenu.addClass("open");
            $("#menu-btn i").removeClass("fa-solid fa-bars").addClass("fa-solid fa-xmark");
            $("#mySideMenu ul").removeClass("d-none")
            $("#mySideMenu .textNave").removeClass("d-none")
            for (let i = 0; i < 0; i++) {
                $('.pages').eq(i).animate({ top: 0 }, (i + 5) * 100)
            }
}
$(document).ready(function () {
    $("#menu-btn").click(function () {
        var sideMenu = $("#mySideMenu");
        if (sideMenu.hasClass("open")) {
            sideMenu.animate({ width: '0px' }, 500);
            sideMenu.removeClass("open");
            $("#menu-btn i").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");
            $("#mySideMenu ul").addClass("d-none");
            $("#mySideMenu .textNave").addClass("d-none");

        } else {
            sideMenu.animate({ width: '250px' }, 500);
            sideMenu.addClass("open");
            $("#menu-btn i").removeClass("fa-solid fa-bars").addClass("fa-solid fa-xmark");
            $("#mySideMenu ul").removeClass("d-none")
            $("#mySideMenu .textNave").removeClass("d-none")
            for (let i = 0; i < 0; i++) {
                $('.pages').eq(i).animate({ top: 0 }, (i + 5) * 100)
            }
        }
    });
});

// get meals for ui

async function getMeals(term) {
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        const res = await url.json();
        allmeals = res.meals;
        displayui(allmeals);
        loadPage.classList.add('d-none')
        console.log(allmeals);

        detalis()
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}
getMeals('')
let dataMeals = document.querySelector("#dataMeals");
let searchPage = document.querySelector("#searchPage");
function displayui(arr) {
    var box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += ` <div class="meals col-md-3  pt-3 overflow-hidden ">
                    <div onclick="getDetalis('${arr[i].idMeal}')" class="box position-relative  ">
                        <div class="mealBox rounded-3 overflow-hidden">
                            <img  src="${arr[i].strMealThumb}" alt="">
                        </div>
                        <div class="layer position-absolute w-100 h-100 d-flex align-items-center rounded-3 px-3 overflow-hidden ">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>`;
    }
    dataMeals.innerHTML = box;
}
getMeals();
async function getCats() {
    searchPage.innerHTML = '';
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const urlCat = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const resCats = await urlCat.json();
        allcats = resCats.categories;
        displayCat();
        loadPage.classList.add('d-none')

        console.log(allcats);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

let catContent = document.querySelector("#catContent");

function displayCat() {
    let box = '';
    for (let i = 0; i < allcats.length; i++) {
        box += `
            <div class="meals col-md-3 pt-3 overflow-hidden">
                <div onclick="getMealByCat('${allcats[i].strCategory}')" class="box position-relative">
                    <div class="mealBox rounded-3 overflow-hidden">
                        <img src="${allcats[i].strCategoryThumb}" alt="">
                    </div>
                    <div class="layer position-absolute w-100 h-100 d-flex align-items-center flex-column rounded-3 px-3 overflow-hidden text-center">
                        <h2 class="pt-5">${allcats[i].strCategory}</h2>
                        <p>${allcats[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}.</p>
                    </div>
                </div>
            </div>`;
    }
    dataMeals.innerHTML = box;
}

async function getMealByCat(cat) {

    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    response = await url.json()
    console.log(response.meals);
    displayui(response.meals)
}


async function getareas() {
    searchPage.innerHTML = '';
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const urlarae = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const resarea = await urlarae.json();
        getarea = resarea.meals;
        displayAreas();
        loadPage.classList.add('d-none')
        console.log(getarea);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
let showareas = document.querySelector("#showareas");

function displayAreas() {
    var box = ``
    for (let i = 0; i < getarea.length; i++) {
        box += `<div onclick="getMealByArea('${getarea[i].strArea}')" class="pointer  area col-md-3 d-flex flex-column justify-content-center align-items-center ">
                    <img class="w-25 m-auto" src="../imgs/vecteezy_3d-home-icon_21948181.png" alt="">
                    <h2 class="  text-white">${getarea[i].strArea}</h2>
                </div>`
    }
    dataMeals.innerHTML = box
}

async function getMealByArea(area) {
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await url.json()
    console.log(response.meals);
    displayui(response.meals)
}
// _____________________________________________________________

let ingArr = [];

async function geting() {
    searchPage.innerHTML = '';
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const urling = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const resIng = await urling.json();
        ingArr = resIng.meals.slice(0, 25);
        displayIng();
        loadPage.classList.add('d-none')
        console.log(ingArr);
    } catch (error) {
        console.error('Error fetching Ingredients:', error);
    }
}

let IngredientsShow = document.querySelector("#IngredientsShow");

function displayIng() {
    let box = '';
    for (let i = 0; i < ingArr.length; i++) {
        box += `<div onclick="getMealByArea('${getarea[i].strArea}')" class="col-md-3 text-white d-flex flex-column justify-content-center align-items-center pt-3 pointer">
                    <i class="fa-solid  fa-2xl fa-drumstick-bite"></i>
                    <h2 class="py-2"> ${ingArr[i].strIngredient}</h2>
                    <p class="text-center">${ingArr[i].strDescription?.split(" ").slice(0, 10).join(" ")}</p>
                </div>
            `;
    }
    dataMeals.innerHTML = box;
}
// 
async function getMealBying(ing) {
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    response = await url.json()
    console.log(response.meals);
    displayui(response.meals)
}
// _______________________________________________________________________________________________________________
// detalis for meal ---->

async function getDetalis(id) {
    searchPage.innerHTML = '';
    const urlDet = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const resDet = await urlDet.json();
    DetalisMeal = resDet.meals
    console.log(DetalisMeal)
    displayDetalis(DetalisMeal[0])
}

let detrow = document.querySelector("#DetailsTab")
function displayDetalis(DetalisMeal) {
    let Ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (DetalisMeal[`strIngredient${i}`]) {
            Ingredients += `<span>  ${DetalisMeal[`strMeasure${i}`]} ${DetalisMeal[`strIngredient${i}`]}</span> `
        }
    }
    console.log(Ingredients);


    var boxdet = `<div class="col-4 pt-5">
                    <img class=" rounded-3 " src="${DetalisMeal.strMealThumb}" alt=""> <br>
                    <h2 class="text-white">${DetalisMeal.strMeal}</h2>
                </div>
                <div class="col-8 text-white pt-5">
                    <h2>Instructions</h2>
                    <p>${DetalisMeal.strInstructions}</p>
                    <p class="fs-3">Area : <span>${DetalisMeal.strArea}</span></p>
                    <p class="fs-3">Category : <span>${DetalisMeal.strCategory}</span></p>
                    <p class="fs-3">Recipes : <span></span></p>
                    <div class="spans">
                        ${Ingredients}
                        
                    </div>
                    <h3 class="pb-3">Tags :${DetalisMeal?.strTags ? DetalisMeal?.strTags : ''}</h3>
                    <button onclick="window.location.href = 'https://routeegy.github.io/YummyExam/';" class="btn btn-success py-2">source</button> <button
                        onclick="window.location.href = '${DetalisMeal.strYoutube}';" class="btn btn-danger py-2">youtube</button>
                </div>`
    dataMeals.innerHTML = boxdet
}


function showSearch() {
    searchPage.innerHTML = ` <div class="row  m-auto ">
                <div class="row py-5 d-flex justify-content-around">
                    <div class="col-md-5">
                        <input  onkeyup="searchMeals(this.value)"  id="mealSearch" class="form-control input-lg mb-2" type="text"
                            placeholder="Search By Name">
                    </div>
                    <div class="col-md-5">
                        <input onkeyup="searchByChar(this.value)" maxlength="1" id="charSearch" class="form-control input-lg mb-2" type="text"
                            placeholder="Search By First Letter">
                    </div>
                </div>
            </div>`
    dataMeals.innerHTML = ''
}

async function searchMeals(term) {
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        const res = await url.json();
        allmeals = res.meals;
        allmeals ? displayui(allmeals) : displayui([])
        loadPage.classList.add('d-none')
        console.log(allmeals);

        detalis()
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}
async function searchByChar(term) {
    try {
        let loadPage = document.querySelector(".loading")
        loadPage.classList.remove('d-none')
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        const res = await url.json();
        allmeals = res.meals;
        allmeals ? displayui(allmeals) : displayui([])
        loadPage.classList.add('d-none')
        console.log(allmeals);

        detalis()
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}
function showContacts() {
    dataMeals.innerHTML = `<div class="row vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <input onfocus="validone()" id="name" class="form-control input-lg my-3" type="text" placeholder="Enter Your Name">
                    <div
                        class="d-none validName valid rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50">
                        Special characters and numbers not allowed</div>
                    <input onfocus="validtwo()" id="number" class="form-control input-lg my-3" type="text" placeholder="Enter Your Phone">
                    <div
                        class="d-none validNumber valid rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50">
                        Enter valid Phone Number</div>
                    <input onfocus="validthree()" id="pass" class="form-control input-lg my-3" type="password"
                        placeholder="Enter Your Password">
                    <div
                        class=" d-none validPass valid rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50 ">
                        Password must be at least 8 characters, include uppercase and lowercase letters, a number, and optionally special characters.
</div>
                </div>
                <div class="col-md-6">
                    <input onfocus="validateEmail()" id="email" class="form-control input-lg my-3" type="text" placeholder="Enter Your E-Mail">
                    <div
                        class=" d-none valid validEmail rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50">
                        Email not valid *exemple@yyy.zzz</div>
                    <input maxlength="2" onfocus="validage()" id="age" class="form-control input-lg my-3" type="text" placeholder="Enter Your Age">
                    <div
                        class="d-none valid validage rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50">
                        Enter valid age</div>
                    <input onfocus="validRePass()" id="repass" class="form-control input-lg my-3" type="password" placeholder="Repassword">
                    <div
                        class="validRepass valid rounded-3 w-100 d-flex justify-content-center align-items-center text-black-50 d-none">
                        Enter valid repassword</div>
                </div>
                <button id="sub" class="btn btn-outline-light w-25 disabled">submit</button>
            </div>`
}
let isNameValid = false;
let isNumberValid = false;
let isPasswordValid = false;
let isEmailValid = false;
let isAgeValid = false;
let isRePassValid = false;

function validone() {
    const nameInput = document.getElementById('name');
    const validNameMessage = document.querySelector('.validName');

    nameInput.addEventListener('input', function () {
        const inputValue = this.value;
        isNameValid = /^[a-zA-Z]+$/.test(inputValue);
        validNameMessage.classList.toggle('d-none', isNameValid);
        updateSubmitButton();
    });
}

function validtwo() {
    const numberInput = document.getElementById('number');
    const validNumberMessage = document.querySelector('.validNumber');

    numberInput.addEventListener('input', function () {
        const inputValue = this.value;
        isNumberValid = /^0[1-9][0-9]{9}$/.test(inputValue);
        validNumberMessage.classList.toggle('d-none', isNumberValid);
        updateSubmitButton();
    });
}

function validthree() {
    const passInput = document.getElementById('pass');
    const validPassMessage = document.querySelector('.validPass');

    passInput.addEventListener('input', function () {
        const inputValue = this.value;
        isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(inputValue);
        validPassMessage.classList.toggle('d-none', isPasswordValid);
        updateSubmitButton();
    });
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const validEmailMsg = document.querySelector('.validEmail');

    emailInput.addEventListener('input', function () {
        const inputValue = this.value;
        isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue);
        validEmailMsg.classList.toggle('d-none', isEmailValid);
        updateSubmitButton();
    });
}

function validage() {
    const ageInput = document.getElementById('age');
    const validAgeMessage = document.querySelector('.validage');

    ageInput.addEventListener('input', function () {
        const inputValue = this.value;
        isAgeValid = /^\d+$/.test(inputValue);
        validAgeMessage.classList.toggle('d-none', isAgeValid);
        updateSubmitButton();
    });
}

function validRePass() {
    const passInput = document.getElementById('pass');
    const rePassInput = document.getElementById('repass');
    const validRePassMessage = document.querySelector('.validRepass');

    rePassInput.addEventListener('input', function () {
        const rePassValue = this.value;
        isRePassValid = rePassValue === passInput.value;
        validRePassMessage.classList.toggle('d-none', isRePassValid);
        updateSubmitButton();
    });
}

function updateSubmitButton() {
    const submitButton = document.querySelector('#sub');
    if (
        isNameValid &&
        isNumberValid &&
        isPasswordValid &&
        isEmailValid &&
        isAgeValid &&
        isRePassValid
    ) {
        submitButton.classList.remove('disabled');
    } else {
        submitButton.classList.add('disabled');
    }
}

function confirmValdate() {
    validone();
    validtwo();
    validthree();
    validateEmail();
    validage();
    validRePass();
}
confirmValdate();

