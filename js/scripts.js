//globals
$extID = chrome.i18n.getMessage('@@extension_id');

var v65ws = {

	//global functions
	initTopBarLinks: function(){
		var customLinks = '<li><a class="v65ws-designerLaunch" v65wsjs="modalWindow" v65wsjsModalHeight="550px" v65wsjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DdesignerLaunch">Designer Launch</a></li><li><a class="v65ws-websiteSettings" v65wsjs="modalWindow" v65wsjsModalHeight="550px" v65wsjsModalWidth="700px" href="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings">Website Settings</a></li>',
				templateArray = ["skambee", "dynavee"],
				templateContentGroups = {
					skambee : {
						homeFeatureImage : ".homeFeatureImage",
						pageFeatureImage : ".pageFeatureImage",
						socialIcons : ".socialIcons"
					},
					dynavee : {
						aboutUs : ".aboutUs",
						ourWines : ".ourWines",
						socialIcons : ".socialIcons",
						events : ".events"
					}
				},
				templateContentBlocks = {
					skambee : {
						homeFeatureImage : ".homeFeatureImage",
						pageFeatureImage : ".pageFeatureImage",
						facebook : ".facebook",
						twitter : ".twitter",
						pinterest : ".pinterest"
					},
					dynavee : {
						aboutUs : ".About_Us",
						event1 : ".Event_1",
						event2 : ".Event_2",
						ourWines : ".Our_Wines"
					}
				};
		$(".v65-nav-global .container .pull-left .nav").append(customLinks);
		if( location.search === "?method=contentGroups.list" || location.search === "?method=contentGroups.list&TITLE=&&page=1") {
			$(".v65-nav-global .container .pull-left .nav").append('<li><a v65wsjs="contentGroupSetup" href="#">Content Group Setup</a></li>');
			$("[v65wsjs=contentGroupSetup]").click(function(e){
				e.preventDefault();
				v65ws.initContentGroupSetup(templateArray, templateContentGroups);
			});
		} else if( location.search === "?method=contentBlocks.list" || location.search === "?method=contentBlocks.list&&page=1" || location.search === "?method=contentBlocks.list&CONTENTGROUPID=&ISACTIVE=&TITLE=&&page=1" ) {
			$(".v65-nav-global .container .pull-left .nav").append('<li><a v65wsjs="contentBlockInput" href="#">Content Block Input</a></li>');
			$("[v65wsjs=contentBlockInput]").click(function(e){
				e.preventDefault();
				v65ws.initContentBlockInput(templateArray, templateContentBlocks);
			});
		}
		$("html").prepend("<div style='overflow:visible!important;' class='v65ws' />");
		$(".v65ws").load("chrome-extension://"+$extID+"/html/sidebar.html",function(){
			$("[v65wsjs=modalWindow]").click(function(e){
				e.preventDefault();
				v65ws.modal($(this).attr("href"), $(this).attr("v65wsjsModalHeight"), $(this).attr("v65wsjsModalWidth"));
				return false;
			});
			v65ws.loadDesignerLaunchFields();
		});
	},
	loadDesignerLaunchFields: function(){
		$(".v65ws-designerLaunch").click(function(){
			$(".v65ws-iFramePopup").load(function(){
				$('.v65ws-iFramePopup').contents().find('#iFramePopup').contents().find('#popupContent').css('height', "auto");
				var iframeContent = $(".v65ws-iFramePopup").contents().find('#iFramePopup').contents();
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
		$(".v65ws-modalWrapper").click(function(){
			$(".v65ws-modalWrapper").hide();
			$(".v65ws-modalWrapper").html("");		
		});
		var iframe = '<div id="popupWrapper"><iframe src="'+url+'" style="min-width:'+width+'; min-height:'+height+'" scrolling="no" frameborder="0" hspace="0" vspace="0" id="iFramePopup" class="v65ws-iFramePopup" name="EditWindow"></iframe></div>';
		$(".v65ws-modalWrapper").html(iframe).show();
		$(".v65ws-modalWrapper").show();
		$(".v65ws-iFramePopup").load(function(){
			$(".v65ws-iFramePopup").contents().find('#iFramePopup').contents().find("body").addClass("v65ws-iFrameContent");

			$(".v65ws-iFramePopup").contents().find('#iFramePopup').contents().find("a[href='javascript:parent.closePopup()']").click(function(e){
				$(".v65ws-modalWrapper").hide();
				$(".v65ws-modalWrapper").html("");
			});
		});
		return false;
	},
	initContentGroupSetup : function(templateArray, templateContentGroups) {
		$('html').prepend('<div class="v65ContentGroupSection"><h3>Which template are you using?</h3><select name="v65templateSelector"></select><a class="" v65wsjs="templateSelectSubmit" href="#">Submit</a></div>');
		$(".v65ContentGroupSection").dialog();
		for(var i = 0; i < templateArray.length; i++) {
			$("[name='v65templateSelector']")
	    	.append($("<option></option>")
      	.attr("value",templateArray[i])
      	.text(templateArray[i]));
		}
		$('[v65wsjs="templateSelectSubmit"]').click(function(){
			var template = $("[name='v65templateSelector']").val();
			contentGroupAutomation.init.elements(template, templateContentGroups);
		});
	},
	initContentBlockInput : function(templateArray, templateContentBlocks) {
		$('html').prepend('<div class="v65ContentGroupSection"><h3>Which template are you using?</h3><select name="v65templateSelector"></select><a class="" v65wsjs="templateSelectSubmit" href="#">Submit</a></div>');
		$( ".v65ContentGroupSection" ).dialog();
		for(var i = 0; i < templateArray.length; i++) {
			$("[name='v65templateSelector']")
	    	.append($("<option></option>")
      	.attr("value",templateArray[i])
      	.text(templateArray[i]));
		}
		$('[v65wsjs="templateSelectSubmit"]').click(function(){
			var template = $("[name='v65templateSelector']").val();
			contentBlockInput.init.elements(template, templateContentBlocks);
		});
	}
};

if(document.location == top.location && top.location.hostname.indexOf("siteadmin") > -1 && document.title.indexOf("Vin65") > -1){
	v65ws.initTopBarLinks();
}

var contentGroupAutomation = {
	init : {
		elements : function(template, templateContentGroups){
				$('body').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Starting...</div></div>');
				$('.progress-bar').css('width', '10%');
				if( template === "skambee" ) {
					for (var key in templateContentGroups.skambee) {
						var obj = templateContentGroups.skambee;
						contentGroupAutomation.automation.init(obj[key], template, 10);
					}
				} else if( template === "dynavee" ) {
					for (var key in templateContentGroups.dynavee) {
						var obj = templateContentGroups.dynavee;
						contentGroupAutomation.automation.init(obj[key], template, 10);
					}
				}
		},
	},
	automation : {
		init : function(contentGroupName, template, progress) {
			var className = contentGroupName.replace(/\./g, "");
			$('html').prepend('<iframe src="/2014/settings/index.cfm?method=contentGroups.add" class="'+ className +'"></iframe>');
			// For testing purposes
			// $(iframe).css('width', '1000px');
			// $(iframe).css('height', '1000px');
			setTimeout(function() {
				contentGroupAutomation.automation.addTitle(contentGroupName, template, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addElement : function(contentGroupName, template, elementTypeFunction, progress, count, array) {
			$(contentGroupName).contents().find("[v65js='edit']").each(function(){
				if($(this).text() === " Add Element"){
					$(this).trigger('click');
				}
			});
			setTimeout(function() {
				if( contentGroupName === ".events" ) {
					elementTypeFunction(contentGroupName, template, progress + 10, count, array);
				} else {
					elementTypeFunction(contentGroupName, template, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		initAddOutput : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find('.v65-view-group:eq(2)').find('.btn').trigger('click');
			setTimeout(function() {
				contentGroupAutomation.automation.addOutput(contentGroupName, template, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitle : function(contentGroupName, template, progress) {
			if(contentGroupName === ".homeFeatureImage"){
				$(contentGroupName).contents().find('input[name="title"]').val("Homepage Feature Image");
			} else if( contentGroupName === ".pageFeatureImage") {
				$(contentGroupName).contents().find('input[name="title"]').val("Page Feature Image");
				$(contentGroupName).contents().find('select[name="relatedTo"]').val("Pages");
			} else if( contentGroupName === ".socialIcons" ) {
				$(contentGroupName).contents().find('input[name="title"]').val("Social Icons");
			} else if( contentGroupName === ".aboutUs" ) {
				$(contentGroupName).contents().find('input[name="title"]').val("About Us");
			} else if( contentGroupName === ".events" ) {
				$(contentGroupName).contents().find('input[name="title"]').val("Events");
			} else if( contentGroupName === ".ourWines" ) {
				$(contentGroupName).contents().find('input[name="title"]').val("Our Wines");
			}
			$(contentGroupName).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if(contentGroupName === ".homeFeatureImage" || contentGroupName === ".pageFeatureImage" || contentGroupName === ".ourWines"){
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addPhoto, progress + 10);
				} else if( contentGroupName === ".socialIcons") {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addOptionList, progress + 10);
				} else if( contentGroupName === ".aboutUs" ) {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addTitleField, progress + 10);
				} else if( contentGroupName === ".events" ) {
					var labelArray = ["Month", "Date", "Year", "Event Title", "Location", "Time"];
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.titleFieldLoop, progress + 10, 0, labelArray);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTeaser : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find("[name='elementType']").val('TextBox').trigger('change');
			$(contentGroupName).contents().find("[name='label']").val('Teaser');
			$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(contentGroupName).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addLink, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOptionList : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find(".optionProperties").removeClass('hide');
			$(contentGroupName).contents().find("[name='elementType']").val('OptionList').trigger('change');
			$(contentGroupName).contents().find("[name='label']").val('Social Channel');
			$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			$('.socialIcons').contents().find('.addOptionRow').trigger('click');
			//Skambee facebook-squared is different from most which are just facebook
			if( template === "skambee" ) {
				var count = 0,
					 	titlesArray = ["facebook-squared", "twitter", "pinterest", "gplus", "youtube", "vimeo"];
			} else {
				var count = 0,
					 	titlesArray = ["facebook", "twitter", "pinterest", "gplus", "youtube", "vimeo"];
			}
			$(contentGroupName).contents().find("[name='options']").each(function(){
				$(this).addClass("option" + count++);
			})
			for(i=0;i<count;i++){
				$(contentGroupName).contents().find(".option" + i).val(titlesArray[i]);
			}
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addTitleField, progress + 10);
					$('.progress-bar').css("width", progress + '%');
					$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addPhoto : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find(".photoProperties").removeClass('hide');
			$(contentGroupName).contents().find("[name='elementType']").val('Photo').trigger('change');
			$(contentGroupName).contents().find("[name='label']").val('banner');
			$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			if( contentGroupName === ".homeFeatureImage" ){
				$(contentGroupName).contents().find("[name='photoWidth']").val('1684');
				$(contentGroupName).contents().find("[name='photoHeight']").val('500');
			} else if( contentGroupName === ".pageFeatureImage" ) {
				$(contentGroupName).contents().find("[name='photoWidth']").val('1684');
				$(contentGroupName).contents().find("[name='photoHeight']").val('200');
			} else if( contentGroupName === ".aboutUs" ) {
				$(contentGroupName).contents().find("[name='photoWidth']").val('502');
				$(contentGroupName).contents().find("[name='photoHeight']").val('235');
			} else if( contentGroupName === ".ourWines" ) {
				$(contentGroupName).contents().find("[name='photoWidth']").val('502');
				$(contentGroupName).contents().find("[name='photoHeight']").val('270');
			}
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( contentGroupName === ".ourWines" ) {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addTitleField, progress + 10);
				} else {
					contentGroupAutomation.automation.initAddOutput(contentGroupName, template, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitleField : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find("[name='label']").val('Title');
			if( contentGroupName === ".aboutUs" || contentGroupName === ".ourWines" ) {
				$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			}
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( contentGroupName === ".aboutUs" || contentGroupName === ".ourWines" ) {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addTeaser, progress + 10);
				} else if( contentGroupName === ".homeFeatureImage" || contentGroupName === ".pageFeatureImage" || contentGroupName === ".socialIcons" ) {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addLink, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		titleFieldLoop : function(contentGroupName, template, progress, count, labelArray) {
			$(contentGroupName).contents().find("[name='label']").val(labelArray[count]);
			$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				count++;
				if(count < labelArray.length){
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.titleFieldLoop, progress + 10, count, labelArray);
				} else {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addTeaser, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addLink : function(contentGroupName, template, progress) {
			$(contentGroupName).contents().find("[name='label']").val('Link');
			$(contentGroupName).contents().find(".checkbox-inline").children("input[value='1']").trigger('click');
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				if( contentGroupName === ".aboutUs" ) {
					contentGroupAutomation.automation.addElement(contentGroupName, template, contentGroupAutomation.automation.addPhoto, progress + 10);
				} else {
					contentGroupAutomation.automation.initAddOutput(contentGroupName, template, progress + 10);
				}
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addOutput : function(contentGroupName, template, progress) {
			if(contentGroupName === ".homeFeatureImage"){
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="homepageBanner"></div>';
			} else if( contentGroupName === ".pageFeatureImage") {
				var text = '<div style="background: url(//banner//) no-repeat center; background-size: cover;" class="pageBanner"></div>';
			} else if( contentGroupName === ".socialIcons" ) {
				var text = '<a href="//Link//"><i class="icon-//Social Channel//"></i></a>';
			} else if( contentGroupName === ".aboutUs" ) {
				var text = '<div class="ctaLeft About"><h2>//Title//</h2><p>//Teaser//</p><p><a class="linkBtn" href="//Link//"><span>Learn More</span></a></p></div><div class="ctaRight"><img alt="//Photo//" src="//Photo//" /></div>';
			} else if( contentGroupName === ".events" ) {
				var text = '<div class="v65Left Event"><div class="upperEvents"><div class="date"><p>//Month//</p><p><strong>//Date//</strong></p><p>//Year//</p></div><div class="eventName"><p><strong>//Event Title//</strong></p><p><i>//Location//</i></p><p>//Time//</p></div></div><div class="middleEvents"><p>//Teaser//</p></div><div class="lowerEvents"><a href="//Link//">Click to view this event +</a></div></div>';
			} else if( contentGroupName === ".ourWines" ) {
				var text = '<div class="ctaLeft"><img alt="//Photo//" src="//Photo//" /></div><div class="ctaRight Wines"><h2>//Title//</h2><p>//Teaser//</p><p><a class="linkBtn" href="//Link//"><span>Shop Now</span></a></p></div>';
			}
			$(contentGroupName).contents().find("[name='output']").val(text);
			$(contentGroupName).contents().find("[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				contentGroupAutomation.automation.completeMessage(contentGroupName, template);
				$('.progress-bar').css('width', progress + '%');
				$('.progress-bar').text(progress + '%');
			}, 3000);
		},
		completeMessage : function(contentGroupName, template) {
			var className = contentGroupName.replace(/\./g, "");
			$( '<h2>'+className+' is complete</h2><button class="btn-warning" onclick="location.reload();">Click here to stop</button><br/>' ).insertAfter( ".progress" );
		}
	}
};

var contentBlockInput = {
	init : {
		elements : function(template, templateContentBlocks){
			$('body').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Starting...</div></div>');
			$('.progress-bar').css('width', '10%');
			if( template === "skambee" ) {
				for (var key in templateContentBlocks.skambee) {
					var obj = templateContentBlocks.skambee;
					contentBlockInput.automation.init(obj[key], template, 10);
				}
			} else if( template === "dynavee" ) {
				for (var key in templateContentBlocks.dynavee) {
					var obj = templateContentBlocks.dynavee;
					contentBlockInput.automation.init(obj[key], template, 10);
				}
			}
		}
	},
	automation : {
		init : function(contentBlockName, template, progress) {
			var className = contentBlockName.replace(/\./g, "");
			$('html').prepend('<iframe src="/2014/cms/index.cfm?method=contentBlocks.add" class="'+ className +'"></iframe>');
			// For testing purposes
			// $(contentBlockName).css('width', '1000px');
			// $(contentBlockName).css('height', '1000px');
			setTimeout(function() {
				contentBlockInput.automation.addTitle(contentBlockName, template, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		addTitle : function(contentBlockName, template, progress) {
			if( contentBlockName === ".facebook" || contentBlockName === ".twitter" || contentBlockName === ".pinterest" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "Social Icons") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			} else if( contentBlockName === ".About_Us" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "About Us") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			} else if( contentBlockName === ".Event_1" || contentBlockName === ".Event_2" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "Events") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			} else if( contentBlockName === ".Our_Wines" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "Our Wines") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			} else if( contentBlockName === ".homeFeatureImage" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "Homepage Feature Image") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			} else if( contentBlockName === ".pageFeatureImage" ) {
				$(contentBlockName).contents().find('select[name="contentGroupID"]').children().each(function(){
					if($(this).text() === "Page Feature Image") {
						$(contentBlockName).contents().find('select[name="contentGroupID"]').val($(this).val());
					}
				});
			}
			$(contentBlockName).contents().find('input[name="isActive"]').trigger('click');
			$(contentBlockName).contents().find('input[name="title"]').val(contentBlockName.replace(/\./g, "").replace(/_/g, ' '));
			$(contentBlockName).contents().find("button[v65js='submitEdit']").trigger('click');
			setTimeout(function() {
				contentBlockInput.automation.initEditElements(contentBlockName, template, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		initEditElements : function(contentBlockName, template, progress) {
			$(contentBlockName).contents().find("[v65js='edit']:eq(1)").trigger('click');
			setTimeout(function() {
				contentBlockInput.automation.editElementsContent(contentBlockName, template, progress + 10);
				$('.progress-bar').css("width", progress + '%');
				$('.progress-bar').text(progress + "%");
			}, 3000);
		},
		editElementsContent : function(contentBlockName, template, progress) {
			if( contentBlockName === ".facebook" || contentBlockName === ".twitter" || contentBlockName === ".pinterest" ) {
				$(contentBlockName).contents().find("select[name='element1']").children().each(function(){
					if($(this).text() === contentBlockName.replace(/\./g, "")) {
						$(contentBlockName).contents().find("select[name='element1']").val($(this).val());
					}
				});
				$(contentBlockName).contents().find("input[name='element3']").val("#");
			} else if( contentBlockName === ".About_Us" ) {
				$(contentBlockName).contents().find("input[name='element1']").val("About Us");
				$(contentBlockName).contents().find("textarea[name='element2']").val("This is a teaser for the about us pod. Elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam.");
				$(contentBlockName).contents().find("input[name='element3']").val("/About-Us");
				var className = contentBlockName.replace(/\./g, "");
				$(contentBlockName).contents().find('[v65js="uploadFormArea"]').after('<a class="downloadMessage" href="https://dynavee.vin65.com/assets/images/contentblock/photos/cellar.jpg" download="'+className+'.jpg">'+className+' is almost complete... Click here to download the banner image, then upload it.</a>')
				$(contentBlockName).css('width', '1000px');
				$(contentBlockName).css('height', '1000px');
			} else if( contentBlockName === ".Event_1" ) {
				$(contentBlockName).contents().find("input[name='element1']").val("May");
				$(contentBlockName).contents().find("input[name='element2']").val("23rd");
				$(contentBlockName).contents().find("input[name='element3']").val("2013");
				$(contentBlockName).contents().find("input[name='element4']").val("Lorum Ipsum Wine Tasting");
				$(contentBlockName).contents().find("input[name='element5']").val("At the tasting house");
				$(contentBlockName).contents().find("input[name='element6']").val("2:00pm - 3:00pm");
				$(contentBlockName).contents().find("textarea[name='element7']").val("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.");
				$(contentBlockName).contents().find("input[name='element8']").val("/About-Us/Events");
			} else if( contentBlockName === ".Event_2" ) {
				$(contentBlockName).contents().find("input[name='element1']").val("June");
				$(contentBlockName).contents().find("input[name='element2']").val("15th");
				$(contentBlockName).contents().find("input[name='element3']").val("2013");
				$(contentBlockName).contents().find("input[name='element4']").val("Dolor sai vie");
				$(contentBlockName).contents().find("input[name='element5']").val("At the Wine Cellar");
				$(contentBlockName).contents().find("input[name='element6']").val("5:00pm - 12:00am");
				$(contentBlockName).contents().find("textarea[name='element7']").val("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.");
				$(contentBlockName).contents().find("input[name='element8']").val("/About-Us/Events");
			} else if( contentBlockName === ".Our_Wines" ) {
				var className = contentBlockName.replace(/\./g, "");
				$(contentBlockName).contents().find('[v65js="uploadFormArea"]').after('<a class="downloadMessage" href="https://dynavee.vin65.com/assets/images/contentblock/photos/bottles.png" download="'+className+'.png">'+className+' is almost complete... Click here to download the banner image, then upload it.</a>');
				$(contentBlockName).css('width', '1000px');
				$(contentBlockName).css('height', '1000px');
				$(contentBlockName).contents().find("input[name='element2']").val("Our Wines");
				$(contentBlockName).contents().find("textarea[name='element3']").val("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.");
				$(contentBlockName).contents().find("input[name='element4']").val("/Wines");
			} else if( contentBlockName === ".homeFeatureImage" ) {
				var className = contentBlockName.replace(/\./g, "");
				$(contentBlockName).contents().find('[v65js="uploadFormArea"]').after('<a class="downloadMessage" href="https://skambee.vin65.com/assets/images/contentblock/photos/homepage-feature.jpg" download="'+className+'.jpg">'+className+' is almost complete... Click here to download the banner image, then upload it.</a>');
				$(contentBlockName).css('width', '1000px');
				$(contentBlockName).css('height', '1000px');
			} else if( contentBlockName === ".pageFeatureImage" ) {
				var className = contentBlockName.replace(/\./g, "");
				$(contentBlockName).contents().find('[v65js="uploadFormArea"]').after('<a class="downloadMessage" href="https://skambee.vin65.com/assets/images/contentblock/photos/page-feature.jpg" download="'+className+'.jpg">'+className+' is almost complete... Click here to download the banner image, then upload it.</a>');
				$(contentBlockName).css('width', '1000px');
				$(contentBlockName).css('height', '1000px');
			}
			$(contentBlockName).contents().find('[v65js="submitEdit"]').trigger('click');
			setTimeout(function() {
				if( contentBlockName !== ".About_Us" ) {
					contentBlockInput.automation.completeMessage(contentBlockName, template);
				}
				$('.progress-bar').css('width', progress + '%');
				$('.progress-bar').text(progress + '%');
			}, 3000);
		},
		completeMessage : function(contentBlockName, template) {
			var className = contentBlockName.replace(/\./g, "").replace(/_/g, ' ');
			if( contentBlockName === ".pageFeatureImage" ) {
				$( '<h2>'+className+' is not complete</h2><p>Make sure to assign the content block to a page!</p>' ).insertAfter( ".progress" );
			} else {
				$( '<h2>'+className+' is complete</h2><button class="btn-warning" onclick="location.reload();">Click here to stop</button><br/>' ).insertAfter( ".progress" );
			}
		}
	}
};