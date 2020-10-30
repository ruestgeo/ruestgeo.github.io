function hamburger_toggle(x) {
    console.log("hamburger toggle on ["+x+"]");
    document.getElementById(x).classList.toggle("hamburger_change");
}
function hamburger_reset(x){
    console.log("hamburger reset on ["+x+"]");
    document.getElementById(x).classList.remove("hamburger_change");
}

$(document).ready(function() {


    /*$('').click(function() {
        console.log("");
    });*/

    $('button').attr("ontouchstart",""); //https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
    


    //https://stackoverflow.com/questions/18545077/image-fullscreen-on-click
    $('#projects img').addClass('img-enlargable').click(function(){
        var src = $(this).attr('src');
        console.log("image clicked -> src: "+src);
        $('<div>').css({
            background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
            backgroundSize: 'contain',
            width:'100%', height:'100%',
            position:'fixed',
            zIndex:'10000',
            top:'0', left:'0',
            cursor: 'zoom-out'
        }).click(function(){
            $(this).remove();
        }).appendTo('body');
    });

    //https://stackoverflow.com/questions/4211909/disable-dragging-an-image-from-an-html-page
    $('img').on('dragstart', function(event) { event.preventDefault(); });

    //https://codepen.io/robgolbeck/pen/yePRwa
    defaultFontSize = parseInt($('body').css('font-size'));

    $('#bigger_text').click(function() {
        curSize = parseInt($('body').css('font-size'));
        console.log("++: size "+curSize+" to "+(curSize+2));
        if (curSize < 24){
            $('body').css('font-size', (curSize+2)+"px");
            hamburger_reset('hamburger_menu');
            myMenu.removeScroll();
            setTimeout(function() {myMenu.recalculateMenu();}, 300);
        }
            
    });
    
    $('#reset_text').click(function() {
        curSize = parseInt($('body').css('font-size'));
        console.log("//: size "+curSize+" to "+defaultFontSize);
        if (curSize != defaultFontSize){
            $('body').css('font-size', defaultFontSize+"px");
            hamburger_reset('hamburger_menu');
            myMenu.removeScroll();
            setTimeout(function() {myMenu.recalculateMenu();}, 300);
        }
    });
    
    $('#smaller_text').click(function() {
        curSize = parseInt($('body').css('font-size'));
        console.log("--: size "+curSize+" to "+(curSize-2));
        if (curSize > 9){
            $('body').css('font-size', (curSize-2)+"px");
            hamburger_reset('hamburger_menu');
            myMenu.removeScroll();
            setTimeout(function() {myMenu.recalculateMenu();}, 300);
        }
    });


    //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_matchmedia
    //https://www.w3schools.com/howto/howto_js_accordion.asp
    //https://www.w3schools.com/howto/howto_js_slideshow.asp

    var slideIndex = 0;
    Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
        var projectDiv = element.nextElementSibling;
        element.classList.add("projectHeader");
        projectDiv.classList.add("projectBlock");
    });

    function PhoneViewHandler(a) {
        if (a.matches) { // If media query matches
            console.log("window is 600px or less"); //phone view
            showAllSlides();
            Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
                element.disabled = false;
                element.style.display = "block";
                var projectDiv = element.nextElementSibling;
                //neprojectDivxt.style.display = "none";
                element.classList.remove("active");
            });
        } else {
            console.log("window exceeds 600px");
            Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
                //element.disabled = true;
                var projectDiv = element.nextElementSibling;
                //projectDiv.style.display = "block";
                element.classList.add("active");
            });
            TabletViewHandler(window.matchMedia("(max-width: 970px)"));
        }
    }
    function TabletViewHandler(t) {
        var p = window.matchMedia("(max-width: 600px)");
        Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
            element.disabled = true;
        });
        if (t.matches && !p.matches) {
            console.log("window is between 970px and 601px"); //tablet view
            showSlides(slideIndex);
        }
        else {
            console.log("window greater than 970px");
            showAllSlides();
        }
    }
    
    
      
    var phoneView = window.matchMedia("(max-width: 600px)");
    var tabletView = window.matchMedia("(max-width: 970px)");
    

    PhoneViewHandler(phoneView);
    tabletView.addListener(TabletViewHandler);
    phoneView.addListener(PhoneViewHandler);


    
    


    Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
        element.addEventListener("click", function() {
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
                    var projectDiv = element.nextElementSibling;
                    projectDiv.style.maxHeight = null;
                    element.classList.remove("active");
                });
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            /*if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                Array.from(document.getElementsByClassName("collapsable_div")).forEach(element => {
                    var projectDiv = element.nextElementSibling;
                    projectDiv.style.display = "none";
                    element.classList.remove("active");
                });
                panel.style.display = "block";
            }*/
            this.classList.toggle("active");
        });
    });

    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    function showSlides(n) {
        var i;
        var slidesHeader = document.getElementsByClassName("projectHeader");
        var slides = document.getElementsByClassName("projectBlock");
        if (n >= slides.length) {slideIndex = 0}    
        if (n < 0) {slideIndex = slides.length-1}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slidesHeader[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";  
        slidesHeader[slideIndex].style.display = "block"; 
    }
    function showAllSlides(){
        var slidesHeader = document.getElementsByClassName("projectHeader");
        var slides = document.getElementsByClassName("projectBlock");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "block";
            slidesHeader[i].style.display = "block";
        }
    }
    function showSlideHeaders(){
        var slidesHeader = document.getElementsByClassName("projectHeader");
        for (i = 0; i < slides.length; i++) {
            slidesHeader[i].style.display = "block";
        }
    }



    $('#p1-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 0;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p2-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 1;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p3-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 2;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p4-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 3;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p5-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 4;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p6-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 5;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p7-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 6;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p8-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 7;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    $('#p9-b').click(function() {
        if (tabletView.matches && !phoneView.matches){
            console.log($(this).attr('id')+" to slideshow slide");
            slideIndex = 8;
            showSlides(slideIndex);
        }
        else console.log($(this).attr('id')+" button pressed");
    });
    

    
    $("#space-invader-icon").click(function() {
        console.log("invader icon pressed");
        var e = document.getElementById("my_name");
        var e2 = e.cloneNode(true);
        e.parentNode.replaceChild(e2, e);
        //location.reload();
        //$("#space-invader-icon").load(window.location.href + " #space-invader-icon");
        
    });
    

    $('.prev').click(function() {
        console.log("previous slide");
        plusSlides(-1);
    });
    $('.next').click(function() {
        console.log("next slide");
        plusSlides(1);
    });
}); 




  
