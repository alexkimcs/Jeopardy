/*
Sources Used:
API: https://jservice.io
https://www.youtube.com/watch?v=FN_ffvw_ksE
https://www.javascripttutorial.net/javascript-fetch-api/

*/

//fetch categories from API


class Game {
  constructor(e) {
    // this.getCategories = [17679, 25, 11743, 52, 7200];
    //store cateegories into seperate arrays

    //GET ELEMENTSS
    this.boardMain = e.querySelector(".board");
    this.modal = e.querySelector(".modal");
    this.modalContent = e.querySelector(".modal-page");
    this.questions = e.querySelector("#qna");
    this.form = e.querySelector(".form");


    this.categories = [];
    this.clues = {};
    //initiaslizes states
    this.current = null;

    // this.getCategories = ids.getCategories || [17679, 25, 11743, 52, 7200];
    this.getCategories = [17679, 25, 11743, 52, 7200];
  }

  //main function
  //this is where everything will be called
  main() {
    // console.log(event.target.dataset.cId)
    this.boardMain.addEventListener("click", (event) => {
    //   console.log(event.target.dataset.clue);

      if (event.target.dataset) {
        this.userAction(event);
      }
    });
    this.fetchCategories();
  }
  //fetch data from API by category
  fetchCategories() {
    const categories = this.getCategories.map((category_id) => {
      //asyn function method
      return new Promise((resolve, reject) => {
        fetch(`https://jservice.io/api/category?id=${category_id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            resolve(data);
            // console.log(data);
          });
      });
    });
    Promise.all(categories).then((data) => {
      //categories objects array
      /*
            [
                {
                    title:
                    clues:

                }
            ]
            */

      //loop through results category
      data.forEach((cat, i) => {
        let categoryObj = {
          title: cat.title,
          clues: [], //array of clues
          //categories.clues
        };
        //console.log(cat.clues);
        // arry of clues into seprate array
        //limit to 5 clues
        let arr = cat.clues.splice(0, 5);
        console.log(arr);
        //loop through clues
        //ad id to clues
        //grab wuestion, answr, value
        arr.forEach((clu, j) => {
          let cId = i + ":" + j;
          categoryObj.clues.push(cId);
          this.clues[cId] = {
            answer: clu.answer,
            question: clu.question,
            value: clu.value,
          };
        });

        //seprate clues from category
        //spice() - bc we only need 5

        //push into object created
        console.log(categoryObj.clues[1]);
        this.categories.push(categoryObj);
      });
      //render each element using the objects we've saved
      this.categories.forEach((e) => {
        this.display(e);
      });
    });
  }
  //this functiion dynamically adds to dom elements
  //grabbind each specific data into each element/for functinalilty
  display(elements) {
    //render categories
    let column = document.createElement("div");
    column.classList.add("col");
    column.innerHTML = `<header>${elements.title}</header>
        <ul>
        </ul>`;
    //rednder clues
    var ul = column.querySelector("ul");
    elements.clues.forEach(cId => {
      var clue = this.clues[cId];
      ul.innerHTML += `<li><button data-clue-id=${cId}>${clue.value}</button></li>`
    });
    //  let ul = divs.querySelector("dl");
    //   elements.clues.forEach(cId => {
    //      let cls = this.clues[cId];
    //      ul.innerHTML += `<dt><button data-clue-id=${cId}>${cls.value}</button></dt>`
    //   })
    //adds to dom
    this.boardMain.appendChild(column);
  }
  userAction(event) {
    // alert("clicky");
    let getClue = this.clues[event.target.dataset.cId];
    this.currentClue = getClue;
    // this.questionElement.textContent = this.currentClue.question;
    // this.answerElement.textContent = this.currentClue.answer;
    
    event.target.classList.add("clicked");
    this.modalContent.classList.add("visible");
    // this.userInput.focus();


  }
//   formSubmit(){

//   }
}

//new instance of game
const trivia = new Game(document.querySelector(".main"));
trivia.main();
