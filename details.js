class DetailCountry{
    constructor(){
        this.#bindEvents();
        this.countries=JSON.parse(localStorage.getItem("allCountries"));
        this.header = document.querySelector("header");
        this.main = document.querySelector("main");
        this.searchBtn = document.querySelector(".countries__search");
        this.backBtn = document.querySelector(".countries__back-btn");
        this.headerText=document.querySelector(".header__text");
        this.headerMode=document.querySelector(".header__mode");
        this.svg=document.querySelector(".countries__back-svg");
        this.countriesWrapper=document.querySelector(".countries__dark");
        this.countryWrapper=document.querySelectorAll(".countries__country-wrapper");
    }

    loadSpecificCountry(e){
        let state=localStorage.getItem("mode");
        console.log(state);
        this.showSpecificCountry();
        if(state=="dark"){
            this.header.classList.remove("header__light")
            this.headerText.classList.remove("header__text--light");
            this.headerMode.classList.remove("header__mode--light");
            this.backBtn.classList.remove("countries__back-btn--light")
            this.svg.classList.remove("countries__svg--light");
            this.countriesWrapper.classList.remove("countries__light");
            this.countriesWrapper.classList.add("countries__dark");
            document.querySelectorAll(".countries__border-link").forEach((elem)=>{
                elem.classList.remove("countries__border-link--light");
            })                       
            this.#darkCards();
          }else if(state==="light"){
            this.header.classList.add("header__light")
            this.headerText.classList.add("header__text--light");
            this.headerMode.classList.add("header__mode--light");
            this.backBtn.classList.add("countries__back-btn--light")
            this.svg.classList.add("countries__svg--light");
            this.countriesWrapper.classList.add("countries__light");
            this.countriesWrapper.classList.remove("countries__dark");
            document.querySelectorAll(".countries__border-link").forEach((elem)=>{
                elem.classList.add("countries__border-link--light");
            })
            this.#lightCards();
          }
    }

    #lightCards(){
        if(document.querySelector(".countries__border-text") && document.querySelector(".countries__country-name")){
            console.log(true);
            let elem=document.querySelector(".countries__border-text");
            elem.classList.add("countries__border-text--light")
            document.querySelector(".countries__country-name").classList.add("countries__country-name--light");
        };     
        document.querySelectorAll(".countries__country-item").forEach((elem)=>{
            elem.classList.add("countries__country-item--light")
          });
          document.querySelectorAll(".countries__country-text").forEach((elem)=>{
            elem.classList.add("countries__country-text--light")
          });
      }
    
      #darkCards(){
        if(document.querySelector(".countries__border-text") && document.querySelector(".countries__country-name")){
            let elem=document.querySelector(".countries__border-text");
            elem.classList.remove("countries__border-text--light");
            document.querySelector(".countries__country-name").classList.remove("countries__country-name--light");
        };
        document.querySelectorAll(".countries__country-item").forEach((elem)=>{
            elem.classList.remove("countries__country-item--light")
          });
        document.querySelectorAll(".countries__country-text").forEach((elem)=>{
            elem.classList.remove("countries__country-text--light")
          });
      }

      toggleMode(e) {
        if (e.target.closest(".header__mode")) {
          let state=localStorage.getItem("mode");
          if(state==="dark"){
            localStorage.setItem("mode","light");
            this.header.classList.add("header__light")
            this.headerText.classList.add("header__text--light");
            this.headerMode.classList.add("header__mode--light");
            this.backBtn.classList.add("countries__back-btn--light")
            this.svg.classList.add("countries__svg--light");
            this.countriesWrapper.classList.add("countries__light");
            this.countriesWrapper.classList.remove("countries__dark");
            document.querySelectorAll(".countries__border-link").forEach((elem)=>{
                elem.classList.add("countries__border-link--light");
            })
            this.#lightCards();
          }else if(state==="light"){
            localStorage.setItem("mode","dark");
            this.header.classList.remove("header__light")
            this.headerText.classList.remove("header__text--light");
            this.headerMode.classList.remove("header__mode--light");
            this.backBtn.classList.remove("countries__back-btn--light")
            this.svg.classList.remove("countries__svg--light");
            this.countriesWrapper.classList.remove("countries__light");
            this.countriesWrapper.classList.add("countries__dark");
            document.querySelectorAll(".countries__border-link").forEach((elem)=>{
                elem.classList.remove("countries__border-link--light");
            })
            this.#darkCards();
          }
        }
      }

    showSpecificCountry(){
        let country=JSON.parse(localStorage.getItem("choosenCountry"));
        console.log(country);
        let ractive=new Ractive({
            target:".countries__country-information",
            template:"#countryTemplate",
            data:{
                country:country
            }
        })
        this.getOtherElements(country);
    }

    separateInfo(currencies,languages){
            let currencyArr=[];
            currencies.forEach((currency)=>{
                currencyArr.push(currency.name);
            })
            let currencyJoined=currencyArr.join(", ");
            let languagesArr=[];
            languages.forEach((language)=>{
                languagesArr.push(language.name);
            })
            let languageJoined=languagesArr.join(", ");
            return [[currencyJoined],[languageJoined]];
    }

    getOtherElements(data){
        if(document.querySelector(".countries__currency-list") && document.querySelector(".countries__language-list")){
            let currency=data[0].currencies;
            let language=data[0].languages;
            let joined=this.separateInfo(currency,language);
            console.log(joined);
            let ractive=new Ractive({
                target:".countries__currency-list",
                template:"#currencyTemplate",
                data:{
                    currency:joined[0]
                }
            })
            let ractive2=new Ractive({
                target:".countries__language-list",
                template:"#languageTemplate",
                data:{
                    language:joined[1]
                }
            })
           let borders=this.getBorderCountries(data);
           new Ractive({
            target:".countries__border-list",
            template:"#borderTemplate",
            data:{
                border:borders
            }
           })
        }
    }

    getBorderCountries(borderCountries){
        let borderCountriesSlogans=borderCountries[0].borders;
        let borderCountriesArray=[];
        borderCountriesSlogans.forEach(country => {
            let countryElem=this.countries.filter((elem)=>elem.alpha3Code===country);
            borderCountriesArray.push(...countryElem);
        });
        return borderCountriesArray;
    }


    loadBorderCountry(e){
        if(e.target.closest(".countries__border-link")){
            let country=e.target.closest(".countries__border-link").dataset.name;
            let founded=this.countries.filter((elem)=>elem.name===country);
            console.log(founded);
            localStorage.setItem("choosenCountry",JSON.stringify(founded));
        }
    }

    #bindEvents(){
        window.addEventListener("load",this.loadSpecificCountry.bind(this));
        document.body.addEventListener("click",this.loadBorderCountry.bind(this));
        document.body.addEventListener("click", this.toggleMode.bind(this));
    }

}

new DetailCountry();