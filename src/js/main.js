const props = {
   parentSelector: 'main',
   btnClass: 'popup__close',
   wrapClass: 'popup',
   keyStore: 'date-activation',	
   dataInterval: 0.05,           // time an hours
   delay: 2000,                  // time a ms
}


let state = {
   parent: document.querySelector(props.parentSelector),
   dateActivation: localStorage.getItem(props.keyStore),
}


function init() {
   if (state.dateActivation) return removeStorage()

   setTimeout(create, props.delay);
   close();
}


function create() {
   const popup = renderTemplate();	
   state.parent.insertAdjacentHTML("afterend", popup);

   state = updateState();
}


function close() {
   document.body.addEventListener('click', function(e) {
      const current = e.target;
      const checkClass = !current.closest(`.${props.wrapClass}`) || current.classList.contains(props.btnClass);

      if(checkClass) {
         state.wrap.remove();
         setStorage();
      }

   });
}

function setStorage() {
   const dateNow = Date.parse(new Date());
   const dateActivation = dateNow + 3600 * props.dataInterval * 1000;
   
   localStorage.setItem(props.keyStore, new Date(dateActivation));
}

function removeStorage() {
   const checkDate = Date.parse(new Date()) >= Date.parse(state.dateActivation);
   if (!checkDate) return
   localStorage.removeItem(props.keyStore);
}

function updateState() {
   return {
      parent: document.querySelector(props.parentSelector),
      btnClose: document.querySelector('.'+ props.btnClass),
      wrap: document.querySelector(`.${props.wrapClass}`),
   }
}

function renderTemplate() {
   return `
      <div class="popup">
         <div class="popup__close"></div>
         <div class="popup__container">
            <ol>
               <span>Список выполненных работ:</span>
               <li>Окно с информацией должно быть закреплено <b>в нижней части экрана</b></li>
            </ol>
         </div>
      </div>
   `
}

init();