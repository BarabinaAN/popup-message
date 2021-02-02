export default class PopupMessage {
   constructor(api) {
      this.parentSelector = 'main';
      this.btnClass = 'popup__close';
      this.wrapClass = 'popup';
      this.keyStore = 'date-activation';	
      this.dataInterval = 0.05;                                      // time an hours
      this.delay = 3000;                                             // time a ms
      this.parent = document.querySelector(this.parentSelector);
      this.dateActivation = localStorage.getItem(this.keyStore);
   }
   
   init() {
      if (this.dateActivation) return this.removeStorage()

      setTimeout(() => this.create(), this.delay );

      document.body.addEventListener('click', (e) => this.close(e));
   }

   create() {
      const popup = this.renderTemplate();	
      this.parent.insertAdjacentHTML("afterend", popup);
   
      this.updateState();
   }

   close(e) {   
      const current = e.target;     
      const checkClass = current.classList.contains(this.btnClass);

      if(checkClass) {
         this.wrap.remove();
         this.setStorage();
      }
   }
   
   setStorage() {
      const dateNow = Date.parse(new Date());
      const dateActivation = dateNow + 3600 * this.dataInterval * 1000;
      
      localStorage.setItem(this.keyStore, new Date(dateActivation));
   }
   
   removeStorage() {
      const checkDate = Date.parse(new Date()) >= Date.parse(this.dateActivation);
      if (!checkDate) return

      localStorage.removeItem(this.keyStore);
   }
   
   updateState() {
      this.parent = document.querySelector(this.parentSelector);
      this.btnClose = document.querySelector('.'+ this.btnClass);
      this.wrap = document.querySelector(`.${this.wrapClass}`);
   }
   
   renderTemplate() {
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
}