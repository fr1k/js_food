$(document).ready(function () {
    const tabs = $(".tabheader__item");
    const tabContent = $(".tabcontent");
    
    $('.tabcontent:first').addClass('show');
    $('.tabcontent:not(:first)').addClass('hide');
    
    $('.tabheader__item').click(function (e) { 
        e.preventDefault();
        
    });
});
