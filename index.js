
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
        li.setAttribute('onClick',`showData('${value.category_id}')`);
        li.innerText = `${value.category_name}`;
        categoryId.appendChild(li);
    }
}


const showData = async(value) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${value}`;
    const res = await fetch(url);
    const data = await res.json();
    const newsEs = data.data;
    console.log(newsEs);
    for(const news of newsEs){
        console.log(news);
        const displayNews = document.getElementById('news-display');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card','mb-2');
        cardDiv.innerHTML = `
            <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="This is an image">
            </div>
            <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details}</p>
                
            </div>
            </div>
        </div>
        `;
        displayNews.appendChild(cardDiv);
    }

}
loadCategory();