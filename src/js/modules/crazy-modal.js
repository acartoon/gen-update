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