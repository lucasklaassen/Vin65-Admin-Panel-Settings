//globals
$extID = chrome.i18n.getMessage('@@extension_id');

var v65wb = {

	//global functions
	initSideBar: function(){
		var customLinks = '<li><a class="v65wb-designerLaunch" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DdesignerLaunch">Designer Launch</a></li><li><a class="v65wb-websiteSettings" v65wbjs="modalWindow" v65wbjsModalHeight="550px" v65wbjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings">Website Settings</a></li>';
		$(".v65-nav-global .container .pull-left .nav").append(customLinks);
		if( location.search === "?method=contentGroups.list" || location.search === "?method=contentGroups.list&TITLE=&&page=1") {
			$(".v65-nav-global .container .pull-left .nav").append('<li><a v65wbjs="contentGroupSetup" href="#">Content Group Setup</a></li>');
			$("[v65wbjs=contentGroupSetup]").click(function(e){
				e.preventDefault();
				v65wb.initContentGroupSetup();
			});
		}
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
	},
	initContentGroupSetup : function() {
		// Input frontend here
		var templateArray = ["skambee", "dynavee"];
		$('html').prepend('<div class="v65ContentGroupSection"><h3>Which template are you using?</h3><select name="v65templateSelector"></select><a class="" v65wbjs="templateSelectSubmit" href="#">Submit</a></div>');
		for(var i = 0; i < templateArray.length; i++) {
			$("[name='v65templateSelector']")
	    	.append($("<option></option>")
      	.attr("value",templateArray[i])
      	.text(templateArray[i]));
		}
		$('[v65wbjs="templateSelectSubmit"]').click(function(){
			var template = $("[name='v65templateSelector']").val();
			autoContentGroupSetup.init.elements(template);
		});
	}
};

if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
	v65wb.initSideBar();
}

var autoContentGroupSetup = {
	init : {
		elements : function(template){
				$('body').not('.homeFeatureImageSKBEE, .pageFeatureImageSKBEE, .socialIcons').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Starting...</div></div>');
				$('.progress-bar').css('width', '10%');
				var templateContentGroups = {
					skambee : {
						homeFeatureImageSKBEE : ".homeFeatureImageSKBEE",
						pageFeatureImageSKBEE : ".pageFeatureImageSKBEE",
						socialIcons : ".socialIcons"
					},
					dynavee : {
						aboutUsDYVEE : ".aboutUsDYVEE",
						aboutUsDYVEE : ".aboutUsDYVEE",
						ourWinesDYVEE : ".ourWinesDYVEE",
						socialIcons : ".socialIcons"
					}
				}
				if( template === "skambee" ) {
					for (var key in templateContentGroups.skambee) {
						var obj = templateContentGroups.skambee;
						autoContentGroupSetup.automation.init(obj[key], 10);
					}
				} else if( template === "dynavee" ) {
					for (var key in templateContentGroups.dynavee) {
						var obj = templateContentGroups.dynavee;
						autoContentGroupSetup.automation.init(obj[key], 10);
					}
				}
		},
	},
	automation : {
		init : function(iframe, progress) {
			var className = iframe.replace(/\./g, "");
			$('html').prepend('<iframe src="/2014/settings/index.cfm?method=contentGroups.add" class="'+ className +'"></iframe>');
			// For testing purposes
			// $(iframe).css('width', '1000px');
			// $(iframe).css('height', '1000px');
			setTimeout(function() {
				autoContentGroupSetup.automation.addTitle(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addElement : function(iframe, elementTypeFunction, progress, count, array) {
			$(iframe).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				if( iframe === ".eventsDYVEE" ) {
					elementTypeFunction(iframe, progress + 10, count, array);
				} else {
					elementTypeFunction(iframe, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		initAddOutput : function(iframe, progress) {
			$(iframe).contents().find('.v65-view-group:eq(2)').find('.btn').trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.addOutput(iframe, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitle : function(iframe, progress) {
			if(iframe === ".homeFeatureImageSKBEE"){
				$(iframe).contents().find('input[name="title"]').val("Homepage Feature Image");
			} else if( iframe === ".pageFeatureImageSKBEE") {
				$(iframe).contents().find('input[name="title"]').val("Page Feature Image");
				$(iframe).contents().find('select[name="relatedTo"]').val("Pages");
			} else if( iframe === ".socialIcons" ) {
				$(iframe).contents().find('input[name="title"]').val("Social Icons");
			} else if( iframe === ".aboutUsDYVEE" ) {
				$(iframe).contents().find('input[name="title"]').val("About Us");
			} else if( iframe === ".eventsDYVEE" ) {
				$(iframe).contents().find('input[name="title"]').val("Events");
			} else if( iframe === ".ourWinesDYVEE" ) {
				$(iframe).contents().find('input[name="title"]').val("Our Wines");
			}
			$(iframe).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if(iframe === ".homeFeatureImageSKBEE" || iframe === ".pageFeatureImageSKBEE" || iframe === ".ourWinesDYVEE"){
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addPhoto, progress + 10);
				} else if( iframe === ".socialIcons") {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addOptionList, progress + 10);
				} else if( iframe === ".aboutUsDYVEE" ) {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTitleField, progress + 10);
				} else if( iframe === ".eventsDYVEE" ) {
					var labelArray = ["Month", "Date", "Year", "Event Title", "Location", "Time"];
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.titleFieldLoop, progress + 10, 0, labelArray);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTeaser : function(iframe, progress) {
			$(iframe).contents().find("[name='elementType']").val('TextBox').trigger('change');
			$(iframe).contents().find("[name='label']").val('Teaser');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addLink, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOptionList : function(iframe, progress) {
			$(iframe).contents().find(".optionProperties").removeClass('hide');
			$(iframe).contents().find("[name='elementType']").val('OptionList').trigger('change');
			$(iframe).contents().find("[name='label']").val('Social Channel');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			//Skambee facebook-squared is different from most which are just facebook
			var count = 0,
				 	titlesArray = ["facebook", "twitter", "pinterest", "gplus", "youtube", "vimeo"];
			$(iframe).contents().find("[name='options']").each(function(){
				$(this).addClass("option" + count++);
			})
			for(i=0;i<count;i++){
				$(iframe).contents().find(".option" + i).val(titlesArray[i]);
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTitleField, progress + 10);
					$('.progress-bar').css("width", progress + '%');
					$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addPhoto : function(iframe, progress) {
			$(iframe).contents().find(".photoProperties").removeClass('hide');
			$(iframe).contents().find("[name='elementType']").val('Photo').trigger('change');
			$(iframe).contents().find("[name='label']").val('banner');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			if( iframe === ".homeFeatureImageSKBEE" ){
				$(iframe).contents().find("[name='photoWidth']").val('1684');
				$(iframe).contents().find("[name='photoHeight']").val('500');
			} else if( iframe === ".pageFeatureImageSKBEE" ) {
				$(iframe).contents().find("[name='photoWidth']").val('1684');
				$(iframe).contents().find("[name='photoHeight']").val('200');
			} else if( iframe === ".aboutUsDYVEE" ) {
				$(iframe).contents().find("[name='photoWidth']").val('502');
				$(iframe).contents().find("[name='photoHeight']").val('235');
			} else if( iframe === ".ourWinesDYVEE" ) {
				$(iframe).contents().find("[name='photoWidth']").val('502');
				$(iframe).contents().find("[name='photoHeight']").val('270');
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( iframe === ".ourWinesDYVEE" ) {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTitleField, progress + 10);
				} else {
					autoContentGroupSetup.automation.initAddOutput(iframe, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitleField : function(iframe, progress) {
			$(iframe).contents().find("[name='label']").val('Title');
			if( iframe === ".aboutUsDYVEE" || iframe === ".ourWinesDYVEE" ) {
				$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			}
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( iframe === ".aboutUsDYVEE" || iframe === ".ourWinesDYVEE" ) {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTeaser, progress + 10);
				} else if( iframe === ".homeFeatureImageSKBEE" || iframe === ".pageFeatureImageSKBEE" || iframe === ".socialIcons" ) {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addLink, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		titleFieldLoop : function(iframe, progress, count, labelArray) {
			$(iframe).contents().find("[name='label']").val(labelArray[count]);
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				count++;
				if(count < labelArray.length){
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.titleFieldLoop, progress + 10, count, labelArray);
				} else {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addTeaser, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addLink : function(iframe, progress) {
			$(iframe).contents().find("[name='label']").val('Link');
			$(iframe).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( iframe === ".aboutUsDYVEE" ) {
					autoContentGroupSetup.automation.addElement(iframe, autoContentGroupSetup.automation.addPhoto, progress + 10);
				} else {
					autoContentGroupSetup.automation.initAddOutput(iframe, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOutput : function(iframe, progress) {
			if(iframe === ".homeFeatureImageSKBEE"){
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="homepageBanner"></div>';
			} else if( iframe === ".pageFeatureImageSKBEE") {
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="pageBanner"></div>';
			} else if( iframe === ".socialIcons" ) {
				var text = '<a href="//Link//"><i class="icon-//Social Channel//"></i></a>';
			} else if( iframe === ".aboutUsDYVEE" ) {
				var text = '<div class="ctaLeft About"><h2>//Title//</h2><p>//Teaser//</p><p><a class="linkBtn" href="//Link//"><span>Learn More</span></a></p></div><div class="ctaRight"><img alt="//Photo//" src="//Photo//" /></div>';
			} else if( iframe === ".eventsDYVEE" ) {
				var text = '<div class="v65Left Event"><div class="upperEvents"><div class="date"><p>//Month//</p><p><strong>//Date//</strong></p><p>//Year//</p></div><div class="eventName"><p><strong>//Event Title//</strong></p><p><i>//Location//</i></p><p>//Time//</p></div></div><div class="middleEvents"><p>//Teaser//</p></div><div class="lowerEvents"><a href="//Link//">Click to view this event +</a></div></div>';
			} else if( iframe === ".ourWinesDYVEE" ) {
				var text = '<div class="ctaLeft"><img alt="//Photo//" src="//Photo//" /></div><div class="ctaRight Wines"><h2>//Title//</h2><p>//Teaser//</p><p><a class="linkBtn" href="//Link//"><span>Shop Now</span></a></p></div>';
			}
			$(iframe).contents().find("[name='output']").val(text);
			$(iframe).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				autoContentGroupSetup.automation.completeMessage(iframe);
				$('.progress-bar').css('width', progress + '%');
				$('.progress-bar').text(progress + '%');
			}, 3000);
		},
		completeMessage : function(iframe) {
			var className = iframe.replace(/\./g, "");
			$( '<h2>'+className+' is complete</h2><button class="btn-warning" onclick="location.reload();">Click here to stop</button><br/>' ).insertAfter( ".progress" );
		}
	}
};