class Countries {
  constructor() {
    this.#bindEvents();
    this.modeBtn = document.querySelector(".header__mode");
    this.header = document.querySelector("header");
    this.main = document.querySelector("main");
    this.searchBtn = document.querySelector(".countries__search");
    this.countriesBtn = document.querySelector(".countries__filter-btn");
    this.countriesList = document.querySelector(".countries__filter-div");
    this.headerText=document.querySelector(".header__text");
    this.headerMode=document.querySelector(".header__mode");
    this.regions=document.querySelectorAll(".countries__filter-regions");
    this.items=document.querySelectorAll(".countries__filter-item");
    this.chevron=document.querySelector(".countries__svg");
    this.names=document.querySelectorAll(".countries__country-name");
    this.searchIcon=document.querySelector(".countries__search-icon");
    this.countriesWrapper=document.querySelector(".countries__dark");
    this.countryWrapper=document.querySelectorAll(".countries__country-wrapper");
    this.data = [];
  }

  getAllCountries() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        this.showAllCountries(data);
        this.data.push(...data);
      });
  }

  showAllCountries(data) {
    data = this.populationView(data);
    let ractive = Ractive({
      target: ".countries__list",
      template: "#countriesTemplate",
      data: {
        country: data,
      },
    });
  }

  populationView(countries) {
    countries.forEach((elem) => {
      elem.population = elem.population.toLocaleString();
    });
    return countries;
  }

  toggleMode(e) {
    if (e.target.closest(".header__mode")) {
      let state=localStorage.getItem("mode");
      if(state==="dark"){
        localStorage.setItem("mode","light");
        this.header.classList.add("header__light")
        this.headerText.classList.add("header__text--light");
        this.headerMode.classList.add("header__mode--light");
        this.countriesBtn.classList.add("countries__filter-btn--light")
        this.countriesList.classList.add("countries__filter-div--light")
        this.chevron.classList.add("countries__svg--light");
        this.searchIcon.classList.add("countries__search-icon--light")
        this.items.forEach((item)=>{
          item.classList.add("countries__filter-item--light")
        })
        this.regions.forEach((region)=>{
          region.classList.add("countries__filter-regions--light");
        })
        this.searchBtn.classList.add("countries__search--light")
        this.countriesWrapper.classList.add("countries__light");
        this.countriesWrapper.classList.remove("countries__dark");
        this.#lightCards();
      }else if(state==="light"){
        localStorage.setItem("mode","dark");
        this.header.classList.remove("header__light")
        this.headerText.classList.remove("header__text--light");
        this.headerMode.classList.remove("header__mode--light");
        this.countriesBtn.classList.remove("countries__filter-btn--light")
        this.countriesList.classList.remove("countries__filter-div--light")
        this.chevron.classList.remove("countries__svg--light");
        this.searchIcon.classList.remove("countries__search-icon--light")
        this.items.forEach((item)=>{
          item.classList.remove("countries__filter-item--light")
        })
        this.regions.forEach((region)=>{
          region.classList.remove("countries__filter-regions--light");
        })
        this.searchBtn.classList.remove("countries__search--light")
        this.countriesWrapper.classList.remove("countries__light");
        this.countriesWrapper.classList.add("countries__dark");
        this.countryWrapper.forEach((wrapper)=>{
          wrapper.classList.remove("countries__country-wrapper--light");
        })
        document.querySelectorAll(".countries__country-wrapper").forEach((elem)=>{
          elem.classList.remove("countries__country-wrapper--light")
        });
        this.#darkCards();
      }
    }
  }

  #lightCards(){
      document.querySelectorAll(".countries__country-wrapper").forEach((elem)=>{
        elem.classList.add("countries__country-wrapper--light")
        let name=elem.lastElementChild.firstElementChild;
        name.classList.add("countries__country-name--light");
        name.nextElementSibling.classList.add("countries__country-item--light");
        name.nextElementSibling.lastElementChild.classList.add("countries__country-text--light");
        name.nextElementSibling.nextElementSibling.classList.add("countries__country-item--light");
        name.nextElementSibling.nextElementSibling.lastElementChild.classList.add("countries__country-text--light");
        name.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("countries__country-item--light");
        name.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.add("countries__country-text--light");
      });
  }

  #darkCards(){
    document.querySelectorAll(".countries__country-wrapper").forEach((elem)=>{
      elem.classList.remove("countries__country-wrapper--light")
      let name=elem.lastElementChild.firstElementChild;
      name.classList.remove("countries__country-name--light");
      name.nextElementSibling.classList.remove("countries__country-item--light");
      name.nextElementSibling.lastElementChild.classList.remove("countries__country-text--light");
      name.nextElementSibling.nextElementSibling.classList.remove("countries__country-item--light");
      name.nextElementSibling.nextElementSibling.lastElementChild.classList.remove("countries__country-text--light");
      name.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("countries__country-item--light");
      name.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.classList.remove("countries__country-text--light");
    });
  }

  searchCountries(e) {
    let state=localStorage.getItem("mode");
    let value = e.target.value;
    let countries = this.data;
    countries = countries.filter(
      (elem) =>
        elem.name.toLowerCase().startsWith(value.toLowerCase()) ||
        elem.name.toLowerCase().includes(value.toLowerCase())
    );
    this.showAllCountries(countries);
    if(state=="dark"){
      this.#darkCards();
    }else if(state==="light"){
      this.#lightCards();
    }
  }

  filterByRegion(e) {
    let state=localStorage.getItem("mode");
    let region = e.target.dataset.region;
    let countries = this.data;
    countries = countries.filter((elem) => elem.region===region);
    this.showAllCountries(countries);
    if(state=="dark"){
      this.#darkCards();
    }else if(state==="light"){
      this.#lightCards();
    }
  }

  chooseCountry(e){
    let link=e.target.closest(".countries__country");
    let area=link.dataset.area;
    let specificCountry=this.data.filter((elem)=>elem.area===Number(area));
    localStorage.setItem("choosenCountry",JSON.stringify(specificCountry));
    localStorage.setItem("allCountries",JSON.stringify(this.data));
  }

  #bindEvents() {
    window.addEventListener("load", this.getAllCountries.bind(this));
    document.body.addEventListener("click", this.toggleMode.bind(this));
    document.querySelector(".countries__search").addEventListener("input", this.searchCountries.bind(this));
    document.querySelector(".countries__filter-div").addEventListener("click", this.filterByRegion.bind(this));
    document.body.addEventListener("click",this.chooseCountry.bind(this));
  }
}

new Countries();
