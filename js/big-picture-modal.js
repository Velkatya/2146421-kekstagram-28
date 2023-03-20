import { picturesArray } from './main.js';
import { isEscapeKey } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentList = bigPicturePreview.querySelector('.social__comments');
const commentsLoadButton = bigPicturePreview.querySelector('.social__comments-loader');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const clearBigPictureComments = () => {
  bigPictureCommentList.innerHTML = '';
};

const deliteDefaultComments = () => {
  const defaultComments = bigPicturePreview.querySelectorAll('.social__comment');
  defaultComments[0].remove();
  defaultComments[1].remove();
};

deliteDefaultComments();

const renderBigPictureContent = (object) => {
  bigPicturePreview.querySelector('.big-picture__img img').src = object.url;
  bigPicturePreview.querySelector('.likes-count').textContent = object.likes;
  bigPicturePreview.querySelector('.comments-count').textContent = object.comments.length;
  bigPicturePreview.querySelector('.social__caption').textContent = object.description;
  bigPicturePreview.querySelector('.social__comment-count').classList.add ('hidden');
};

const onPictureClick = (evt) => {

  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    bigPicture.classList.remove('hidden');
    const currentPhotoDescription = picturesArray.find((item) => item.id === Number(target.dataset.id));
    renderBigPictureContent(currentPhotoDescription);
    commentsLoadButton.classList.add ('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    const currentCommentsArray = currentPhotoDescription.comments;
    renderBigPictureComments(currentCommentsArray);

    const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');

    for (let i = 0; i < 5; i++) {
      hiddenComments[i].classList.remove('hidden');
    }

    if (hiddenComments.length > 5) {
      commentsLoadButton.classList.remove ('hidden');
    }

  }
};


// function showFirstComments () {
//   const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');

//   for (let i = 0; i < 5; i++) {
//     hiddenComments[i].classList.remove('hidden');
//   }

//   if (hiddenComments.length > 5) {
//     commentsLoadButton.classList.remove ('hidden');
//   }
// }


// const createComments = () => {
//   const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');
//   const сommentsQty = hiddenComments.length + 5;
//   let loadedCommentsQty = 5;

//   return function () {
//     if (loadedCommentsQty < сommentsQty) {
//       for (let i = loadedCommentsQty; i < loadedCommentsQty + 5; i++) {
//         hiddenComments[i].classList.remove('hidden');
//         loadedCommentsQty += 5;
//       }
//     } else {
//       commentsLoadButton.classList.add('hidden');
//     }
//   };
// };

// const loadComments = createComments();

// commentsLoadButton.addEventListener ('click', () => {
//   loadComments();
// });


//Функция, которая отрисовывает разметку под комменты
function renderBigPictureComments (array) {

  array.forEach((element) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add ('social__comment', 'hidden');
    bigPicturePreview.querySelector('.social__comments').append(commentItem);
    const commentImg = document.createElement('img');
    commentImg.classList.add ('social__picture');
    commentImg.src = element.avatar;
    commentImg.alt = element.name;
    commentImg.width = 35;
    commentImg.height = 35;
    commentItem.append(commentImg);
    const commentText = document.createElement('p');
    commentText.classList.add ('social__text');
    commentText.textContent = element.message;
    commentItem.append(commentText);
  });
}

picturesContainer.addEventListener('click', onPictureClick);

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearBigPictureComments();
  document.body.classList.remove('modal-open');
}

bigPictureCloseElement.addEventListener ('click', () => {
  closeBigPicture();
});
