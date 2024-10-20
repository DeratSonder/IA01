
function toggleExpand(event) {
    var icon = event.currentTarget;
    var expandable = icon.closest('.expandable');
    var content = expandable.querySelector('.expandable-content-wrap');
    
    if (expandable.classList.contains('expanded')) {
        expandable.classList.remove('expanded');
        content.style.display = 'none';
        icon.setAttribute('name', 'caret-back-sharp');
    } else {
        expandable.classList.add('expanded');
        content.style.display = 'block';
        icon.setAttribute('name', 'arrow-down-outline');
    }
}

var icons = document.getElementsByClassName('icon');
for (var i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', toggleExpand);
}

$( function() {
    $( ".side" ).sortable();
  } );
