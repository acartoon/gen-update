function tab(target) {
    var activeClass = 'active';
    var disabledClass = 'disabled';
    var selectAttr = 'data-selected';
    var parentClass = '.tabs';
    var group = target.closest(parentClass);

    if(target.hasClass(activeClass) || target.hasClass(disabledClass) ) return;

    var contentId = target.attr('data-id-content');
    var content = group.find('[data-content="'+ contentId + '"]');

    function show(element) {
        element.addClass(activeClass);
        element.attr(selectAttr, true);
    }

    function hide(element) {
        element.removeClass(activeClass);
        element.attr(selectAttr, false);
    }

    hide($('.nav-tabs__item.' + activeClass));
    hide($('.tab-content__item.' + activeClass));

    show(content);
    show(target);
}

$('body').on('click', '[data-target="tab"]', function () {
    tab($(this));
});


function accordionToggle(target, type = 'default') {
    var parentClass = '.accordion';
    var parent = target.closest(parentClass);
    var group = parent.attr('data-accordion-group');
    var disabledClass = 'disabled';
    var activeClass = 'active';

    if(target.hasClass(disabledClass)) return;

    switch (type) {
        case 'toggle':
            if(parent.hasClass(activeClass)) return;
            var other = $('.accordion.active[data-accordion-group=' + group + ']');
            other.find('.accordion__body')._toggle();
            other.removeClass(activeClass);

            parent.find('.accordion__body')._toggle();
            parent.addClass(activeClass);
            break;
        case 'default':
            parent.find('.accordion__body')._toggle();
            parent.toggleClass(activeClass);
            break;
    }
}

$('body').on('click', '[data-target="accordion"]', function () {
    var type = $(this).attr('data-accordion-type');
    accordionToggle($(this), type);
})

jQuery.fn._toggle = function() {
    var st = this.css('display');
    var target = this;
    if(st == 'none') {
        this.css('display', 'block');
        var height = 0;
        this.children().each(function () {
            height += $(this).outerHeight(true);
        });

        this.height(0);
        this.animate({
            height: height,
        }, 400, function () {
            target.css('height', '');
            target.css('display', '');
        })
    } else {
        this.css('overflow', 'hidden');
        this.css('display', 'block');
        this.animate({
            height: 0,
        }, 400, function () {
            target.css('overflow', '');
            target.css('display', '');
            target.css('height', '');
        })

    }
}