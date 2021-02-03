import store from './store'


export default class PopupMessage {
   constructor() {
      this.keyStore = 'date-activation';

      this.selectors = {
         parent: 'main',
         wrap: '[data-popup]',
         btnClose: '[data-popup-btn]',
      }

      this.elements = {
         parent: document.querySelector(this.selectors.parent),
      }

      this.time = {
         interval: 0.05,                                             // time an hours
         activation: localStorage.getItem(this.keyStore),            // time activation
         animationDelay: 3000,                                       // time a ms
      }
   }
   

   init() {
      if (this.time.activation) {
         const checkDate = Date.now() >= Date.parse(this.time.activation);
         if (!checkDate) return
   
         store.removeItem(this.keyStore);
      }

      setTimeout(() => this.create(), this.time.animationDelay );
   }

   create() {
      const popup = this.template();	
      this.elements.parent.insertAdjacentHTML("afterend", popup);

      this.elements.parent = document.querySelector(this.selectors.parent);
      this.elements.wrap = document.querySelector(this.selectors.wrap);
      this.elements.btnClose = document.querySelector(this.selectors.btnClose);

      this.elements.btnClose.addEventListener('click', (e) => this.close(e));
   }

   close() {   
      this.elements.wrap.remove();
      const dateActivation = Date.now() + 3600 * this.time.interval * 1000;
      store.setItem(this.keyStore, new Date(dateActivation));
   }
   
   template() {
      return `
         <div class="popup" data-popup>
            <div class="popup__close" data-popup-btn></div>
            <div class="popup__container">
               <ol>
                  <span>Список выполненных работ:</span>
                  <li>Окно с информацией должно быть закреплено <b>в нижней части экрана</b></li>
               </ol>
            </div>
         </div>
      `
   }
}