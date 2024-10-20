
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

$(function () {
    $(".side").sortable();
});


$(document).ready(function() {
   
    function synchronizeNavigation(navClicked, navToSync, clickedElement) {
        var target = $(clickedElement).attr('href'); 

        $(navToSync + ' a').removeClass('active');
        $(navToSync + ' a[href="' + target + '"]').addClass('active');
        $(navClicked + ' a').removeClass('active');

        $(clickedElement).addClass('active');
    }

    $('#nav-header a').on('click', function(event) {
        event.preventDefault(); 
        synchronizeNavigation('#nav-header', '#nav-footer', this);
    });

    $('#nav-footer a').on('click', function(event) {
        event.preventDefault(); 
        synchronizeNavigation('#nav-footer', '#nav-header', this);
    });
});
