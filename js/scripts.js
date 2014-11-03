// //globals
// $extID = chrome.i18n.getMessage('@@extension_id');
// $("body").on("#popupWrapper iframe[src='/settings/index.cfm?method=designerLaunch.loadDesignerLaunch']", "load", function(){
// 	console.log('designer launch ready');
// })

// var v65wb = {

// 	//global functions
// 	initSideBar: function(){
// 		var customLinks = '<li><a class="v65wb-designerLaunch" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/settings/index.cfm?method=designerLaunch.loadDesignerLaunch">Designer Launch</a></li><li><a class="v65wb-websiteSettings">Website Settings</a></li>';
// 		$(".v65-nav-global .container .pull-left .nav").append(customLinks);
// 		$('.v65wb-websiteSettings').click(function(){
// 			$('html').prepend('<div id="modal" class="modal fade in" style="display: block;" aria-hidden="false"></div>');
// 			var IframeData = '<div class="modal-dialog" style="width: 780px;height: 660px;"><div class="modal-content" v65js="viewDiv"><div class="modal-body" style="max-height: 718px;"><iframe src="/settings/index.cfm?method=websiteSettings.loadSettings" style="min-width:710px; min-height:510px" id="iFramePopup" class="websiteSettings"></iframe></div></div></div>';
// 			$("#modal").prepend(IframeData);
// 			$('#iFramePopup').contents().find("a[href='javascript:parent.closePopup()']").click(function(){
// 				alert('hit');
// 			});
// 		});
// 	    $('#iFramePopup').load(function(){
// 	        $(this).show();
// 	        console.log('laod the iframe');
// 			});
// 		$("html").prepend("<div class='v65wb' />");
// 		$(".v65wb").load("chrome-extension://"+$extID+"/html/sidebar.html",function(){
// 			$("[v65wbjs=modalWindow]").click(function(e){
// 				e.preventDefault();
// 				v65wb.modal($(this).attr("href"), $(this).attr("v65wbjsModalHeight"), $(this).attr("v65wbjsModalWidth"));
// 				return false;
// 			});
// 			v65wb.loadDesignerLaunchFields();
// 		});
// 	},
	
// 	loadDesignerLaunchFields: function(){
// 		$(".v65wb-designerLaunch").click(function(){
// 			$(".v65wb-iFramePopup").load(function(){
// 				return true;
// 			}, function(){
// 				$('.v65wb-iFramePopup').contents().find('#popupContent').css('height', "auto");
// 				var iframeContent = $(".v65wb-iFramePopup").contents();
// 				var parseFiles = iframeContent.find("#parseFiles");
// 				var parseForm = iframeContent.find("#parseForm");
				
// 				//layouts - left column
// 				var homepageLayout = parseFiles.find("td:contains('Homepage')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=HomepageLayout]").val(homepageLayout);

// 				var cartLayout = parseFiles.find("td:contains('Cart')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=CartLayout]").val(cartLayout);

// 				var memberLayout = parseFiles.find("td:contains('Member')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=MemberLayout]").val(memberLayout);

// 				var clubLayout = parseFiles.find("td:contains('Club')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=ClubLayout]").val(clubLayout);

// 				var productLayout = parseFiles.find("td:contains('Product')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=ProductLayout]").val(productLayout);

// 				var eventDrilldownLayout = parseFiles.find("td:contains('Event Drilldown')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=EventDrilldownLayout]").val(eventDrilldownLayout);

// 				//layouts - right column
// 				var mainLayout = parseFiles.find("td:contains('Main')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=MainLayout]").val(mainLayout);

// 				var checkoutLayout = parseFiles.find("td:contains('Checkout')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=CheckoutLayout]").val(checkoutLayout);

// 				var printLayout = parseFiles.find("td:contains('Print')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=PrintLayout]").val(printLayout);

// 				var blogLayout = parseFiles.find("td:contains('Blog')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=BlogLayout]").val(blogLayout);

// 				var productDrilldownLayout = parseFiles.find("td:contains('Product Drilldown')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=ProductDrilldownLayout]").val(productDrilldownLayout);

// 				var recipeDrilldownLayout = parseFiles.find("td:contains('Recipe Drilldown')").next().html().replace(".cfm", ".htm");
// 				parseForm.find("[name=RecipeDrilldownLayout]").val(recipeDrilldownLayout);

// 				parseForm.find("#parseFile").before('<a href="#" id="clearFiles">Clear Files&nbsp;<img src="/assets/images/icons/next.png" width="16" height="16" border="0" align="absmiddle"></a>&nbsp;&nbsp;&nbsp;&nbsp;');

// 				parseForm.find("#clearFiles").click(function(e) {
// 					e.preventDefault();
// 					parseForm.find("select").val("");
// 					return false;
// 				});
// 			});
// 		});
// 	},

	
	
// 	modal: function(url,height,width){
// 		$('#iFramePopup').contents().find("a[href='javascript:parent.closePopup()']").click(function(){
// 			alert('hit');
// 		});
// 		$(".v65wb-modalWrapper").click(function(){
// 			$(".v65wb-modalWrapper").hide();
// 			$(".v65wb-modalWrapper .v65wb-modal").html("");		
// 		});

// 		var iframe = '<iframe src="'+url+'" width="'+width+'" height="'+height+'" scrolling="no" frameborder="0" hspace="0" vspace="0" id="iFramePopup" class="v65wb-iFramePopup" name="EditWindow"></iframe>';

// 		$(".v65wb-modalWrapper .v65wb-modal").html(iframe).show();
// 		$(".v65wb-modalWrapper").show();
		
// 		$(".v65wb-iFramePopup").load(function(){
// 			$(".v65wb-iFramePopup").contents().find("body").addClass("v65wb-iFrameContent");

// 			$(".v65wb-iFramePopup").contents().find("a[href='javascript:parent.closePopup()']").click(function(e){
// 				$(".v65wb-modalWrapper").hide();
// 				$(".v65wb-modalWrapper .v65wb-modal").html("");
// 			});

// 		});
// 		return false;
// 	}
		
// };

// if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
// 	v65wb.initSideBar();
// }

//globals
$extID = chrome.i18n.getMessage('@@extension_id');
$("body").on("#popupWrapper iframe[src='/settings/index.cfm?method=designerLaunch.loadDesignerLaunch']", "load", function(){
	console.log('designer launch ready');
})

var v65wb = {

	//global functions
	initSideBar: function(){
		var customLinks = '<li><a class="v65wb-designerLaunch" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/settings/index.cfm?method=designerLaunch.loadDesignerLaunch">Designer Launch</a></li><li><a class="v65wb-websiteSettings">Website Settings</a></li>';
		$(".v65-nav-global .container .pull-left .nav").append(customLinks);
		$('.v65wb-websiteSettings').click(function(){
			$('html').prepend('<div id="modal" class="modal fade in" style="display: block;" aria-hidden="false"></div>');
			var IframeData = '<div class="modal-dialog" style="width: 780px;height: 660px;"><div class="modal-content" v65js="viewDiv"><div class="modal-body" style="max-height: 718px;"><iframe src="/settings/index.cfm?method=websiteSettings.loadSettings" style="min-width:710px; min-height:510px" id="iFramePopup" class="websiteSettings"></iframe></div></div></div>';
			$("#modal").prepend(IframeData);
			$('#iFramePopup').contents().find("a[href='javascript:parent.closePopup()']").click(function(){
				alert('hit');
			});
		});
	    $('#iFramePopup').load(function(){
	        $(this).show();
	        console.log('laod the iframe');
			});
		$("html").prepend("<div style='overflow:visible!important;' class='v65wb' />");
		$(".v65wb").load("chrome-extension://"+$extID+"/html/sidebar.html",function(){
			$("[v65wbjs=modalWindow]").click(function(e){
				e.preventDefault();
				v65wb.modal($(this).attr("href"), $(this).attr("v65wbjsModalHeight"), $(this).attr("v65wbjsModalWidth"));
				return false;
			});
			v65wb.loadDesignerLaunchFields();
		});
	},
	loadDesignerLaunchFields: function(){
		$(".v65wb-designerLaunch").click(function(){
			$(".v65wb-iFramePopup").load(function(){
				$('.v65wb-iFramePopup').contents().find('#popupContent').css('height', "auto");
				var iframeContent = $(".v65wb-iFramePopup").contents();
				var parseFiles = iframeContent.find("#parseFiles");
				var parseForm = iframeContent.find("#parseForm");
				var dataArray = [
				["Homepage","HomepageLayout"],
				["Cart","CartLayout"],
				["Member", "MemberLayout"],
				["Club","ClubLayout"],
				["Product", "ProductLayout"],
				["Event Drilldown","EventDrilldownLayout"],
				["Main","MainLayout"],
				["Checkout","CheckoutLayout"],
				["Print","PrintLayout"],
				["Blog","BlogLayout"],
				["Product Drilldown","ProductDrilldownLayout"],
				["Recipe Drilldown","RecipeDrilldownLayout"]
				];
				for(i=0;i<dataArray.length;i++){
					var data = parseFiles.find("td:contains('"+dataArray[i][0]+"')").next().html().replace(".cfm", ".htm");
					parseForm.find("[name="+dataArray[i][1]+"]").val(data);
				}
				parseForm.find("#parseFile").before('<a href="#" id="clearFiles">Clear Files&nbsp;<img src="/assets/images/icons/next.png" width="16" height="16" border="0" align="absmiddle"></a>&nbsp;&nbsp;&nbsp;&nbsp;');
				parseForm.find("#clearFiles").click(function(e) {
					e.preventDefault();
					parseForm.find("select").val("");
					return false;
				});
			});
		});
	},
	modal: function(url,height,width){
		$(".v65wb-modalWrapper").click(function(){
			$(".v65wb-modalWrapper").hide();
			$(".v65wb-modalWrapper .v65wb-modal").html("");		
		});

		var iframe = '<iframe src="'+url+'" style="min-width:'+width+'; min-height:'+height+'" scrolling="no" frameborder="0" hspace="0" vspace="0" id="iFramePopup" class="v65wb-iFramePopup" name="EditWindow"></iframe>';

		$(".v65wb-modalWrapper .v65wb-modal").html(iframe).show();
		$(".v65wb-modalWrapper").show();
		
		$(".v65wb-iFramePopup").load(function(){
			$(".v65wb-iFramePopup").contents().find("body").addClass("v65wb-iFrameContent");

			$(".v65wb-iFramePopup").contents().find("a[href='javascript:parent.closePopup()']").click(function(e){
				$(".v65wb-modalWrapper").hide();
				$(".v65wb-modalWrapper .v65wb-modal").html("");
			});

		});
		return false;
	}
		
};

if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
	v65wb.initSideBar();
}