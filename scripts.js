
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


const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelector('.selected');

// Toggle the dropdown menu when clicking on the select element
select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
});

// Loop through all options and add a click event
options.forEach(option => {
    option.addEventListener('click', () => {
        // Change the selected text
        selected.innerText = option.innerText;
        // Close the dropdown menu
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
    });
});

// Close the dropdown menu if clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
    }
});
