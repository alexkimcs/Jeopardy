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
    this.askQuestion = e.querySelector("#qna");
    this.form = e.querySelector("form");
    this.formText = e.querySelector("#ans");
    this.ansText = e.querySelector("#answer-text");
    this.getInput = e.querySelector("input[name=inputText");
    this.scoreText = e.querySelector(".counter");

    this.categories = [];
    this.clues = {};
    //initiaslizes states
    this.chosen = null;
    this.getCategories = [17679, 25, 11743, 52, 7200];
    this.count = 0;
  }

  //main function
  //this is where everything will be called
  main() {
    // console.log(event.target.dataset.cId)
    // this.fetchCategories();
    this.boardMain.addEventListener("click", (e) => {
      //   console.log(e.target.dataset.c_id);
      //   console.log(e.target.getAttribute('data-clue-id'))
      //   let getClues = this.clues[e.target.dataset.c_id];
      if (e.target.getAttribute("data-clue-id")) {
        // console.log(event.target.dataset.c_id);
        this.userAction(e);
      }
    });

    this.form.addEventListener("submit", (e) => {
      this.userInput(e);
    });
    let s = 0;
    this.scoreCount(0);
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
        // console.log(arr);

        //loop through clues
        //ad id to clues
        //grab wuestion, answr, value
        arr.forEach((clu, j) => {
          let c_id = i + "_" + j;
          categoryObj.clues.push(c_id);
          this.clues[c_id] = {
            answer: clu.answer,
            question: clu.question,
            value: clu.value,
          };
        });

        //seprate clues from category
        //spice() - bc we only need 5

        //push into object created
        console.log(categoryObj.clues[1]);
        // console.log(categoryObj.clues[])
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
  display(categoryObj) {
    //render categories
    let render = document.createElement("div");
    render.classList.add("col");
    render.innerHTML = `<header>${categoryObj.title}</header>
        <ul>
        </ul>`;
    //rednder clues
    let ul = render.querySelector("ul");
    categoryObj.clues.forEach((c_id) => {
      let forClue = this.clues[c_id];
      console.log(this.clues[c_id]);
      ul.innerHTML += `<li><button data-clue-id=${c_id}>${forClue.value}</button></li>`;
    });

    //adds to dom
    this.boardMain.appendChild(render);
  }

  scoreCount(val) {
    this.count = +val;
    this.scoreText.textContent = this.count;
  }

  userInput(e, input = "") {
    e.preventDefault();
    // return input.toLowerCase();
    // let lower = input.toLowerCase();
    let check =
      this.toLower(this.getInput.value) === this.toLower(this.chosen.answer);
    if (check) {
      this.scoreCount(this.chosen.value);
    }
    // this.getAnswer(check);
    // return input.toLowerCase();
  }
  toLower(input = "") {
    let lower = input.toLowerCase();
    return lower;
  }
  // getAnswer(check) {
  //   // this.ansText.style.display = check;
  //   // this.modal.classList.add("result");
  //   check
  // }
  userAction(e) {
    // alert("clicky");
    let getClues = this.clues[e.target.getAttribute("data-clue-id")];
    console.log("hello");
    e.target.classList.add("clicked");
    this.chosen = getClues;

    this.askQuestion.textContent = this.chosen.question;
    this.ansText = this.chosen.answer;

    // event.target.classList.add("clicked");
    this.modalContent.classList.add("visible");
    // this.userInput.focus();
  }
}

//new instance of game
const trivia = new Game(document.querySelector(".main"));
trivia.main();

// class Game {
//    }
//    userAction(e) {
//      // alert("clicky");
// -    let getClues = this.clues[e.target.dataset.cId];
// +    let getClues = this.clues[e.target.getAttribute('data-clue-id')];

//      e.target.classList.add("clicked");
//      this.chosen = getClues;
