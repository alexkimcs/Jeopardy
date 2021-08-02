
/*
Sources Used:
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
    constructor(e, ids = {}) {
        
        this.getCategories = ids.getCategories || [17679, 25, 11743, 52, 7200];
        this.getCategories = [17679, 25, 11743, 52, 7200];
        //store cateegories into seperate arrays
        this.categories = [];

        this.clues = {};
        //initiaslizes states
        this.current = null;
         //GET ELEMENTS
        this.board = e.querySelector(".board");
        this.modal = e.querySelector(".modal");

    }

    //main function
    //this is where everything will be called
    main(){
        this.fetchCategories();
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
             data.forEach((catetgories, i) => {
                 let categoryObj = {
                     title: catetgories.title,
                     clues: [] //array of clues
                 }
                
                console.log(this);
                
                
                 
             })
        })
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
} 


//new instance of game
const trivia = new Game(document.querySelector('.main'), {

})
trivia.main();


// main(){

// }
// fetchCatagories(){
//     let categories = this.getCategories.map(categoryid => {
//     //asyn function method
//     return new Promise((resolve, reject) => {
//         fetch(`https://jservice.io/api/category?id=${category_id}`)
//         .then(res => res.json())
//         .then(data => {
//             resolve(data);
//             console.log(data);
//         })
//         })
//     });
//     Promise.all(categories).then(reults => {

//         //loop through results category
         
//     })
// }