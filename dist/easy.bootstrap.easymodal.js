/**
 * Bootstrap EasyModal Plugin
 * 
 * Version 1.2.0
 * 
 * http://easyproject.cn
 * https://github.com/ushelp/EasyModal-Bootstrap
 * 
 * Author: Ray [ inthinkcolor@gmail.com ]
 * Since: 2016
 * 
 * Dependencies: Bootstrap 
 * 
 * Usage:
 * EasyModal.alert( msg, [callback, title,  btnTextArray, params] );
 * EasyModal.confirm( msg, [callback, title,  btnTextArray, params] );	
 * EasyModal.prompt( msg, [defaultValue, callback, title, btnTextArray, params] );		
 * EasyModal.modal(title , content , modalFooter, [params]);
 * 
 * - params:
 * {
 * 	 size: '', // 'modal-sm', '', 'modal-lg'; default is ''; the modal size
 *   fade: true, // true, false; default is true; enable fadeIn and fadeOut effect
 *   backdrop: true, // true, 'static'; default is true; specify 'static' for a backdrop which doesn't close the modal on click
 *   keyboard: true // true, false; default is true;  specify true for enter ESC key to close modal dialog
 * }
 * 
 * - Golbal params:
 * EasyModal.defaults={
 * 	 size: '', // 'modal-sm', '', 'modal-lg'; default is ''; the modal size
 *   fade: true, // true, false; default is true; enable fadeIn and fadeOut effect
 *   ackdrop: true, // true, 'static'; default is true; specify 'static' for a backdrop which doesn't close the modal on click
 *   keyboard: true // true, false; default is true;  specify true for enter ESC key to close modal dialog
 * }
 * 
 */
!function(window){
	var okBtn='<button type="button" id="easyOkBtn" class="btn btn-primary" data-dismiss="modal"><i class="glyphicon"></i><span id="alertBtn">{0}</span><i class="glyphicon"></i></button>';
	var closeBtn='<button type="button" id="easyCloseBtn" class="btn btn-default" data-dismiss="modal"><i class="glyphicon"></i><span id="alertBtn">{0}</span><i class="glyphicon"></i></button>';
	var msgDiv='<h4 class="modal-title" align="center">{0}</h4>';
	var input='<h4 class="modal-title" align="left">{0}</h4><input type="text" class="form-control" id="modalInput"/>';
	function show(msg, title, callback, btnTextArray, defaultValue, params, type){
		$("#modalTitle").html(title);
		var easyModal=$('#easyModal');
		var modalContent=$("#modalContent");
		var modalFooter=$("#modalFooter");
		
		if(type=="a"){
			var o=m.msgs.okBtn;
			if(btnTextArray && btnTextArray.length>0 && btnTextArray[0]){
				o=btnTextArray[0];
			}
			
			modalContent.html(msgDiv.replace("{0}",msg));
			modalFooter.html(okBtn.replace("{0}", o));
			
			easyModal.one('hidden.bs.modal', function (e) {
				easyModal.data('bs.modal','');
				if( callback ) callback(true);
			})
		}else if(type=="c" || type =="p"){
			var c=m.msgs.closeBtn;
			var o=m.msgs.okBtn;
			if(btnTextArray){
				if(btnTextArray.length>0 && btnTextArray[0]){
					c=btnTextArray[0];
				}
				if(btnTextArray.length>1 && btnTextArray[1]){
					o=btnTextArray[1];
				}
			}
			
			modalFooter.html(closeBtn.replace("{0}",c)+okBtn.replace("{0}", o));
			
			if(type=="p"){
				modalContent.html(input.replace("{0}",msg));
				$("#modalInput").val(defaultValue?defaultValue:"");
			}else{
				modalContent.html(msgDiv.replace("{0}",msg));
			}
			
			var clk=false;
			
			$("#easyOkBtn").one("click",function(){
				clk=true;
			});
			
			
			easyModal.one('hidden.bs.modal', function (e) {
				easyModal.data('bs.modal','');
				if(type=="c"){
					if( callback ) callback(clk);
				}else{ //p 
					if(clk){
						if( callback ) callback($("#modalInput").val());
					}else{
						if( callback ) callback(null);
					}
				}
			})
		}
		
		var params=$.extend({}, m.defaults, params);
		params.show=true;
		
		if(params.size){
			var dialog=easyModal.find(".modal-dialog"); 
			dialog.removeClass("modal-sm modal-lg");
			if(params.size=='modal-sm'){
				dialog.addClass("modal-sm");
			}else if(params.size=='modal-lg'){
				dialog.addClass("modal-lg");
			}
		}else{
			easyModal.find(".modal-dialog").removeClass("modal-sm modal-lg");
		}
		params.fade?easyModal.addClass("fade"):easyModal.removeClass("fade");
		easyModal.modal(params);
	}
	var m={
			defaults:{
				size: '', // ' modal-sm', '', ' modal-lg'; default is ''; the modal size
				fade: true, // true, false; default is true; enable fadeIn and fadeOut effect; 
				backdrop: true, // true, 'static'; default is true; specify 'static' for a backdrop which doesn't close the modal on click.
				keyboard: true //true, false; default is true;  specify true for enter ESC key to close modal dialog
			},
			msgs:{},
 			alert :function(msg, callback, title,  btnTextArray, params){
				if(!title){title=m.msgs.alertTitle}
				show(msg, title, callback, btnTextArray, "", params, 'a');
			},
			confirm:function(msg, callback, title,  btnTextArray, params){
				if(!title){title=m.msgs.confirmTitle}
				show(msg, title, callback, btnTextArray, "", params,  'c');
			},
			prompt :function(msg, defaultValue, callback, title,  btnTextArray, params){
				if(!title){title=m.msgs.promptTitle}
				show(msg, title, callback, btnTextArray, defaultValue, params, 'p');
			}, 
			modal : function(title , content , modalFooter, params){
				$("#modalTitle").html(title);
				$("#modalContent").html(content);
				$("#modalFooter").html(modalFooter);
				var easyModal=$('#easyModal');
				easyModal.one('hidden.bs.modal', function (e) {
					easyModal.data('bs.modal','');
				})
				var params=$.extend({}, m.defaults, params);
				params.show=true;
				$("#easyModal").modal(params);
				
			}
	}
	window.EasyModal=m;
	
	var modal='<div class="modal fade" id="easyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
				+'<div class="modal-dialog" role="document">'
					+'<div class="modal-content">'
						+'<div class="modal-header">'
					      +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
					       +'<h4 class="modal-title" id="modalTitle"></h4>'
					    +'</div>'
					    +'<div class="modal-body">'
					    	+'<div class="container-fluid">'
					        	+'<div class="row" id="modalContent">'
					        	+'</div>'
					        +'</div>'
					    +'</div>'
						+'<div class="modal-footer" id="modalFooter">'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>';
	$("html").append(modal);
}(window);
