// // Функция открытия/закрытия модального окна
// function interactionModal(modal) {
//     modal.classList.toggle('hidden');
// }

// // Ссылка на бек
// const BASE_SERBER_PATH = 'https://academy.directlinedev.com';

// // Функция обработки серверных запросов
// function sendRequest({ url, method = 'GET', headers={}, body = null}){
//     return fetch(`${BASE_SERBER_PATH}${url}`, {
//         method,
//         headers,
//         body,
//     });
// }

// const registerModal = document.querySelector('.register');
// const overlayRegister = document.querySelector('.register__overlay');
// const registerButton = document.querySelector('.nav__btn_js');
// const registerCloseButton = registerModal.querySelector('.register__btn');
// const loaderRegister = registerModal.querySelector('.preloader');
// const registerForm = document.forms.registerForm;
// var input = registerModal.querySelector('.form__input');

// const signInModal = document.querySelector('.sign-in');
// const overlaySignIn = document.querySelector('.sign-in__overlay');
// const signInButton = document.querySelector('.nav__button_js');
// const signInCloseButton = signInModal.querySelector('.sign-in__btn');
// const loaderSignIn = signInModal.querySelector('.preloader');
// const signInForm = document.forms.signInForm;
// var input = signInModal.querySelector('.form__input');

// const sendMessageModal = document.querySelector('.send-message');
// const overlaySendMessage = document.querySelector('.send-message__overlay');
// const sendMessageButton = document.querySelector('.footer__button_js');
// const sendMessageCloseButton = document.querySelector('.send-message__btn');
// const sendMessageForm = document.forms.sendMessageForm;
// var input = sendMessageModal.querySelector('.form__input');

// const buttonProfile = document.querySelector('.nav__link');

// // Логика регестрации пользователя
// let isLoading = false;
// function register(e){
//     e.preventDefault();
//     if(isLoading){
//         return;
//     }
//     isLoading = true;
//     loaderRegister.classList.remove('hidden');
//     const data = getDataFromForm(e.target);
//     console.log(data);
//     sendRequest({
//         url: '/api/users',
//         method: 'POST', 
//         body: JSON.stringify(data),
//         headers:{
//           'Content-Type': 'application/json;charset=utf-8'  
//         },
//     })
//     .then(res => res.json())
//     .then(res => {
//         if(!res.success){
//             throw res;
//         } else{
//             console.log('then', res);
//             isLoading = false;
//             loaderRegister.classList.add('hidden');
//         }
//     })
//     .catch(err => {
//         setErrorsToForm(e.target, err.errors);
//         isLoading = false;
//         loaderRegister.classList.add('hidden');
//     });
// }

// function signIn(e){
//     e.preventDefault();
//     if(isLoading){
//         return;
//     }
//     isLoading = true;
//     loaderSignIn.classList.remove('hidden');
//     const data = getDataFromForm(e.target);
//     console.log(data);
//     sendRequest({
//         method: 'POST',
//         url: '/api/users/login',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(data),
//         })
//     .then(res => res.json())
//     .then(res => {
//         if(!res.success){
//             throw res;
//         }
//         window.location = '/pages/profile';
//         updateTokenState(res.data);
//         isLoading = false;
//         loaderSignIn.classList.add('hidden');
//     })
//     .catch(err => {
//         setErrorsToForm(e.target, err.errors);
//         isLoading = false;
//         loaderSignIn.classList.add('hidden');
//     })

// }

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

//   function getDataFromForm(form){
//     let data = {};
//     const inputs = form.querySelectorAll('input');
//     const textareas = form.querySelectorAll('textarea');
//     for (let input of inputs){
//         switch(input.type){
//             case 'checkbox':
//                 if(!data[input.name] && input.checked){
//                     data[input.name] = [];
//                 }
//                 if(input.checked){
//                     data[input.name].push(input.value); 
//                 }
//             break;
//             case 'radio':
//                 if (input.checked){
//                     data[input.name] = input.value;
//                 }
//             break;
//             case 'file':
//                     data[input.name] = input.files;
//             break;
//             default: 
//             data[input.name] = input.value;
//         }
//     }

//     for (let texarea of textareas){
//         data[texarea.name] = texarea.value;
//     }

//     return data;
// }

// function setInputError(input, error) {
//     const message = document.createElement('div');
  
//     message.classList.add('form__label_error');
//     input.classList.add("form__input_error");
  
//     message.innerText = error;
//     input.insertAdjacentElement('afterend', message);
//     input.addEventListener('input', () => {
//       message.remove();
//       input.classList.remove("form__input_error");
//     });
// }

// function setCheckboxError(input, error) {
//     input.classList.add("form__input_error");
//     const container = input.parentElement.parentElement;
  
//     const invalidFeedback = container.querySelector('.form__label_error');
//     if(invalidFeedback) {
//       invalidFeedback.innerText = error;
//       input.addEventListener('change', () => {
//         invalidFeedback.remove();
//         const inputs = container.querySelectorAll('input');
//         for(let input of inputs) {
//           input.classList.remove("form__input_error");
//         }
//       });
//       return;
//     }
  
//     const message = document.createElement('div');
  
//     message.classList.add('form__label_error');
//     message.style = 'display: block;';
  
//     message.innerText = error;
//     container.insertAdjacentElement('beforeend', message);
//     input.addEventListener('change', () => {
//       message.remove();
//       input.classList.remove("form__label_error");
//     });
// }

// function  setErrorsToForm (form, errors) {
//     const inputs = form.querySelectorAll('input');  
//     for (let input of inputs) {
//       switch (input.type) {
//         case 'checkbox':
//           if(errors[input.name]) {
//             setCheckboxError(input, errors[input.name])
//           } 
//           break;
//         case 'radio':
//           if(errors[input.name]) {
//             setCheckboxError(input, errors[input.name])
//           }
//           break;
//         default:
//           if(errors[input.name]) {
//             setInputError(input, errors[input.name]);
//           } 
//       }
//     }
// }

// function emailCheck(email) {
//     return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
// }

// signInButton.addEventListener('click', () => {
//     interactionModal(signInModal);
//     overlaySignIn.classList.remove('hidden');
//     input.focus();
// });

// signInCloseButton.addEventListener('click', ()=>{
//     interactionModal(signInModal);
//     overlaySignIn.classList.add('hidden');
// });

// signInForm.addEventListener('submit', (e) => {
//     signIn(e);
// });

// registerButton.addEventListener('click', ()=>{
//     interactionModal(registerModal);
//     overlayRegister.classList.remove('hidden');
//     input.focus();
// });

// registerCloseButton.addEventListener('click', ()=>{
//     interactionModal(registerModal);
//     overlayRegister.classList.add('hidden');
// });

// registerForm.addEventListener('submit', (e) => {
//     register(e);
// });

// sendMessageButton.addEventListener('click', ()=>{
//     interactionModal(sendMessageModal);
//     overlaySendMessage.classList.remove('hidden');
//     input.focus();
// });

// sendMessageCloseButton.addEventListener('click', ()=>{
//     interactionModal(sendMessageModal);
//     overlaySendMessage.classList.add('hidden');
// });

// window.addEventListener('keydown', function(evt){
//     if (evt.code === "Escape") {
//         if (!registerModal.classList.contains('hidden')){
//             registerModal.classList.add('hidden');
//             overlayRegister.classList.add('hidden');
//         }
//     }
// });

// window.addEventListener('keydown', function(evt){
//     if (evt.code === "Escape") {
//         if (!signInModal.classList.contains('hidden')){
//             signInModal.classList.add('hidden');
//             overlaySignIn.classList.add('hidden');
//         }
//     }
// });

// window.addEventListener('keydown', function(evt){
//     if (evt.code === "Escape") {
//         if (!sendMessageModal.classList.contains('hidden')){
//             sendMessageModal.classList.add('hidden');
//             overlaySendMessage.classList.add('hidden');
//         }
//     }
// });


// const wrapper = document.querySelector('.slider__wrapper_js');
// const innerWrapper = wrapper.querySelector('.slider__inner-wrapper_js');
// const slides = innerWrapper.querySelectorAll('.slider__slide_js');
// const buttonBack = document.querySelector('.slider__button-back_js');
// const buttonNext = document.querySelector('.slider__button-next_js');
// const paginationBox = document.querySelector('.slider__pagination_js');

// const timeAnimation = 500;
// const maxIndex = slides.length - 1;
// let width = wrapper.clientWidth;
// let activeIndex = +localStorage.getItem('index');
// let dots= [];
// let timer = null;

// function setDisableButton(button, disable = true){
//     if(disable){
//         button.setAttribute ('disabled', '');
//     } else{
//         button.removeAttribute('disabled');
//     }
// }

// function initWidthSliders() {
//     width = wrapper.clientWidth;
//     for (let slide of slides){
//         slide.style.width = `${width}px`;
//     }
// }

// initWidthSliders();

// function setActiveSlide(index, withAnimation = true){
//     if(index < 0){
//         return;
//     }
//     if(index > maxIndex){
//         return;
//     }

//     setDisableButton(buttonNext);
//     setDisableButton(buttonBack);

//     innerWrapper.style.transform = `translateX(${index * width * (-1)}px)`;
//     if(withAnimation){
//         innerWrapper.style.transition = `transform ${timeAnimation}ms`;
//         clearTimeout(timer);
//         timer = setTimeout(() =>{
//             innerWrapper.style.transition = ``;
//         }, timeAnimation)
//     }
    

//     dots[activeIndex].classList.remove('slider__dot_active');
//     dots[index].classList.add('slider__dot_active');

//     if(index !== 0){
//         setDisableButton(buttonBack, false);
//     }
//     if(index !== maxIndex){
//         setDisableButton(buttonNext, false);
//     }
//     activeIndex = index;
//     localStorage.setItem('index', index);
// }

// buttonNext.addEventListener('click', () =>{
//     setActiveSlide(activeIndex + 1);
// });
// buttonBack.addEventListener('click', () =>{
//     setActiveSlide(activeIndex - 1);
// });

// for (let index = 0; index < slides.length; index++){
//     let dot = createDot(index === activeIndex);
//     dots.push(dot);
//     dot.addEventListener('click', () =>{
//         setActiveSlide(index);
//     });
//     paginationBox.insertAdjacentElement('beforeend', dot);
// }

// setActiveSlide(activeIndex);

// window.addEventListener('resize', () =>{
//     initWidthSliders();
//     setActiveSlide(activeIndex, false);
// });

// function createDot(isActive){
//     let dot = document.createElement("button");
//     dot.classList.add('slider__dot');
//     if(isActive){
//         dot.classList.add('slider__dot_active');
//     }
//     return dot;
// }

// (function(){
//     const buttonToTop = document.querySelector('.button-to-top');
//     if(buttonToTop){
//         buttonToTop.addEventListener('click', () => {
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth',
//             });
//             buttonToTop.classList.add('button-to-top_hidden');
//         });
    
//         window.addEventListener('scroll', () => {
//             if(window.pageYOffset > 1500) {
//                 buttonToTop.classList.remove('button-to-top_hidden');
//             } else {
//                 buttonToTop.classList.add('button-to-top_hidden');
//             }
//             });
//     }
// })();

// const swiper = new Swiper('.swiper-container', {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     slidesPerView: 2,
  
//     breakpoints: {
//       720: {
//         slidesPerView: 1,
//       },
//     }
//   });

const buttonHeader = document.querySelector('.header__btn-mobile');
const header = document.querySelector('.mobile-header');
const closeBtnHeader = document.querySelector('.mobile-header__btn_close');

buttonHeader.addEventListener('click', () => {
    header.classList.add('mobile-header_open');
});

closeBtnHeader.addEventListener('click', () => {
    header.classList.remove('mobile-header_open');
});

window.addEventListener('keydown', function(evt){
    if (evt.code === "Escape") {
        if (header.classList.contains('mobile-header_open')){
            header.classList.remove('mobile-header_open');
        }
    }
});
function getStringFromDate(date) {
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }
