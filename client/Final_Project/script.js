/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    })
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector('.filter_button');
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    mainForm.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      
      // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
      submitEvent.preventDefault(); 
      
      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
      console.log('form submission'); 
  
      /*
        *************TESTING if you can use a variable for the link
      */
      let rando = '.json';
      let link = `https://data.princegeorgescountymd.gov/resource/umjn-t2iz${rando}`;

      // *************This replaces the form Action
      const results = await fetch(link);
  
      // This changes the response from the GET into data we can use - an "object"
      currentList = await results.json();
  
      /*
        This array initially contains all 1,000 records from your request,
        but it will only be defined _after_ the request resolves - any filtering on it before that
        simply won't work.
      */
      console.table(currentList); 
    });
  
    filterButton.addEventListener('click', (event) => {
      console.log("clicked FilterButton");
    
      /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
    */
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
  
      console.log(newList);
    })
  }
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests