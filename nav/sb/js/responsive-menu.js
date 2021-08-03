;(function($,window,document,Math,undefined){'use strict';var pluginName='rMenu';var Plugin=function(el,options){var o=this;o.optionsInit={minWidth:'769px',transitionSpeed:400,jqueryEasing:'swing',css3Easing:'ease',toggleBtnBool:true,toggleSel:'.rm-toggle',menuSel:'ul',menuItemsSel:'li',animateBool:true,accelerateBool:false,setupCallback:false,tabindexStart:1,developmentMode:false};o.options=$.extend({},o.optionsInit,options);o.tButton=$(o.options.toggleSel);o.tButtonClass='rm-button';o.tButtonShowClass='rm-show';o.tButtonActiveClass='rm-active';o.el=$(el);o.navElementClass='rm-nav';o.container=o.el.parent();o.containerClass='rm-container';o.expandedClass='rm-layout-expanded';o.contractedClass='rm-layout-contracted';o.noJSClass='rm-nojs';o.menus=o.el.find(o.options.menuSel);o.menuClass='rm-menu';o.topMenu=o.el.children(o.options.menuSel);o.topMenuClass='rm-top-menu';o.menuExpandedClass='rm-menu-expanded';o.menuHiddenClass='accessibly-hidden';o.menuCalcClass='rm-calculate';o.menuItemClass='rm-menu-item';o.itemFocused=false;o.parentClass='rm-parent';o.itemHoverClass='rm-hover';o.itemFirst='rm-first';o.itemLast='rm-last';o.item2ndLast='rm-2nd-last';o.animateClass='rm-css-animate';o.animateBool=o.options.animateBool;o.accelerateClass='rm-accelerate';o.accelerateBool=o.options.accelerateBool;o.touchMoveBool=false;o.timer=false;o.windowWidth=$(window).width();o.init=function(){o.setup();$(window).on({'resize':function(){if($(window).width()!==o.windowWidth){o.windowWidth=$(window).width();clearTimeout(o.timer);o.timer=setTimeout(o.adjust,500);}}});if(typeof(o.options.setupCallback)==="function"){o.options.setupCallback();}
return this;};o.setup=function(){o.container.addClass(o.containerClass);if(o.options.toggleBtnBool){o.tButton.addClass(o.tButtonClass);}else{o.tButton.removeClass(o.tButtonClass);}
o.tButton.removeClass(o.noJSClass).off('mousedown.rm focusin.rm click.rm').on('mousedown.rm focusin.rm',tButtonFocus).on('click.rm',tButtonClick).attr('tabindex',0);o.menus.addClass(o.menuClass).attr('aria-hidden','false').hide();o.topMenu.addClass(o.topMenuClass);if(o.animateBool){if(typeof Modernizr!=='undefined'){if(!Modernizr.csstransitions){o.animateBool=false;o.accelerateBool=false;}else if(!Modernizr.csstransforms3d){o.accelerateBool=false;}}else if(!transitionsSupported()){o.animateBool=false;o.accelerateBool=false;}else if(!transform3DSupported()){o.accelerateBool=false;}}else{o.accelerateBool=false;}
if(o.animateBool){o.menus.addClass(o.animateClass);if(o.accelerateBool){o.menus.addClass(o.accelerateClass);}}
o.el.removeClass(o.noJSClass).addClass(o.navElementClass).off('focusin.rm focusout.rm click.rm touchend.rm touchmove.rm').on('focusin.rm',o.options.menuItemsSel,itemFocus).on('focusout.rm',o.topMenu,menuBlur).on('click.rm touchend.rm',o.options.menuItemsSel,itemClick).on('touchmove.rm',o.options.menuItemsSel,touchMove).find(o.options.menuItemsSel).each(function(i){var $el=$(this);$el.addClass(o.menuItemClass).children('a').attr('tabindex',0);if($el.is(':first-child')){$el.addClass(o.itemFirst);}
if($el.is(':last-child')){$el.addClass(o.itemLast).prev().addClass(o.item2ndLast);}}).addBack().removeClass(o.parentClass).has(o.options.menuSel).addClass(o.parentClass);o.adjust();return this;};o.adjust=function(minWidth){minWidth=typeof minWidth!=='undefined'?minWidth:o.options.minWidth;if(typeof Modernizr!=='undefined'&&Modernizr.mq('only all')){if(o.options.developmentMode){console.log('Modernizr: MQ supported');}
if(!Modernizr.mq('( min-width: '+minWidth+' )')){o.layoutContracted();}else{o.layoutExpanded();}}else{if(o.options.developmentMode){console.log('unable to detect MQ support');}
if($(window).outerWidth()<parseInt(minWidth)){o.layoutContracted();}else{o.layoutExpanded();}}};o.layoutContracted=function(){if(!o.container.hasClass(o.contractedClass)){menuBlur({'type':'layoutContracted'});o.container.removeClass(o.expandedClass).addClass(o.contractedClass).find('.'+o.itemHoverClass).removeClass(o.itemHoverClass);if(o.animateBool){o.calculateHeights();}
o.el.off('mouseenter.le mouseleave.le');o.tButton.addClass(o.tButtonShowClass);if(!o.tButton.hasClass(o.tButtonActiveClass)){o.topMenu.addClass(o.menuHiddenClass).show().removeClass(o.menuExpandedClass);}else{o.topMenu.removeClass(o.menuHiddenClass).show().addClass(o.menuExpandedClass);if(o.animateBool){o.topMenu.css({'max-height':'none'});}}}
if(o.options.developmentMode){console.log('responsive-menu: contracted layout');}
return this;};o.layoutExpanded=function(){if(!o.container.hasClass(o.expandedClass)){menuBlur({'type':'layoutExpanded'});o.container.removeClass(o.contractedClass).addClass(o.expandedClass).find('.'+o.itemHoverClass).removeClass(o.itemHoverClass);if(o.animateBool){o.calculateHeights();}
o.el.off('mouseenter.le mouseleave.le').on('mouseenter.le',o.options.menuItemsSel,itemFocus).on('mouseleave.le',o.options.menuItemsSel,itemLeave).on('mouseleave.le',o.topMenu,menuBlur);o.tButton.removeClass(o.tButtonShowClass);o.topMenu.removeClass(o.menuHiddenClass).show().addClass(o.menuExpandedClass);if(o.animateBool){o.topMenu.css({'max-height':'none','overflow':'visible'});}}
if(o.options.developmentMode){console.log('responsive-menu: expanded layout');}
return this;};o.calculateHeights=function(){o.menus.addClass(o.menuCalcClass).removeClass(o.menuExpandedClass).attr('style','').show(0);o.menus.each(function(){var $el=$(this);$el.data('height',$el.height());}).css({'max-height':'0'}).removeClass(o.menuCalcClass);return this;};o.toggleMenu=function(el){contract(o.topMenu);if(!o.topMenu.hasClass(o.menuHiddenClass)){$(el).removeClass(o.tButtonActiveClass);contract(o.container);}else{$(el).addClass(o.tButtonActiveClass);o.topMenu.removeClass(o.menuHiddenClass);if(o.animateBool){o.topMenu.css('max-height','0');}else{o.topMenu.hide(0);}
expand(o.el);}};var tButtonFocus=function(e){e.stopPropagation();var $el=$(e.target);clearTimeout(o.timer);o.timer=setTimeout(function(){o.toggleMenu(e.target);},100);};var tButtonClick=function(e){e.preventDefault();e.stopPropagation();};var itemClick=function(e){var $el=$(e.currentTarget);e.stopPropagation();if(($el.hasClass(o.itemHoverClass)||!$el.hasClass(o.parentClass))&&!o.touchMoveBool){location.href=$el.children('a').attr('href');menuBlur(e);}else if(e.type!=='touchend'){e.preventDefault();}
o.touchMoveBool=false;};var itemFocus=function(e){var $el=$(e.currentTarget);e.stopPropagation();if(e.type!=='focusin'){$el.children('a').not(':focus').focus();}
o.itemFocused=$el;clearTimeout(o.timer);o.timer=setTimeout(function(){if(o.tButton.hasClass(o.tButtonShowClass)&&!o.tButton.hasClass(o.tButtonActiveClass)){o.toggleMenu(o.tButton.get(0));}
if($el.hasClass(o.parentClass)){if(!$el.hasClass(o.itemHoverClass)){contract($el.parent());expand($el);}}else{contract($el.parent());}},100);};var touchMove=function(e){o.touchMoveBool=true;};var menuBlur=function(e){e=e||{'type':'callback'};clearTimeout(o.timer);o.timer=setTimeout(function(){if(o.itemFocused){o.itemFocused.children('a').blur();o.itemFocused=false;}
contract(o.topMenu);},100);};var itemLeave=function(e){var $el=$(e.currentTarget);clearTimeout(o.timer);o.timer=setTimeout(function(){$el.parent().parent().children('a').focus();},100);};var transitionEndContract=function(e){if(e.originalEvent.propertyName==='max-height'){var $el=$(e.currentTarget);e.stopPropagation();$el.css({'transition':'','max-height':'0','overflow':'hidden'}).removeClass(o.menuExpandedClass).off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd').parent().find('.'+o.itemHoverClass).addBack().removeClass(o.itemHoverClass);if($el.hasClass(o.topMenuClass)){$el.addClass(o.menuHiddenClass).show(0);}
scrollMenu(o.itemFocused);}};var transitionEndExpand=function(e){if(e.originalEvent.propertyName==='max-height'){var $el=$(e.currentTarget);e.stopPropagation();$el.removeClass(o.menuHiddenClass).css({'transition':'','max-height':'none','overflow':'visible'}).addClass(o.menuExpandedClass).off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');$el.parent('.'+o.parentClass).addClass(o.itemHoverClass);scrollMenu(o.itemFocused);}};var contract=function($parent){var $menus=$parent.find(o.options.menuSel);if(o.animateBool){$menus.each(function(){var $el=$(this);if($el.height()!==0){$el.css({'max-height':$el.height(),'transition':'max-height '+String(o.options.transitionSpeed/1000)+'s '+o.options.css3Easing,'overflow':'hidden'}).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',transitionEndContract);}else{$menus.not($el);}});$menus.hide(0).show(0);$menus.css({'max-height':'0'}).removeClass(o.menuExpandedClass);}else{$menus.each(function(){var $el=$(this);if($el.height()!==0){$el.slideUp(o.options.transitionSpeed,o.options.jqueryEasing,function(){$el.css('overflow','visible').removeClass(o.menuExpandedClass).parent('.'+o.parentClass).removeClass(o.itemHoverClass);if($el.hasClass(o.topMenuClass)){o.topMenu.addClass(o.menuHiddenClass);}
scrollMenu(o.itemFocused);});}});}};var expand=function($el){var $menu=$el.children(o.options.menuSel);$el.siblings('.'+o.itemHoverClass).removeClass(o.itemHoverClass);if(o.animateBool){$menu.css({'transition':'max-height '+String(o.options.transitionSpeed/1000)+'s '+o.options.css3Easing,'max-height':$menu.data('height')}).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',transitionEndExpand);}else{$menu.slideDown(o.options.transitionSpeed,o.options.jqueryEasing,function(){$el.addClass(o.itemHoverClass);$menu.addClass(o.menuExpandedClass).css('overflow','visible');console.log('jquery expand');scrollMenu(o.itemFocused);});}};o.init(el);return this;};$.fn[pluginName]=function(options){return this.each(function(){var $el=$(this);if(!$el.data(pluginName)){$el.data(pluginName,new Plugin(this,options));}});};var transform3DSupported=function(){var el=document.createElement('p'),has3d,transforms={'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};document.body.insertBefore(el,null);for(var t in transforms){if(el.style[t]!==undefined){el.style[t]='translate3d(1px,1px,1px)';has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]);}}
document.body.removeChild(el);return(has3d!==undefined&&has3d.length>0&&has3d!=="none");};var transitionsSupported=function(){var b=document.body||document.documentElement,s=b.style,p='transition';if(typeof s[p]==='string'){return true;}
var v=['Moz','webkit','Webkit','Khtml','O','ms'];p=p.charAt(0).toUpperCase()+p.substr(1);for(var i=0;i<v.length;i++){if(typeof s[v[i]+p]==='string'){return true;}}
return false;};var scrollMenu=function($el){if($el.length){var viewTop=$(window).scrollTop();var viewBottom=viewTop+$(window).height();var boundsTop=$el.offset().top;var boundsBottom=boundsTop+$el.outerHeight();if(boundsBottom>viewBottom||boundsTop<viewTop){$('html, body').animate({scrollTop:boundsTop},'slow');}}};})(jQuery,window,document,Math);