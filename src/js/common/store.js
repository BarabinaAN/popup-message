const store = (function () {
   return {
      setItem(key, value) {
         localStorage.setItem(key, value);
      },
      
      removeItem(key) {  
         localStorage.removeItem(key);
      },

      getItem(key) {  
         localStorage.getItem(key);
      }
   }
})();

export default store 