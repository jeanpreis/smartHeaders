function adjustTableHeader(element) {
    //add tweaks here.
    var width = element.closest('.container').outerWidth();
    var left = element.closest('.container').offset().left;
    element.width(width);
    element.css('left', left);

    console.log(element);
}

$('.container').bind("scroll", function () {
    $('header').each(function (idx) {
        var originalTop = $(this).closest('.item-container').position().top
        var containerScrollTop = $(this).scrollTop();
        var noHeaderHeight = $(this).parent().siblings('article').outerHeight();
        var nextPosition;
        var height;
        var stopPosition;

        if ($('header').length > 1 && idx + 1 <= $('header').length - 1) {
            nextPosition = $('header').eq(idx + 1).closest('.item-container').position().top - $('header').eq(idx + 1).height();
            height = $('header').parent().outerHeight();
        }

        if (originalTop <= containerScrollTop) {
            $(this).addClass('header-fixer');
            adjustTableHeader($(this));

            if (nextPosition) {
                stopPosition = nextPosition - noHeaderHeight - height;
                if (stopPosition < 0) {
                    $(this).css('top', stopPosition);
                    $('header').eq(idx + 1).addClass('header-fixer');

                    if (nextPosition <= height) {
                        $(this).removeClass('header-fixer');
                    }
                } else {
                    $(this).css('top', 0);
                }
            }

        } else {
            $(this).removeClass('header-fixer');
            $(this).removeAttr('style');
        }
    });
});