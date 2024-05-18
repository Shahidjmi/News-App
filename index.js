const apiKey = '661304027fd447deb5955f6b8875292c'

const blogContainner = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
async function getRandomNews(){
    try{
         const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response= await fetch(apiUrl);
        const data = await response.json();
        return data.articles
    }
    catch(error){
        console.log("Couldn't get random news", error);
        return []
    }
}
searchButton.addEventListener('click', async()=>{
    const query = searchField.value.trim();
if(query !==""){
    try {
        const articles =await fetchNewsQuery(query);
        displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching news by query", error);
    }
}
})
async function fetchNewsQuery(query) {
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
       const response= await fetch(apiUrl);
       const data = await response.json();
       return data.articles
   }
   catch(error){
       console.log("Couldn't get random news", error);
       return []
   }
}

 function displayBlogs(articles){
    blogContainner.innerHTML = ''
    articles.forEach((article) => {
        const blogCard = document.createElement('div')
        blogCard.classList.add('blog-card');
        const img = document.createElement('img')
        img.src = article.urlToImage; // urlToImage is a property of the api documentation object
        img.alt = article.title;
        const title = document.createElement('h3')
       const truncatedTitle = article.title.length > 30
        ? article.title.slice(0,30) + '...'
         : article.title
         title.textContent = truncatedTitle;
        const description = document.createElement('p');

        const truncatedDes = article.title.length > 120
        ? article.description.slice(0,30) + '....'
         : article.description
         description.textContent = truncatedDes;
        

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url,"_blank") = article.url;
        })
        blogContainner.appendChild(blogCard);
   
 })

 }
(async ()=> { 
    try {
         const articles = await getRandomNews();
         displayBlogs(articles)
    } catch (error) {
        console.log("couldn't get random news", error)
    }
})();