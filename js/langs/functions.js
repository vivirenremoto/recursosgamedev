

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
        
        $('.lang_url').each(function(){
            var value = $(this).data('lang-default').split('_')[0] + '_' + default_lang + '.html';
            $(this).attr('href', value);
        });
    }else{
        $('.lang').each(function(){
            var value = $(this).data('lang-default');
            $(this).html( value );
        });
        
        $('.lang_url').each(function(){
            var value = $(this).data('lang-default');
            $(this).attr('href', value);
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

    var html_lang = '';
    for(var i=0; i<available_langs.length; i++){
        html_lang += '<li><a class="dropdown-item" href="#' + available_langs[i] + '">' + available_langs[i].toUpperCase() + '</a></li>';
    }
    $('.dropdown-menu').html(html_lang);


    $('.dropdown-item').click(function(){
        default_lang = $(this).attr('href').replace('#','');
        setCookie('default_lang', default_lang, exdays);

        if( document.location.href.indexOf('_') > -1 ){
            var url_aux = document.location.href.split('/')[0];
            url_aux = document.location.href.split('#')[0];
            url_aux = url_aux.split('_')[0] + '_' + default_lang + '.html';
            document.location = url_aux;
        }else{
            changeLang(default_lang);
        }
    });

    $('.lang').each(function(){
        $(this).data('lang-default', $(this).html() );
    });

    $('.lang_url').each(function(){
        $(this).data('lang-default', $(this).attr('href') );
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

