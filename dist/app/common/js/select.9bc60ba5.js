!function(t){function n(){this.closeButton=null,this.overlay=null,this.modal=null,this.transitionEnd=a();var t={className:"fade-and-drop",content:"",overlay:!0,dropback:!1};arguments[0]&&s(arguments[0])&&(this.options=l(t,arguments[0])),this.open()}function o(){var t,n,o,e,i,s,a="";this.modal=$('<div class="select-modal clearfix col-'+this.options.content.length+'"></div>'),this.options.title&&(t=$('<div class="select-header"><button class="select-close">取消</button><span>'+this.options.title+'</span><button class="select-confirm">确定</button></div>'),this.modal.append(t)),this.options.overlay&&(this.overlay=$('<div class="select-overlay"></div>'),this.options.className&&this.overlay.addClass(this.options.className),$("body").append(this.overlay)),n=$('<div class="select-content"></div>'),o=this.options.content,i=this.options.key||"value",s=this.options.text||"text";for(var l=0,c=o.length;l<c;l++){e=o[l].select,a+='<select id="'+o[l].id+'">';for(var r=0,d=e.length;r<d;r++)Array.isArray(e[r])?a+='<option value="'+e[r][0]+'">'+e[r][1]+"</option>":a+='<option value="'+e[r][i]+'">'+e[r][s]+"</option>";a+="</select>"}n.html(a),this.modal.append(n),$("body").append(this.modal)}function e(t,n){for(var o=this.options.content,e=0,i=o.length;e<i;e++)!function(t){$("#"+o[t].id).drum({onChange:function(n){o[t].onChange&&o[t].onChange(n)}}),o[t].selectIndex&&$("#"+o[t].id).drum("setIndex",o[t].selectIndex)}(e)}function i(){function t(){n=null,$(".select-overlay").remove(),$(".select-modal").remove()}var n=this;$(document).on("tap",".select-close",function(n){n.preventDefault(),t()}),$(document).on("tap",".select-confirm",function(o){o.preventDefault(),n&&n.options&&n.options.onaccept&&n.options.onaccept(),t()})}function s(t){return"[object Object]"==Object.prototype.toString.call(t)}function a(){var t=document.createElement("div");return t.style.WebkitTransition?"webkitTransitionEnd":t.style.OTransition?"oTransitionEnd":"transitionend"}function l(t,n){var o;for(o in n)n.hasOwnProperty(o)&&(t[o]=n[o]);return t}n.prototype.open=function(){o.call(this),e.call(this,this.options),i.call(this)},window.Okay=t||{},window.Okay.Select=n}(window.Okay);