// // Функция открытия/закрытия модального окна
// function interactionModal(modal) {
//     modal.classList.toggle('open');
//   }

//   // Ссылка на бек
// const BASE_SERBER_PATH = 'https://academy.directlinedev.com';

// // Функция обработки серверных запросов
// // function sendRequest({ url, method = 'GET', headers={}, body = null}){
// //     return fetch(`${BASE_SERBER_PATH}${url}`, {
// //         method,
// //         headers,
// //         body,
// //     });
// // }

// const signInButton = document.querySelector('.nav__button_js');
// const registerButton = document.querySelector('.nav__btn_js');
// const buttonProfile = document.querySelector('.nav__link');

// function updateTokenState(param){
//     if(!param){
//         const token = localStorage.getItem('token', token);
//         if(token){
//             signInButton.classList.add('hidden');
//             registerButton.classList.add('hidden');
//             buttonProfile.classList.remove('visually-hidden');
//         } else{
//             signInButton.classList.remove('hidden');
//             registerButton.classList.remove('hidden');
//             buttonProfile.classList.add('visually-hidden');
//         }
//     } else{
//         const {token, userId} = param;
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
//         signInButton.classList.add('hidden');
//         registerButton.classList.add('hidden');
//         buttonProfile.classList.remove('visually-hidden');
//     }
    
    
// }
// // updateTokenState();