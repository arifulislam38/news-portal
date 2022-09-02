// categoryList

const loadCategory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = category =>{
    for(const value of category){
        console.log(value.category_name);
        const categoryId = document.getElementById('categoryList');
        const li = document.createElement('li');
        li.innerText = `${value.category_name}`;
        categoryId.appendChild(li);
    }
}
loadCategory();