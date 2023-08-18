import { user } from "../index.js";
import { posts, goToPage } from "../index.js";
const personalKey = "prod";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
const imagePost = "https://wedev-api.sky.pro"

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

      <p class="post-text">Добавление нового поста</p>
     
      <div class="form-inputs">
                 
        <div class="upload-image-container"></div>

                  <input type="text" id="namePost-input" class="input" placeholder="Имя" />
                  <img scr=".img/photo-612x612.jpg" class="img-form" id="img-load" />
                  <button class="button-photo" id="post-button">Загрузить фото
                  </button>

                  <input type="text" id="textPost-input" class="input" placeholder="Введите комментарий к фото" />
                  
                  <div class="form-error"></div>

                  
              </div>

              
<div class="button-post">
      
      <button class="button" id="add-button">Добавить пост</button>
      <button class="button" id="back-button">Назад</button>

</div>
<label class="file-upload-label secondary-button">
                <input
                  id="add-photo-button"
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
    </div>
    
  `;
  console.log(appHtml)
  appEl.innerHTML = appHtml;
  
  addPostFunc()

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки777",
        imageUrl: "ссылка",
      });
    });
  };
  
  render();
}

let imgLoadForm = document.getElementById(`img-load`);

function addPostFunc(){
 

const postPhotoInput = document.getElementById(`add-photo-button`);
const postNameInput = document.getElementById(`namePost-input`);
const postTextInput = document.getElementById(`textPost-input`);
const postButtonAdd = document.getElementById(`post-button`)
postNameInput.value=user.name



postPhotoInput.addEventListener(`change`, () => {
  const token =user.token
  console.log (user)
  console.log (token)
let localImgRef = postPhotoInput.value  
console.log(localImgRef)

//получение файла изображения
let img = postPhotoInput.files[0]
console.log(img)


//отправка в облако
postButtonAdd.addEventListener(`click`, () => {
  const data = new FormData()
  data.append('file', img)
  return fetch("https://wedev-api.sky.pro/api/upload/image", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.fileUrl);

    //отправка файла из облака в приложение
    return fetch(`https://wedev-api.sky.pro/api/v1/arseny-kulikov/instapro`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      description: postTextInput.value,
      imageUrl: data.fileUrl,
     }),
  }).then((response) => {console.log(response)})
    });
    
  })

  

})

console.log(postPhotoInput.innerHTML)
console.log(user)
console.log(postTextInput.innerHTML)
console.log(postButtonAdd.innerHTML)
}

