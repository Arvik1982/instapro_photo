import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
let userPostId ;
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts.map((i, index)=>{
    let likesAr =[] = i.likes
    let likesName =[];
    userPostId = i.user.id
    console.log(userPostId)
    for (let index = 0; index < likesAr.length; index++) {
      
     //console.log (likesAr[index].name) 
     likesName.push(` ${likesAr[index].name}`)
     console.log(likesName)
    }
    
    return `<div class="page-container">
                        <div class="header-container"></div>
                        <ul class="posts">
                        <li class="post">
                        <div class="post-header" data-user-id="${i.user.id}" data-index="${index}">
                        <img src="${i.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${i.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${i.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${i.id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${i.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${likesName}</span>
                        ${i.description}
                    </p>
                    <p class="post-date">
                      ${i.createdAt}
                    </p>
                  </li>
                  </ul>
                  </div>`
  })
    
  
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {

      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  
}
