// ДОМАШНЕЕ ЗАДАНИЕ №1
(function(){
    let name1 = prompt('Введите свое имя.');
    let familia1 = prompt('Введитое свою фамилию.');
    let age1 = prompt('Сколько вам лет?');
    
    let obj = new Object();
    obj.name = name1;
    obj.familia = familia1;
    obj.age = age1;
    
    console.log(obj);
});


// ДОМАШНЕЕ ЗАДАНИЕ №2
(function(){
    let number = prompt ('Введите число');
    for (let i = 1; i <= number; i++ ){
        if (!(i % 4)){
            continue;
        }
        console.log(i);
    }
});

(function(){
    let rval = 1;
    num = 5;
    for (let i = 2; i <= num; i++){
        rval = rval * i;
    }
    console.log(num);
});

(function(){
    let num = 5;
    let extent = 3;
    let result = num;
    for (let i = 1; i < extent; i++){
        result = result * num;
    }
    console.log(result);
});

(function(){
    let number = prompt('Введите число');
    while(isNaN(+number)){
        number = prompt('Неверно, введите число');
        console.log(+number);
    }
});

(function(){
    let rand = Math.floor(1 + Math.random() * 10);
    let num = +prompt('Введите число');
    while(true){
        if(rand > num){
            num = +prompt('Вы ввели меньше, чем нужно. Попробуйте еще раз');
        } else if(rand < num){
            num = +prompt('Вы ввели больше, чем нужно. Попробуйте еще раз');
        } else{
            console.log(`Вы угадали!!! Было загодано ${rand}`);
            break;
        }
    }
});

// ДОМАШНЕЕ ЗАДАНИЕ №3

function showAge(){
    const age = prompt('Введите свой возраст');
    if (+age >= 18) {
        console.log('ЭТО ПОБЕДА!!!')
    } else {
        showAge();
    }
}

//  Чистые функции не используют глобьальные переменные, не выводит ничего на экран
function add(a, b){       
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function divide(a, b){
    return a / b;
}

function multiply(a, b){
    return a * b;
}

(function(){
    const add1 = addCreator(5);
    console.log(add1(5));
    console.log(addCreator(1)(3)); 
});

function addCreator(item){
    let index = item;
    return(step) => {
        index += step;
        return index;
    }
}

(function(){
    let myCounter1 = counterCraeter(-1);
    console.log(myCounter1());
    console.log(myCounter1());

    let  myCounter2 = counterCraeter(4);
    console.log(myCounter2());
    console.log(myCounter2());

    let myCounter3 = counterCraeter();
    console.log(myCounter3());
    console.log(myCounter3());
});

function counterCraeter(step = 2){
    let index = 0;
    return () => {
        index += step;
        return index;
    };
};



var singIn = document.querySelector('.sign-in');
var overlaySignIn = document.querySelector('.sign-in__overlay');
var singInButton = document.querySelector('.nav__button_js');
var singInCloseButton = singIn.querySelector('.sign-in__btn');
var input = singIn.querySelector('.form__input');

singInButton.addEventListener('click', function(){
    singIn.classList.add('sign-in_open');
    overlaySignIn.classList.add('sign-in__overlay_show');
    input.focus();
});

singInCloseButton.addEventListener('click', function(){
    singIn.classList.remove('sign-in_open');
    overlaySignIn.classList.remove('sign-in__overlay_show');
});

window.addEventListener('keydown', function(evt){
    if (evt.code === "Escape") {
        if (singIn.classList.contains('sign-in_open')){
            singIn.classList.remove('sign-in_open');
            overlaySignIn.classList.remove('sign-in__overlay_show');
        }
    }
});


var register = document.querySelector('.register');
var overlayRegister = document.querySelector('.register__overlay');
var registerButton = document.querySelector('.nav__btn_js');
var registerCloseButton = register.querySelector('.register__btn');
var input = register.querySelector('.form__input');

registerButton.addEventListener('click', function(){
    register.classList.add('register_open');
    overlayRegister.classList.add('register__overlay_show');
    input.focus();
});

registerCloseButton.addEventListener('click', function(){
    register.classList.remove('register_open');
    overlayRegister.classList.remove('register__overlay_show');
});

window.addEventListener('keydown', function(evt){
    if (evt.code === "Escape") {
        if (register.classList.contains('register_open')){
            register.classList.remove('register_open');
            overlayRegister.classList.remove('register__overlay_show');
        }
    }
});

var sendMessage = document.querySelector('.send-message');
var overlaySendMessage = document.querySelector('.send-message__overlay');
var sendMessageButton = document.querySelector('.footer__button_js');
var sendMessageCloseButton = sendMessage.querySelector('.send-message__btn');
var input = sendMessage.querySelector('.form__input');

sendMessageButton.addEventListener('click', () => {
    sendMessage.classList.add('send-message_open');
    overlaySendMessage.classList.add('send-message__overlay_show');
    input.focus();
});

sendMessageCloseButton.addEventListener('click', function(){
    sendMessage.classList.remove('send-message_open');
    overlaySendMessage.classList.remove('send-message__overlay_show');
});

window.addEventListener('keydown', function(evt){
    if (evt.code === "Escape") {
        if (sendMessage.classList.contains('send-message_open')){
            sendMessage.classList.remove('send-message_open');
            overlaySendMessage.classList.remove('send-message__overlay_show');
        }
    }
});


const wrapper = document.querySelector('.slider__wrapper_js');
const innerWrapper = wrapper.querySelector('.slider__inner-wrapper_js');
const slides = innerWrapper.querySelectorAll('.slider__slide_js');
const buttonBack = document.querySelector('.slider__button-back_js');
const buttonNext = document.querySelector('.slider__button-next_js');
const paginationBox = document.querySelector('.slider__pagination_js');

const timeAnimation = 500;
const maxIndex = slides.length - 1;
let width = wrapper.clientWidth;
let activeIndex = +localStorage.getItem('index');
let dots= [];
let timer = null;

function setDisableButton(button, disable = true){
    if(disable){
        button.setAttribute ('disabled', '');
    } else{
        button.removeAttribute('disabled');
    }
}

function initWidthSliders() {
    width = wrapper.clientWidth;
    for (let slide of slides){
        slide.style.width = `${width}px`;
    }
}

initWidthSliders();

function setActiveSlide(index, withAnimation = true){
    if(index < 0){
        return;
    }
    if(index > maxIndex){
        return;
    }

    setDisableButton(buttonNext);
    setDisableButton(buttonBack);

    innerWrapper.style.transform = `translateX(${index * width * (-1)}px)`;
    if(withAnimation){
        innerWrapper.style.transition = `transform ${timeAnimation}ms`;
        clearTimeout(timer);
        timer = setTimeout(() =>{
            innerWrapper.style.transition = ``;
        }, timeAnimation)
    }
    

    dots[activeIndex].classList.remove('slider__dot_active');
    dots[index].classList.add('slider__dot_active');

    if(index !== 0){
        setDisableButton(buttonBack, false);
    }
    if(index !== maxIndex){
        setDisableButton(buttonNext, false);
    }
    activeIndex = index;
    localStorage.setItem('index', index);
}

buttonNext.addEventListener('click', () =>{
    setActiveSlide(activeIndex + 1);
});
buttonBack.addEventListener('click', () =>{
    setActiveSlide(activeIndex - 1);
});

for (let index = 0; index < slides.length; index++){
    let dot = createDot(index === activeIndex);
    dots.push(dot);
    dot.addEventListener('click', () =>{
        setActiveSlide(index);
    });
    paginationBox.insertAdjacentElement('beforeend', dot);
}

setActiveSlide(activeIndex);

window.addEventListener('resize', () =>{
    initWidthSliders();
    setActiveSlide(activeIndex, false);
});

function createDot(isActive){
    let dot = document.createElement("button");
    dot.classList.add('slider__dot');
    if(isActive){
        dot.classList.add('slider__dot_active');
    }
    return dot;
}



(function(){
    const buttonToTop = document.querySelector('.button-to-top');
    if(buttonToTop){
        buttonToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            buttonToTop.classList.add('button-to-top_hidden');
        });
    
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > 1500) {
                buttonToTop.classList.remove('button-to-top_hidden');
            } else {
                buttonToTop.classList.add('button-to-top_hidden');
            }
            });
    }
})();


const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 2,
  
    breakpoints: {
      720: {
        slidesPerView: 1,
      },
    }
  });

  function getFormData(form){
    let data = {};
    const inputs = form.querySelectorAll('input');
    const textareas = form.querySelectorAll('textarea');
    for (let input of inputs){
        switch(input.type){
            case 'checkbox':
                if(!data[input.name] && input.checked){
                    data[input.name] = [];
                }
                if(input.checked){
                    data[input.name].push(input.value); 
                }
            break;
            case 'radio':
                if (input.checked){
                    data[input.name] = input.value;
                }
            break;
            case 'file':
                    data[input.name] = input.files;
            break;
            default: 
            data[input.name] = input.value;
        }
    }

    for (let texarea of textareas){
        data[texarea.name] = texarea.value;
    }

    return data;
}

function setInputError(input, error) {
    const message = document.createElement('div');
  
    message.classList.add('form__label_error');
    input.classList.add("form__input_error");
  
    message.innerText = error;
    input.insertAdjacentElement('afterend', message);
    input.addEventListener('input', () => {
      message.remove();
      input.classList.remove("form__input_error");
    });
}

function setCheckboxError(input, error) {
    input.classList.add("form__input_error");
    const container = input.parentElement.parentElement;
  
    const invalidFeedback = container.querySelector('.form__label_error');
    if(invalidFeedback) {
      invalidFeedback.innerText = error;
      input.addEventListener('change', () => {
        invalidFeedback.remove();
        const inputs = container.querySelectorAll('input');
        for(let input of inputs) {
          input.classList.remove("form__input_error");
        }
      });
      return;
    }
  
    const message = document.createElement('div');
  
    message.classList.add('form__label_error');
    message.style = 'display: block;';
  
    message.innerText = error;
    container.insertAdjacentElement('beforeend', message);
    input.addEventListener('change', () => {
      message.remove();
      input.classList.remove("form__label_error");
    });
}

function  setErrorsToForm (form, errors) {
    const inputs = form.querySelectorAll('input');  
    for (let input of inputs) {
      switch (input.type) {
        case 'checkbox':
          if(errors[input.name]) {
            setCheckboxError(input, errors[input.name])
          } 
          break;
        case 'radio':
          if(errors[input.name]) {
            setCheckboxError(input, errors[input.name])
          }
          break;
        default:
          if(errors[input.name]) {
            setInputError(input, errors[input.name]);
          } 
      }
    }
}

function emailCheck(email) {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

(function() {
    const forms = document.querySelectorAll('form');
    for (let form of forms){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getFormData(form);
            let error = {};
            if(!data.email){
                error.email = 'This field is required';
            } 
            if(data.email && !emailCheck(data.email)) {
                error.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
            } 
            if(!data.password) {
                error.password = 'This field is required';
            } 
            if(data.password && data.password.length < 8) {
                error.password = 'The password is too short';
            } 
            if(data.password && data.password.includes('123')) {
                error.password = 'The password is too simple!';
            } 
            if(!data.name) {
                error.name = 'This field is required';
            } 
            if(!data.surname) {
                error.surname = 'This field is required';
            }
            if(!data.location) {
                error.location = 'This field is required';
            }
            if(!data.age) {
                error.age = 'This field is required';
            } 
            if(!data.phone) {
                error.phone = 'This field is required';
            } 
            if(!data.subject) {
                error.subject = 'This field is required';
            } 
            console.log(error);
             
            setErrorsToForm(form, error);
    
        });
    };
})();




