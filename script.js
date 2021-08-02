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
        board = e.querySelector(".board");
        modal = e.querySelector(".modal");

    }


    main(){

    }
    fetchCatagories(){
        let categories = this.getCategories.map(categoryid => {
        //asyn function method
        return new Promise((resolve, reject) => {
            fetch(`https://jservice.io/api/category?id=${category_id}`)
            .then(res => res.json())
            .then(data => {
                resolve(data);
                console.log(data);
            })
            })
        });
        Promise.all(categories).then(reults => {
    
            //loop through results category
             
        })
    }
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