const profileImg = document.querySelector('.profile__img_js');
const profileName = document.querySelector('.profile__name_js');
const profileSurname = document.querySelector('.profile__surname_js');
const profileEmail = document.querySelector('.profile__email_js');
const profileLocation = document.querySelector('.profile__location_js');
const profileAge = document.querySelector('.profile__age_js');

const buttonModalEditing = document.querySelector('.profile__button_js');
const modalEditing = document.querySelector('.data');
const overlayEditing = document.querySelector('.data_overlay');
const buttonCloseModalEditing = modalEditing.querySelector('.data__btn');

const editingForms = document.forms.editingForm;

function changeData(e){
  e.preventDefault();
}

buttonModalEditing.addEventListener('click', ()=>{
  interactionModal(modalEditing);
});

buttonCloseModalEditing.addEventListener('click', ()=>{
  interactionModal(modalEditing);
});

editingForms.addEventListener('submit', (e) => {
  changeData(e);
});

buttonModalEditing.addEventListener('click', function(){
  overlayEditing.classList.remove('hidden');
    input.focus();
})

buttonCloseModalEditing.addEventListener('click', function(){
  overlayEditing.classList.add('hidden');
})

window.addEventListener('keydown', function(evt){
    if (evt.code === "Escape") {
        if (!modalEditing.classList.contains('hidden')){
            modalEditing.classList.add('hidden');
            overlayEditing.classList.add('hidden');
        }
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
              if(!data.password) {
                error.password = 'This field is required';
              } 
              if(data.password && data.password.length < 8) {
                error.password = 'The password is too short';
              } 
              if(data.password && data.password.includes('123')) {
                error.password = 'The password is too simple!';
              } 

              if(!data.newPassword) {
                error.newPassword = 'This field is required';
              } 
              if(data.newPassword && data.newPassword.length < 8) {
                error.password = 'The password is too short';
              } 
              if(data.newPassword && data.newPassword.includes('123')) {
                error.newPassword = 'The password is too simple!';
              }

              if(!data.repeatPassword) {
                error.repeatPassword = 'This field is required';
              } 
              if(data.repeatPassword !== data.newPassword) {
                error.password = 'the password does not match';
              } 
                      
              console.log(error);
              setErrorsToForm(form, error);
            });
    };
})();

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