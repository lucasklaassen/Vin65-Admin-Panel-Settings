//globals
$extID = chrome.i18n.getMessage('@@extension_id');

var v65wb = {

	//global functions
	initSideBar: function(){
		var customLinks = '<li><a class="v65wb-designerLaunch" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DdesignerLaunch">Designer Launch</a></li><li><a class="v65wb-websiteSettings" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings">Website Settings</a></li>';
		$(".v65-nav-global .container .pull-left .nav").append(customLinks);
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
				$('.v65wb-iFramePopup').contents().find('#iFramePopup').contents().find('#popupContent').css('height', "auto");
				var iframeContent = $(".v65wb-iFramePopup").contents().find('#iFramePopup').contents();
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
			$(".v65wb-modalWrapper").html("");		
		});

		var iframe = '<div id="popupWrapper"><iframe src="'+url+'" style="min-width:'+width+'; min-height:'+height+'" scrolling="no" frameborder="0" hspace="0" vspace="0" id="iFramePopup" class="v65wb-iFramePopup" name="EditWindow"></iframe></div>';

		$(".v65wb-modalWrapper").html(iframe).show();
		$(".v65wb-modalWrapper").show();
		
		$(".v65wb-iFramePopup").load(function(){
			$(".v65wb-iFramePopup").contents().find('#iFramePopup').contents().find("body").addClass("v65wb-iFrameContent");

			$(".v65wb-iFramePopup").contents().find('#iFramePopup').contents().find("a[href='javascript:parent.closePopup()']").click(function(e){
				$(".v65wb-modalWrapper").hide();
				$(".v65wb-modalWrapper").html("");
			});

		});
		return false;
	}
		
};

if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
	v65wb.initSideBar();
}