//Elements

//fetch categories from API
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
    })
}