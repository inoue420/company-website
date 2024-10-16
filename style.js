// style.js
$(document).ready(function() {
    // ハンバーガーメニューのトグル
    $('.c-navIcon').click(function() {
        $('.c-globalNav').slideToggle();
    });

    // ドロップダウンメニューの表示
    $('.m-globalNav_listLink').hover(
        function() {
            $(this).find('.m-dropMenu').slideDown();
        },
        function() {
            $(this).find('.m-dropMenu').slideUp();
        }
    );
});