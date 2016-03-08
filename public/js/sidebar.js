$(function () {
    var $side_menu = $('div .menu_main, div .menu_sub')
    $side_menu.on('mouseover', function () {
        console.log('over')
        $(this).addClass("current")
        $(this).parent(".row").children(".menu_sub").show()
    });
    $side_menu.on('mouseout', function () {
        $(this).removeClass("current")
        var this_menu = $(this).parent(".row").children(".menu_sub");
        this_menu.hide();
        console.log('out')
    })
})