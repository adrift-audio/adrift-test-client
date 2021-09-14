function loader(anchor) {
  return $(anchor).empty().append(`
<div class="flex items-center justify-items-center h-100">
  <div class="loader"></div>
</div>  
  `);
}
