(function(e) {
    var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    !matches ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
            return e === th;
        });
    }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));


function getScrollbarSize() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';
    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);

    var scrollWidth;

    if(document.body.offsetHeight > window.innerHeight) {
        scrollWidth = widthNoScroll - widthWithScroll;
    } else {
        scrollWidth = 0;
    }

    return scrollWidth;
}

var counterFilter = new CounterFilter;

$('body').on('click', '[data-target="modal-filter"]', function (evt) {

    // если нажимаю на очистить поля
    if($(evt.target).hasClass('js-clear-counter')) return;
    var header = $(this).find('.dropdown__title').text();
    var btnClear = $('<div class="modal__clear text-link">Очистить</div>');

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        target: $(this),
        cb: {
            beforeOpen: function () {
                this.modal.find('.modal__title').text(header);
                this.modal.find('.modal__nav').append(btnClear);
                var _this = this;

                btnClear.on('click', function () {
                    counterFilter.clearCounter(_this.modal);
                });
            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new dropdownModal(params);
    modal.init();
})

/**
 * сворачивает все выпадающие блоки
 * */
function closeDropDown(evt) {
    var _this = $(evt.target);
    if(_this.closest('.dropdown').length) return;
    $('.dropdown.show').removeClass('show');
    $('body').off('click', closeDropDown);

}

$('body').on('click', '[data-target="modal-dropdown"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        target: $(this),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new dropdownModal(params);
    modal.init();
})


$('body').on('click', '[data-target="modal-tab"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        target: $(this),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new ModalTab(params);
    modal.init();
});
$('body').on('click', '[data-target="modal-ajax"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        target: $(this),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new AjaxModal(params);
    modal.init();

    setInterval(function () {
        modal.replaceContent($('<p> а теперь я умный контент</p>'))
    }, 500)
});
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

$('body').on('click', '.js-select-delivery', function () {
    var nameId = $(this).attr('id');
    var name = $(this).attr('name');
    var value = $('[for="' + nameId + '"]').text();

    $('[data-dropdown-type=' + name +'] .dropdown__title').text(value)
})
$('body').on('click', '[data-target="modal-map"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        content: $(this).attr('data-id-content'),
        target: $(this),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new CrazyModal(params);
    modal.init();
});

function AjaxModal(params) {
    this._super.call(this, params);
    this.target = params.target;
    this.content = $('<p>я заглушка</p>');
}

AjaxModal.prototype = Object.create(CrazyModal.prototype);
AjaxModal.prototype.constructor = CrazyModal;
AjaxModal.prototype._super = CrazyModal;


AjaxModal.prototype.replaceContent = function(content) {
    this.content = content;
    this.modal.find('.modal__body').empty();
    this.modal.find('.modal__body').append(this.content);
}
function CounterFilter() {
    this.counters = {};
    this.counterMain = 0;
    this.selectedClass = 'selected';

    this.init();
}

CounterFilter.prototype.changeCheckedFilter = function(evt) {
    var target = $(evt.target);

    var isChecked = target.is(":checked");
    var name = target.attr('name');

    if(typeof this.counters[name] !== "undefined") {
        this.counters[name] =  isChecked ?  ++this.counters[name] : --this.counters[name];
    } else {
        this.counters[name] = 1;
    }

    this.counterMain = isChecked ?  ++this.counterMain : --this.counterMain;

    this.updateCounter(name);
};

CounterFilter.prototype.updateCounter = function(name) {

    $('.js-full-counter').text(this.counterMain);

    var parent = $('[data-dropdown-type="' + name +'"]')
    parent.find('.js-counter-val').text(this.counters[name]);

    if(this.counters[name] > 0) {
        parent.addClass(this.selectedClass);
    } else {
        parent.removeClass(this.selectedClass);
    }
}


CounterFilter.prototype.clearCounter = function(parent) {
    var currentCounter = parent.find('.js-counter:checked');
    var name = currentCounter.eq(0).attr('name');
    this.counters[name] = 0;
    this.counterMain = this.counterMain - currentCounter.length;

    currentCounter.each(function () {
        $(this).prop('checked', false);
    })

    this.updateCounter(name);
}

CounterFilter.prototype.init = function() {
    var changeCheckedFilter = $.proxy(this.changeCheckedFilter, this);
    var clearCounter = $.proxy(this.clearCounter, this);

    $('body').on('change', '.js-counter', changeCheckedFilter);

    $('body').on('click','.js-clear-counter', function () {
        var parent = $(this).closest('.dropdown');
        clearCounter(parent);
    });
}

/**
 *
 *
 * */
function CrazyModal(params) {
    this.modal = false;
    this.index = Modals.getIndex();

    this.template = params.template;
    this._content = params.content;
    this.content = $('[data-content=' + params.content + ']').children();
    this.overlay = $('.overlay').clone();
    this.animation = params.animation;
    this.evtClickOverlay = params.evtClickOverlay;
    this.evtClickBtnClose = params.evtClickBtnClose;
    this.modalsOverlay = params.modalsOverlay;
    this.cb = params.cb;
}

CrazyModal.prototype.refreshOverlayIndex = function() {
    console.log(this.index)
    this.overlay.css('zIndex', this.index - 2);
    Modals.setIndex(this.index);
    this.overlay.attr('data-index', this.index);
    this.overlay.attr('data-close', this.evtClickBtnClose);
}

CrazyModal.prototype.controller = function () {
    var _this = this;

    this.modal.on('click', '[data-target="close"]', function () {
        // closest необходим для ситуации модалка в модалке
        var modal = $(this).closest('.modal');

        if(_this.evtClickBtnClose == 'all') {
            _this.hideOverlay();
            $('body').prop('style', false);
        } else if(_this.evtClickBtnClose == 'this') {
            Modals.refreshOverlayIndex();
        }
        _this.hideModal(modal);

    });
};

CrazyModal.prototype.removeModal = function() {
    this.modal.prop('style', false);
    // вернуть элемент на место
    if(this._content) {
        $('[data-content=' + this._content + ']').append(this.content);
    }
    this.modal.remove();
};

CrazyModal.prototype.hideModal = function(modal) {
    modal.removeClass('show');
    modal.attr('data-state', false);
    var _this = this;
    Modals.popModals();
    var removeModal = $.proxy(this.removeModal, this)
    this.animated('hide', removeModal);
};

CrazyModal.prototype.renderOverlay = function () {
    $('body').append(this.overlay);
}

CrazyModal.prototype.createModal = function () {
    var temp = $('[data-template='  + this.template + ']');
    if(!temp.length) {
        console.error('шаблон ' + this.template + ' не найден');
        return;
    }
    this.modal = temp.clone();
    this.modal.removeAttr('data-template');
    this.modal.find('.modal__body').append(this.content);

    this.modal.addClass('show');
    this.modal.attr('data-state', 'open');

    var overlay = $('.overlay.show');

    if(overlay.length) {
        //this.index = index.attr('data-index');
        this.index = Modals.getIndex();
    }

    if(this.modalsOverlay == 'all') {
        this.overlay.css('zIndex', this.index);
        this.increaseIndex();
    }

    this.modal.css('zIndex', this.index);
    this.increaseIndex();
    // this.index ++;
    // Modals.setIndex(this.index);
    // index.attr('data-index', this.index);
}

CrazyModal.prototype.showOverlay = function() {
    var overlay = $('.overlay.show');
    console.log(this.index)
    if(overlay.length) {
        this.overlay = overlay;
        //this.index = this.overlay.attr('data-index');
        this.index = Modals.getIndex();

    } else {
        this.renderOverlay();
        this.overlay.attr('data-state', 'open');
        this.overlay.css('zIndex', this.index);
        this.increaseIndex();
        this.overlay.addClass('show');
    }

    this.overlay.attr('data-close', this.evtClickOverlay);
    this.overlay.attr('data-index', this.index);
};

CrazyModal.prototype.increaseIndex = function() {
    this.index ++;
    Modals.setIndex(this.index);
    this.overlay.attr('data-index', this.index);
}

CrazyModal.prototype.animated = function(action, cb) {
    switch (this.animation) {
        case 'right' :
            this.modal.animate({
                    right: action == 'show'? 0 : '-640px',
                }, 300,
                function () {
                    if(!cb) return;
                    cb();
                })
            break;
    }
};

CrazyModal.prototype.showModal = function() {

    $('body').append(this.modal);
    if(this.cb.beforeOpen) {
        var beforeOpen = $.proxy(this.cb.beforeOpen, this)
        beforeOpen();
    }

    this.animated('show');
};

CrazyModal.prototype.hideOverlay = function() {
    var _this = this;
    this.overlay.removeClass('show');
    this.overlay.attr('data-state', false);
    this.overlay.attr('data-index', false);
    setTimeout(function () {
        _this.overlay.prop('style', false);
        _this.overlay.remove();
    }, 400);
},

CrazyModal.prototype.show = function() {

    $('body').css({'overflow': 'hidden', 'marginRight': getScrollbarSize()});
    this.showOverlay();
    this.createModal();
    this.showModal();
    //this.overlay.attr('data-index', this.index);
    //Modals.setIndex(this.index);
    Modals.pushModals(this);
},

CrazyModal.prototype.init = function() {
    this.show();
    this.controller();
}

/**
 * атрибуты шаблона модального окна
 * data-template название шаблона
 * */
function dropdownModal(params) {
    this._super.call(this, params);
    this.target = params.target;
}

dropdownModal.prototype = Object.create(CrazyModal.prototype);

dropdownModal.prototype.constructor = CrazyModal;
dropdownModal.prototype._super = CrazyModal;


dropdownModal.prototype.openDropDown = function() {
    var dropdownWrapper = this.target.closest('.dropdown');

    if(dropdownWrapper.hasClass('show')) {
        dropdownWrapper.removeClass('show');
    } else {
        $('.dropdown.show').removeClass('show');
        dropdownWrapper.addClass('show');
    }
};

dropdownModal.prototype.init = function() {

    var width = $(window).width();
    if(width < 768) {
        this.show();
        this.controller();
    } else {
        this.openDropDown();
        $('body').on('click', closeDropDown)
    }
}




// function FilterModal(params) {
//     this._super.call(this, params);
//     this.target = params.target;
// }
//
// FilterModal.prototype = Object.create(dropdownModal.prototype);
//
// FilterModal.prototype.constructor = dropdownModal;
// FilterModal.prototype._super = dropdownModal;
//
//
// FilterModal.prototype.renderHeader = function() {
//     var header = this.target.find('.dropdown__title').text();
//     this.modal.find('.modal__title').text(header);
// }
function ModalController() {
    this.modals = [];
    this.defaultIndex = 1000;
    this.index = this.defaultIndex;

    this.init();
}

ModalController.prototype.init = function() {
    var _this = this;

    $('body').on('click', '.overlay.show', function () {
        var typeClose = $(this).attr('data-close');
        var lastElem = _this.modals[_this.modals.length-1];
        console.log(typeClose)
        switch (typeClose) {
            case 'all' :
                $(_this.modals).each(function (val, item) {
                    item.hideModal(item.modal);
                });
                _this.modals = [];
                _this.index = _this.defaultIndex;
                lastElem.hideOverlay();
                break;
            case 'this':
                _this.refreshOverlayIndex();
                lastElem.hideModal(lastElem.modal);
                if(_this.modals.length == 0) {
                    _this.index = _this.defaultIndex;
                }
                break;
        }
    });
};

ModalController.prototype.setIndex = function(index) {
    this.index = index;
}

ModalController.prototype.getIndex = function() {
    return this.index;
}

ModalController.prototype.pushModals = function(modal) {
    this.modals.push(modal);
}

ModalController.prototype.popModals = function() {
    this.modals.pop();
}

ModalController.prototype.refreshOverlayIndex = function() {
    if(this.modals.length != 1) {
        this.modals[this.modals.length-2].refreshOverlayIndex();
    }
}

var Modals = new ModalController();
function ModalTab(params) {
    this._super.call(this, params);
    this.target = params.target;
    this.contentWrapper = $('[data-content=' + params.content + ']');
}


ModalTab.prototype = Object.create(CrazyModal.prototype);

ModalTab.prototype.constructor = CrazyModal;
ModalTab.prototype._super = CrazyModal;


ModalTab.prototype.toggleContent = function() {
    $('.modal-tab.show').removeClass('show');
    this.contentWrapper.addClass('show');
};

ModalTab.prototype.init = function() {
    var width = $(window).width();

    if(width < 768) {
        this.show();
        this.controller();
    } else {
        this.toggleContent();
    }
}
$('body').on('click', '[data-target="modal"]', function (evt) {
    evt.preventDefault();

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new CrazyModal(params);
    modal.init();
    Modals.pushModals(modal);
});



