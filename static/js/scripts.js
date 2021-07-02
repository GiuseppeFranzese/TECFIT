window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("button-chat").style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("button-chat").style.display = "block";
}

$(document).ready(function() {
    $("form").on("submit", function(event) {
        var x = '';
        var rawText = $("#text").val();
        var rawTextArea = $("#textArea").val();
        $("#text").val('');
        if(rawTextArea != '')
            x = '\n'
        rawText = "You: " + rawText;
        $('#textArea').val(rawTextArea + x + rawText);
        document.getElementById("userInput").scrollIntoView({
            block: "start",
            behavior: "smooth",
        });
        $.ajax({
            data: {
                msg: rawText,
            },
            type: "POST",
            url: "http://127.0.0.1:5000",
        }).done(function(data) {
            console.log(data);
            var rawText2 = $("#textArea").val();
            data = "Bot: " + data;
            $('#textArea').val(rawText2 + "\n" + data);
            scrollText();
            document.getElementById("userInput").scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
        });
        event.preventDefault();
    });
});

var x=150;
function scrollText(){
    x+=150;
    $('#textArea').scrollTop(x);
}
