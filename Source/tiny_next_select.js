/*
---
description: TinyNextSelect - Simple and tiny plugin for load data for a next select. 

license: MIT-style

authors:
- Danillo César de O. Melo

requires:
- core/1.2.4+

provides: TinyNextSelect

...
*/
(function($) {
	this.TinyNextSelect = new Class({
		Implements: [Options,Events],

		options: {
			select:	 null,
			next: null,
			url: null,
			loading_text: 'Loadind...', 
			option_text: undefined
		},

		initialize: function(options) {
			this.setOptions(options);
			this.cache = {};
			this.next_default_options = this.options.next.getFirst().clone();
			this.request = new Request.HTML({
				url: options.url,
				onRequest: function () {
					this.options.next.set('html','<option>'+this.options.loading_text+'</option>');
				}.bind(this),
				onSuccess: function(tree, els, html) {
					if(this.options.option_text != undefined) {
						html = '<option value="">'+this.options.option_text+'</option>'+html;
					}
					this.loadNext(html);
				}.bind(this),
				onFailure: function(error) {
					this.next.set('html','<option>'+error.status+':'+error.statusText+'</option>');
				}.bind(this)
			});
			
			this.setEvent();
			this.options.select.store('tns',this);
			this.requestOptions(this.options.select);
		},

		setEvent: function() {
			this.options.select.addEvent('change',function(e){
				this.requestOptions(this.options.select);
				this.fireEvent('change');
				e.stop();
			}.bind(this));
		},

		resetNext: function() {
			this.options.next.getFirst('option').selected = true;
			this.options.next.set('html','');
			this.next_default_options.inject(this.options.next,'top');
		},
		
		loadNext: function(html) {
			this.options.next.set('html',html);
			this.cache['value:'+this.options.select.get('value')] = html;
			this.options.next.getFirst('option').selected = true;
			this.requestOptions(this.options.next);
			this.fireEvent('complete');
		},

		requestOptions: function(el) {
			var el_tns = el.retrieve('tns');
			if(el_tns) {
				var el_val = el_tns.options.select.get('value');
				if (el_val == '' || el_val == el_tns.options.select.get('text')) {
					var next_tns = this.options.next.retrieve('tns');
					if(next_tns) next_tns.resetNext();
					el_tns.resetNext();
				} else {
					if (el_tns.cache['value:'+el_val]) {
						el_tns.loadNext(el_tns.cache['value:'+el_val]);
					} else {
						el_tns.request.get({'value':el_val});
					}
				}
			}
		}
	});

	Element.implement({
		tinyNextSelect: function(options) {
			if(typeOf(this) != 'element' && this.get('tag') != 'select') return;
			options.select = this;
			var ns = new TinyNextSelect(options);
		}
	});
})(document.id);