//take btn
let search_btn = document.querySelector("#search-btn");
let search_input = document.querySelector("#search-input");
let body = document.querySelector("body");

//event for searching events
let q=""
search_btn.addEventListener("click", function (event) {
  q = document.querySelector("#search-input").value;
  searchFunc(q);
});
search_input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    q = document.querySelector("#search-input").value;
    searchFunc(q);
  }
});
window.onload = () => {
  searchFuncOnLoad();
};

//get serach data
let data=[]
let searchFunc = async (query) => {
  data = await getData(query);
  append(data);
};

let getData = async (query) =>{
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=AIzaSyAn8h71VOzmap8ve9kxoCHqKoE_T79ADD8`
    let res=await fetch(url)
    let data=await res.json()
    // console.log(data.items);
    // append(data.items)
    return data.items
}

let searchFuncOnLoad = async (query) => {
    data = await getData(query);
    append(data);
  };
  
  //Onload api fetch
  let getDataOnLoad = async () => {
    let data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&regionCode=IN&maxResults=50&key=AIzaSyAn8h71VOzmap8ve9kxoCHqKoE_T79ADD8`
    );
    let val = await data.json();
    return val.items;
  };

let append= (data) => {
    if(!data){
        return 
    }
    let container=document.querySelector("#container")
    container.innerHTML=""
    data.forEach(e => {
        // snippet ---> title
        // snippet ---> thumbnails ----> medium ----> url
        let img=document.createElement("img")
        img.src=e.snippet.thumbnails.medium.url;
        let h3=document.createElement("h3")
        h3.innerText=e.snippet.title;
        let div = document.createElement("div");
        div.onclick=()=>{
            saveVideo(e)
        }
        div.setAttribute("class", "video")
        div.append(img,h3)
        container.append(div)
    });
}

let saveVideo = (data) => {
    localStorage.setItem("video", JSON.stringify(data))
    window.location.href="video.html";
}

// let filter= async () =>{
//     let data=await getData(q)
//     console.log(data);
//     data =data.filter((e)=>{
//         return e.snippet.channelId==="UCvC4D8onUfXzvjTOM-dBfEA"
//     })
//     append(data)
// }