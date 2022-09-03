
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
        li.setAttribute('onClick',`showData('${value.category_id}','${value.category_name}')`);
        li.innerText = `${value.category_name}`;
        categoryId.appendChild(li);
        
    }
   
}




const showData = async(value,catName) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${value}`;
    const res = await fetch(url);
    const data = await res.json();
    const newsEs = data.data;
    console.log(newsEs.length);
    const displayNews = document.getElementById('news-display');
    displayNews.innerHTML = '';
    for(const news of newsEs){
        console.log(news);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('mb-2','p-0','col-6');
        cardDiv.setAttribute('style','max-width: 560px;')
        cardDiv.innerHTML = `
        <div class="row border rounded m-0 p-2">
            <div class="col-3 ps-0">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="This is an image">
            </div>
         <div class="col-9 pe-2 ps-0 d-grid align-items-center justify-content-center">
                <div>
                    <h5 class="">${news.title.length > 30? `${news.title.slice(0,30)} ....` : news.details}</h5>
                    <p class="">${news.details.length > 70? `${news.details.slice(0,100)} ......` : news.details}</p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <p class="d-flex flex-column">
                        <span>${news.author.name}</span>
                        <span>${news.author.published_date}</span>
                    </p>
                    <p class="d-flex gap-1">
                        <span><i class="fa-regular fa-eye"></i></span>
                        <span>${news.total_view}</span>
                    </p>
                    <p class="d-flex gap-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                    </p>
                </div>
         </div>
        </div>
        `;
        displayNews.appendChild(cardDiv);
    }
    const newsCountField = document.getElementById('newsCount');
    if(newsEs.length <= 0){
        newsCountField.value = `No data found for ${catName}`;
    }
    else{
        newsCountField.value = `${newsEs.length} items found for ${catName} `;
    }

}
loadCategory();
