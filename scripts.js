

/*PROCESS EXPANDABLE ITEMS--------------------------------------------- */
function toggleExpand(event) {
    var icon = event.currentTarget;
    var expandable = icon.closest('.expandable');
    var content = expandable.querySelector('.expandable-content-wrap');

    if (expandable.classList.contains('expanded')) {
        expandable.classList.remove('expanded');
        content.style.display = 'none';
        icon.innerText = '►';
    } else {
        expandable.classList.add('expanded');
        content.style.display = 'block';
        icon.innerText = '⬇';
    }
}

var icons = document.getElementsByClassName('icon');
for (var i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', toggleExpand);
}

/*SORTABLE EXPANDABLE ITEMS */
$(function () {
    $('#side').sortable({
        cursor: "n-resize",
        helper: function (_, ui) {
            var $clone = $(ui).clone();
            $clone.css('position', 'absolute');
            return $clone.get(0);
        },
        start: function (_, ui) {
            ui.item.show();
            ui.helper.css(
                {
                    'z-index': 1000,
                    'opacity': 0.5
                }
            );
        },

    });
    $("#side").disableSelection();
});

//SYCHRORNIZE NAVIGATION----------------------------------------------------------------
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


// PROCESS EMOJI DROPDOWN----------------------------------------------------------------
const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.emoji-select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.emoji-menu');
const options = dropdown.querySelectorAll('.emoji-menu li');
const selected = dropdown.querySelector('.emoji-selected');

select.addEventListener('click', () => {
    select.classList.toggle('emoji-select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('emoji-menu-open');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('emoji-select-clicked')
        document.getElementById('addButton').addEventListener('click', () => {
            caret.classList.remove('caret-rotate');
        }
        );

        menu.classList.remove('emoji-menu-open');
    });
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        select.classList.remove('emoji-select-clicked');
        document.getElementById('addButton').addEventListener('click', () => {
            caret.classList.remove('caret-rotate');
        }
        );
        menu.classList.remove('emoji-menu-open');
    }
});

//ADD NEW EMOJI AND SORTABLE EMOJI LIST----------------------------------------------------------------
const dragDropContent = document.querySelector('.drag-drop-content');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
    const newEmoji = document.querySelector('.emoji-selected').innerText
    dragDropContent.innerHTML += `<div class = "drag-drop-content-item-wrapper">
    <div class="drag-drop-content-item"> ${newEmoji} </div>
    <p>${getEmojiName(newEmoji)}</p>
    </div>
    `;
});

$(function () {
    $(".drag-drop-content").sortable({
        placeholder: "ui-sortable-placeholder",
        cursor: "move",
        tolerance: "pointer",
        start: function (_, ui) {
            ui.placeholder.height(ui.item.outerHeight());
            ui.placeholder.width(ui.item.outerWidth());
        }
    });
});

//DROPDOWN TO ENTER TEXT-----------------------------------------------------------
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

//DROPDOWN TO SETTING TEXT----------------------------------------------------------------
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

// CHANGE ATTRIBUTE TEXT IN REALTIME------------------------------------------------------
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

        $('.contentText').css({
            'font-weight': fontWeight,
            'font-style': fontStyle,
            'text-decoration': textDecoration
        });


    });
});


// PROCESS TEXT
$(document).ready(function () {
    const originalContent = $('#editContent').html();

    function processText(action) {
        var enterText = $('#enterText').val();
        if (!enterText) return;

        const pattern = new RegExp(enterText, 'g');

        function traverseNode(node) {
            if (node.nodeType === 3) {
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

        if (action === 'delete') {
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




function getEmojiName(emoji) {
    let name;
    switch (emoji) {
        case '🐁':
            name = "Mouse";
            break;
        case '🐃':
            name = "Buffalo";
            break;
        case '🐅':
            name = "Tiger";
            break;
        case '🐈':
            name = "Cat";
            break;
        case '🐉':
            name = "Dragon";
            break;
        case '🐍':
            name = "Snack";
            break;
        case '🐎':
            name = "Horse";
            break;
        case '🐐':
            name = "Goat";
            break;
        case '🐒':
            name = "Monkey";
            break;
        case '🐓':
            name = "Chicken";
            break;
        case '🐕':
            name = "Dog";
            break;
        case '🐖':
            name = "Pig";
            break;
        default:
            name = "Invalid name";
            break;
    }
    return  name;
}
