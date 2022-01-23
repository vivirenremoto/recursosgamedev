

var userLang = navigator.language || navigator.userLanguage; 
var default_lang = userLang.substr(0,2);
var exdays = 365;

function changeLang(lang){
    default_lang = lang;
    if( i18n[default_lang] ){
        $('.lang').each(function(){
            var value = i18n[default_lang][ $(this).data('lang-default') ];
            $(this).html( value );
        });
    }else{
        $('.lang').each(function(){
            var value = $(this).data('lang-default');
            $(this).html( value );
        });
    }


    var page_title = '🎮 ';
    if( $('h1').length ){
        page_title += $('h1').html() + ' - ';
    }
    page_title += $('.navbar-brand .lang').html();
    document.title = page_title;
}

$(function(){
    $('.dropdown-item').click(function(){
        default_lang = $(this).attr('href').replace('#','');
        setCookie('default_lang', default_lang, exdays);
        changeLang(default_lang);
    });

    $('.lang').each(function(){
        $(this).data('lang-default', $(this).html() );
    });

    var cookie_lang = getCookie('default_lang');
    if( cookie_lang ){
        default_lang = cookie_lang;
    }

    if( document.location.href.indexOf('#') > -1 ){
        default_lang = window.location.hash.replace('#','');
        setCookie('default_lang', default_lang, exdays);
        changeLang(default_lang);
    }else{
        changeLang(default_lang);
    }

});

