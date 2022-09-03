
const loadCategory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
//-----------------------------------------------category data shows from here------------------------------
const displayCategory = category =>{
    for(const value of category){
        const categoryId = document.getElementById('categoryList');
        const li = document.createElement('li');
        li.setAttribute('onClick',`showData('${value.category_id}','${value.category_name}')`);
        li.innerText = `${value.category_name}`;
        categoryId.appendChild(li);
        
    }
}



//--------------------------------------------news data load from here-----------------------------------------
const showData = async(value,catName) =>{
    const spinner = document.getElementById('spinner');//spinner start
    spinner.style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/category/${value}`;
    const res = await fetch(url);
    const data = await res.json();
    const allNews = data.data;
    allNews.sort((a, b) => b.total_view - a.total_view); // shorting the news by view
    const displayNews = document.getElementById('news-display');
    displayNews.innerHTML = '';
    for(const news of allNews){
        const cardDiv = document.createElement('div');//card created from here
        cardDiv.classList.add('mb-2','p-0','col-12','col-sm-12','col-md-6','col-lg-6');
        cardDiv.setAttribute ('onClick',`modalData('${news._id}')`);
        cardDiv.setAttribute('style','max-width: 560px;');
        cardDiv.setAttribute ('data-bs-toggle','modal');
        cardDiv.setAttribute ('data-bs-target','#exampleModal');
        cardDiv.innerHTML = `
        <div class="pointer row border rounded m-0 p-2">
            <div class="col-3 ps-0">
                <img src="${news.thumbnail_url? news.thumbnail_url:'image not found'}" class="img-fluid rounded-start" alt="This is an image">
            </div>
         <div class="col-9 pe-2 ps-0 d-grid align-items-center justify-content-center">
                <div>
                    <h5 class="">${news.title.length > 30? `${news.title.slice(0,30)} ....` : news.title}</h5>
                    <p class="">${news.details.length > 70? `${news.details.slice(0,100)} ......` : news.details}</p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <p class="d-flex">
                        <span><img src="${news.author.img? news.author.img: 'image not found'}" style="width:40px; height:40px; border-radius:50%;"></span>
                        <span class="d-flex flex-column">
                        <span>${news.author.name? news.author.name : "Author not found"}</span>
                        <span>${news.author.published_date? news.author.published_date : "publishing date not found"}</span>
                        </span>
                    </p>
                    <p class="d-flex gap-1">
                        <span><i class="fa-regular fa-eye"></i></span>
                        <span>${news.total_view? news.total_view : 'No data found'}</span>
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

    ///------------------------------news count start----------------------------
    const newsCountField = document.getElementById('newsCount');
    const footer = document.getElementById('footer');
    if(allNews.length <= 0){
        newsCountField.value = `No data found for ${catName}`;
        footer.style.display = 'none';

    }
    else{
        newsCountField.value = `${allNews.length} news found for ${catName} `;
        footer.style.display = 'flex';
    }
    spinner.style.display = 'none';//spinner stop here

    
}
//--------------------------------modal data load from here-----------------------
const modalData = async(newsId) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const res = await fetch(url);
    const data = await res.json();
    const newsData = data.data[0];
    const modalImage = document.getElementById('modal-image');
    modalImage.innerHTML = `
        <img src="${newsData.image_url? newsData.image_url: 'image not found'}"class="img-fluid">
    `;
    const modalText = document.getElementById('modal-text');
    const createP = document.createElement('p');
    createP.innerText = `${newsData.details}`;
    modalText.appendChild(createP);


    const publishDate = document.getElementById('publishDate');
    publishDate.innerText = `${newsData.author.published_date? newsData.author.published_date : 'publishing date not found'}`;

    const badge = document.getElementById('badge');
    badge.innerText = `${newsData.rating.badge? newsData.rating.badge: 'Badge not found'}`;


    const author = document.getElementById('author');
    author.innerHTML = `
        <img src="${newsData.author.img? newsData.author.img: 'image not found'}" style="width:40px; height:40px; border-radius:50%;">
        <p class="mb-0">${newsData.author.name? newsData.author.name: 'author not found'}</p>
    `;
    
}

loadCategory();
//-------------------------------------------------------------end---------------------------------