
/*
Sources Used:
API: https://jservice.io
https://www.youtube.com/watch?v=FN_ffvw_ksE
https://www.javascripttutorial.net/javascript-fetch-api/

*/

//fetch categories from API

//categories objects array
/*
[
    {
        title:
        clues:

    }
]
*/


class Game {
    constructor(e) {
        
        // this.getCategories = ids.getCategories || [17679, 25, 11743, 52, 7200];
        // this.getCategories = [17679, 25, 11743, 52, 7200];
        //store cateegories into seperate arrays
    
         //GET ELEMENTSS
        this.boardMain = e.querySelector(".board");
        this.modal = e.querySelector(".modal");

        this.categories = [];
        this.clues = {};
        //initiaslizes states
        this.current = null;

        // this.getCategories = ids.getCategories || [17679, 25, 11743, 52, 7200];
        this.getCategories = [17679, 25, 11743, 52, 7200];

    }

    //main function
    //this is where everything will be called
    main(){
        this.fetchCategories();

        this.boardE
    }
    //fetch data from API by category
    fetchCategories(){
        const categories = this.getCategories.map(category_id => {
        //asyn function method
        return new Promise((resolve, reject) => {
            fetch(`https://jservice.io/api/category?id=${category_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resolve(data);
                // console.log(data);
            })
            })
        });
        Promise.all(categories).then(data => {
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
                     clues: []//array of clues
                     //categories.clues
                 }
                 //console.log(cat.clues);
                 
                let arr = cat.clues.splice(0,5);
                console.log(arr);
                arr.forEach((clu, j) => {
                     let cId = i + "-" + j;
                     categoryObj.clues.push(cId);
                    this.clues[cId] = {
                        answer: clu.answer,
                        question: clu.question,
                        value: clu.value
                    }
                 })
                 
                 //seprate clues from category
                 //spice() - bc we only need 5 
 
                
                console.log(categoryObj.clues[1])
                this.categories.push(categoryObj);

             })
             this.categories.forEach(e => {
                this.display(e);
            })

        })
        

    }
    //this functiion dynamically adds to dom elements
    //grabbind each specific data into each element/for functinalilty
    display(elements){
        //render categories
        let divs = document.createElement("div");
        divs.classList.add("col");
        divs.innerHTML = (`<header>${elements.title}</header>
        <ul>
        </ul>`

        
     )
     //rednder clues
     let ul = divs.querySelector("ul");
      elements.clues.forEach(cId => {
         let cls = this.clues[cId];
         ul.innerHTML += `<li><button data-clue-id=${cId}>${cls.value}</button></li>`
      })
     //adds to dom
     this.boardMain.appendChild(divs);
    }
    
}
// function shuffle(a) {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// } 



//new instance of game
const trivia = new Game(document.querySelector('.main'))
trivia.main();

