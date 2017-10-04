/*

   jQuery Inline Nav Plugin

   Copyright (c) 2017 James Kolsby (jmkl.co)

   @Version 1.0.0

   Example usage:
   $('nav').inlineNav();

   */
(function($) {

	var InlineNav = function(el, options) {
		this.el = el;
		this.$el = $(el);
        this.options = options;

        this.$currentMenu;
        this.$parentMenu;
        this.$backButton;
	}

    const CLASS_LEFT = "is-left";
    const CLASS_SHOW = "is-show";
    const CLASS_ROOT = 'is-root';
    const CLASS_RIGHT = "is-right";
    const CLASS_MIDDLE = "is-middle";
    const CLASS_TRANSITION = "is-transition"

    InlineNav.prototype = {
        defaults: {
            menuTag: 'ul',
            itemTag: 'li'
        },

        init: function() {
            this.config = $.extend({}, this.defaults, this.options);

            var menus = this.$el.find(this.config.menuTag);

            this.$currentMenu = $(menus[0]);

            this.$backButton = $("<div></div>")
                .addClass('is-back');
            this.$backButton.data("nav", this);
            this.$backButton.appendTo(this.$el);

            this.$backButton.click(function() {
                var nav = $(this).data("nav");
                nav.ascend(nav.$parentMenu);
            }); 

            for (var i = 0; i < menus.length; i++) {

                var $menu = $(menus[i]);
                var $parentItem = $menu.parent(this.config.itemTag);
                var $parentMenu = $parentItem.parent(this.config.menuTag);

                $menu.addClass(CLASS_RIGHT);

                if ($parentItem.length) {

                    $menu.data({
                        "parentMenu": $parentMenu
                    }); 

                    $parentItem.data({
                        "nav": this,
                        "childMenu": $menu
                    });

                    $parentItem.click(function() {
                        var nav = $(this).data("nav");
                        var $childMenu = $(this).data("childMenu");
                        nav.descend($childMenu);
                    });
                }

                $menu.appendTo(this.$el);
            }
            
            this.descend(this.$currentMenu);
            this.$el.addClass(CLASS_SHOW);
        },

        descend: function($newMenu) { this.makeMenu($newMenu, true); },

        ascend: function($newMenu) { this.makeMenu($newMenu, false); },

        makeMenu: function($newMenu, descend) {
            this.$el.css("width", $newMenu.width());

            if (descend) {

                console.log('descend');

                $newMenu.removeClass(CLASS_TRANSITION)
                        .addClass(CLASS_RIGHT)
                        .addClass(CLASS_TRANSITION)
                        .addClass(CLASS_MIDDLE)
                        .removeClass(CLASS_RIGHT);

                if ($newMenu !== this.$currentMenu) {
                    this.$currentMenu.addClass(CLASS_TRANSITION)
                                     .addClass(CLASS_LEFT)
                                     .removeClass(CLASS_MIDDLE);
                }

                this.$parentMenu = this.$currentMenu;
                this.$currentMenu = $newMenu;

            } else {

                console.log('ascend');
                
                $newMenu.removeClass(CLASS_TRANSITION)
                        .addClass(CLASS_LEFT)
                        .addClass(CLASS_TRANSITION)
                        .addClass(CLASS_MIDDLE)
                        .removeClass(CLASS_LEFT);

                if ($newMenu !== this.$currentMenu) {
                    this.$currentMenu.addClass(CLASS_TRANSITION)
                                     .addClass(CLASS_RIGHT)
                                     .removeClass(CLASS_MIDDLE);
                }
                
                console.log(this.$parentMenu);
                this.$currentMenu = this.$parentMenu;
                this.$parentMenu = this.$currentMenu.data("parentMenu");

            }

            if (this.$currentMenu.data("parentMenu"))
                this.$backButton.addClass(CLASS_SHOW);
            else
                this.$backButton.removeClass(CLASS_SHOW);
        } 

    };

	$.fn.inlineNav = function(options) {
		return this.each(function() {
			new InlineNav(this, options).init();
		});
	};
}(jQuery));
