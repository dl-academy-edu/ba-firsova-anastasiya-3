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

const URL_SERVER = 'https://academy.directlinedev.com';
let LIMIT = 10;

(function(){
  const form = document.querySelector('.form-blog');
  const clearButton = document.querySelector('.form-blog__button');
  let tagsBox = document.querySelector('.form-blog__tags');
  
  tagsBox.innerHTML = spinerCreate();
  getTagsFromServer({
    onload: response => {
      if(!response.success){
        return alert('Something went wrong');
      }
      const tags = response.data;
      tagsBox.innerHTML = '';
      for (let tag of tags){
        tagsBox.innerHTML += tagCreate(tag);
      }
      const data = getDataFromURL();
      setDataToForm(form, data);
      getPosts({onload: () => null, data})
    }
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getDataFromForm(form);
    setDataToURL(data);
    getPosts({onload: () =>{

    },  data});
  });
  const linksBox = document.querySelector('.pagination_js');
  const links = linksBox.querySelectorAll('.link_js');
  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getDataFromForm(form);
      setDataToURL({...data, page: index});
      getPosts({onload: () =>{
      
    }, data:{...data, page: index}});
    });
  })
  
})();

function linkCreateElement(index, data){
  const a = document.createElement('a');
  a.href = 'page' + index;
  a.innerText = `${index+1}`
  a.addEventListener('click', (e) =>{
    e.preventDefault();
    setDataToURL({...data, page: index});
    getPosts({onload: () =>{
    
  }, data:{...data, page: index}
});
});
return a;
}

function getPosts({onload, data}){
  let postsBox = document.querySelector('.blog__post-list');
  postsBox.innerHTML = spinerCreate();
  getPostFromServer({
    params: data, 
    onload: response => {
      if (!response.success){
        return alert('Something went wrong');
      }
      const posts = response.data;
      postsBox.innerHTML = '';
      for(let post of posts){
        postsBox.innerHTML += createPost(post);
      }
      const linksBox = document.querySelector('.pagination__list');
      let count = response.count;
      let index = 0;
      linksBox.innerHTML = '';
      while(count - LIMIT > 0) {
        linksBox.insertAdjacentElement('beforeend', linkCreateElement(index, data) );
        index++;
        count -= LIMIT;
      }
      linksBox.insertAdjacentElement('beforeend', linkCreateElement(index, data));
      onload();
    }
  })
}


function getTagsFromServer({onload}){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `${URL_SERVER}/api/tags`);
  xhr.send();
  xhr.onload = () => {
    onload(JSON.parse(xhr.response));
  };
  xhr.onerror = () => {
    onload({success:false, data: []});
  };
}

function getPostFromServer({onload, params = {}}){
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set('v', '1.0.0');
  if(params.tags && Array.isArray(params.tags)) {
      searchParams.append('tags', `[${params.tags}]`);
  }
  let filter = {};
  if(params.views){
    filter.views = {
      $between: params.views.split('-'),
    };
    if(params.search){
      filter.title = params.search;
    }
  }

  searchParams.set('filter', JSON.stringify(filter));
  searchParams.set('sort', JSON.stringify(['date', 'ASC']));
  if (params.page){
    searchParams.set('limit', LIMIT);
    searchParams.set('offset', params.page * LIMIT);
  }
  
  xhr.open('GET', `${URL_SERVER}/api/posts?${searchParams.toString()}`);
  xhr.send();
  xhr.onload = () => {
    onload(JSON.parse(xhr.response));
  };
  xhr.onerror = () => {
    onload({success:false, data: []});
  };

}



function spinerCreate(){
  return `<div class="preloader">
  <div class="loader"></div>
</div>`;
}

function tagCreate(tag){
  return `<div class="form-blog__tags-wrapper">
	<input name="tags" type="checkbox" id="check${tag.id}" value="${tag.id}" class="form-blog__input visually-hidden">
	<label style="background-color: ${tag.color}" for="check${tag.id}" class="form-blog__label"></label>
</div>`
}

function createPost(post){
  return `<li class="post">
  <img src="${URL_SERVER}${post.photo.desktopPhotoUrl}" class="post__img" alt="picture describing the post">
  <div class="post__wrapper">
      <div class="post__tags">${post.tags.map(item => item.name).join(" ")}</div>
    <div class="post-wrap">
        <span class="post__date">${post.date}</span>          
        <span class="post__views">${post.views}</span>
        <span class="post__comments">${post.commentsCount}</span>
    </div>  
    <h3 class="post__title">${post.title}</h5>
    <p class="post__text">${post.text}</p>
    <a href="#" class="post__link">Go to this post</a>
  </div>
</li>`
}



function setDataToURL(data) {
  let url = new URL(window.location.origin);
  let params = url.searchParams;
  if(data.views) {
    params.set('views', data.views);
  }
  if(data.show) {
    params.set('show', data.show);
  }
  if(data.sorting) {
    params.set('sorting', data.sorting);
  }
  if(data.page) {
    params.set('page', data.page);
  } else {
    params.set('page', 0);
  }
  if(data.tags && Array.isArray(data.tags)) {
    data.tags.forEach(item => {
      params.append('tags', item);
    });
  }
  window.history.replaceState({}, document.title, url.search);
}

function getDataFromURL() {
  let data = {};
  const url = new URL(window.location)
  const params = url.searchParams;
  if(params.get('views')){
    data.views = params.get('views');
  };
  if(params.get('show')){
    data.show = params.get('show');
  };
  if(params.get('sorting')){
    data.sorting = params.get('sorting');
  };
  if(params.getAll('tags').length){
    data.tags = params.getAll('tags');
  };
  return data;
}

function setDataToForm(form, data){
  const inputs = form.querySelectorAll('input');
    const textareas = form.querySelectorAll('textarea');
    for (let input of inputs){
        switch(input.type){
            case 'checkbox':
                if(data[input.name] &&  Array.isArray(data[input.name])){
                    if(data[input.name].some(item => item === input.value)){
                      input.checked = true;
                    } 
                }
            break;
            case 'radio':
                if (data[input.name] === input.value){
                  input.checked = true;
                }
            break;
            default: 
            if(data[input.name]){
              input.value = data[input.name];
            }
        }
    }

    for (let texarea of textareas){
      if(data[texarea.name]){
        texarea.value = data[texarea.name];
      }
    }

    return data;
}

function getDataFromForm(form){
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


