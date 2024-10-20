
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

//----------------------------------------------------------------

$(document).ready(function () {

    function synchronizeNavigation(navClicked, navToSync, clickedElement) {
        var target = $(clickedElement).attr('href');

        $(navToSync + ' a').removeClass('active');
        $(navToSync + ' a[href="' + target + '"]').addClass('active');
        $(navClicked + ' a').removeClass('active');

        $(clickedElement).addClass('active');
    }

    $('#nav-header a').on('click', function (event) {
        event.preventDefault();
        synchronizeNavigation('#nav-header', '#nav-footer', this);
    });

    $('#nav-footer a').on('click', function (event) {
        event.preventDefault();
        synchronizeNavigation('#nav-footer', '#nav-header', this);
    });
});


//----------------------------------------------------------------
const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelector('.selected');

select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
    });
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
    }
});

//----------------------------------------------------------------

const dragDropContent = document.querySelector('.drag-drop-content');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
    const newEmoji = document.querySelector('.selected').innerText
    dragDropContent.innerHTML += '<div class="drag-drop-content-item">' + newEmoji + '</div>';
});

$(function () {
    $(".drag-drop-content").sortable({
        placeholder: "ui-sortable-placeholder",
        cursor: "move",
        tolerance: "pointer",
        start: function (e, ui) {
            ui.placeholder.height(ui.item.outerHeight());
            ui.placeholder.width(ui.item.outerWidth());
        }
    });
});

//----------------------------------------------------------------

const dropdownEdittext = document.getElementById('enterText');
const menuEdittext = document.querySelector('.enter-text-dropdown');
const optionsEdittext = document.querySelectorAll('.enter-text-dropdown li');

dropdownEdittext.addEventListener('click', () => {
    menuEdittext.classList.toggle('enter-text-dropdown-open');
});

optionsEdittext.forEach(option => {
    option.addEventListener('click', () => {
        enterText.value = option.innerText;
        menuEdittext.classList.remove('enter-text-dropdown-open');
    });
});

document.addEventListener('click', (e) => {
    if (!dropdownEdittext.contains(e.target)) {
        menuEdittext.classList.remove('enter-text-dropdown-open');
    }
});


//----------------------------------------------------------------
const dropdownSetting = document.getElementById('settingButton');
const menuSetting = document.querySelector('.setting-text-dropdown');

dropdownSetting.addEventListener('click', () => {
    menuSetting.classList.toggle('setting-text-dropdown-open');
});


document.addEventListener('click', (e) => {
    if (!dropdownSetting.contains(e.target) && !menuSetting.contains(e.target)) {
        menuSetting.classList.remove('setting-text-dropdown-open');
    }
});

//----------------------------------------------------------------


$(function () {
    $('input[type="color"]').on('input', function () {
        if ($(this).attr('id') === 'textColor') {
            $(':root').css('--bg-colorText', $(this).val());
        }
        else {
            $(':root').css('--bg-coloBackground', $(this).val());
        }
    });
});

$(function () {

    $('input[type="checkbox"]').on('change', function () {
        let isBoldChecked = false;
        let isItalicChecked = false;
        let isUnderscoreChecked = false;

        isBoldChecked = $('#bold').is(':checked');
        isItalicChecked = $('#italic').is(':checked');
        isUnderscoreChecked = $('#underline').is(':checked');

        let fontWeight = isBoldChecked ? 'bold' : 'normal';
        let fontStyle = isItalicChecked ? 'italic' : 'normal';
        let textDecoration = isUnderscoreChecked ? 'underline' : 'none';

        $('.sampleText').css({
            'font-weight': fontWeight,
            'font-style': fontStyle,
            'text-decoration': textDecoration
        });


    });
});


$(document).ready(function () {
    const originalContent = $('#editContent').html();

    function processText(action) {
        var enterText = $('#enterText').val();
        if (!enterText) return;

        const pattern = new RegExp(enterText, 'g');

        var color = $('#sample').css('color');
        var background = $('#sample').css('background-color');
        var fontWeight = $('#sample').css('font-weight');
        var textDecoration = $('#sample').css('text-decoration');
        var fontStyle = $('#sample').css('font-style');

        function traverseNode(node) {
            if (node.nodeType === 3) { // Text node
                var newContent = node.textContent;
                var match;
                var lastIndex = 0;
                var fragments = [];

                while ((match = pattern.exec(newContent)) !== null) {
                    fragments.push(document.createTextNode(newContent.slice(lastIndex, match.index)));
                    
                    if (action === 'highlight') {
                        var span = document.createElement('span');
                        span.className = 'contentText';
                        span.textContent = match[0];
                        fragments.push(span);
                    }
                    
                    lastIndex = pattern.lastIndex;
                }

                if (lastIndex < newContent.length) {
                    fragments.push(document.createTextNode(newContent.slice(lastIndex)));
                }

                if (fragments.length > 0) {
                    var parent = node.parentNode;
                    fragments.forEach(fragment => parent.insertBefore(fragment, node));
                    parent.removeChild(node);
                    return fragments.length - 1;
                }
            } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    i += traverseNode(node.childNodes[i]);
                }
            }
            return 0;
        }

        traverseNode(document.getElementById('editContent'));

        if (action === 'highlight') {
            $('.contentText').css({
                'color': color,
                'background-color': background,
                'font-weight': fontWeight,
                'font-style': fontStyle,
                'text-decoration': textDecoration
            });
        } else if (action === 'delete') {
            $('#editContent').html($('#editContent').html().replace(pattern, ''));
        }
    }

    $('#highlightButton').on('click', function () {
        processText('highlight');
    });

    $('#deleteButton').on('click', function () {
        processText('delete');
    });

    $('#resetButton').on('click', function () {
        $('#editContent').html(originalContent);
    });
});