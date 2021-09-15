const loader = () => {
  return $('#loader').empty().append(`
<div class="flex items-center justify-items-center loader-wrap">
  <div class="loader"></div>
</div>  
  `);
}

loader.hide = () => $('#loader').empty();
