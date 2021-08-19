sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("ru.rosneft.flp.zEmployeeProfile.Component", {
		metadata: {
			manifest: "json"
		},

		// Constructor
		init: function() {
			if (sap.ui.getCore().isInitialized()) {
				this.editProfile();
			} else {
				sap.ui.getCore().attachInit(this.editProfile());
			}
		},

		editProfile: function() {
			var button = sap.ui.getCore().byId("meAreaHeaderButton");
			var controller = this;
			button.attachPress(function() {
				controller.popover = sap.ui.getCore().byId("sapUshellMeAreaPopover");
				controller.addOnce = true;
				if (controller.popover) {
					controller.popover.getContent()[0].attachUpdateFinished(controller.appendListItem.bind(controller));
				} else {
					var checkExist = setInterval(function() {
						if (sap.ui.getCore().byId("sapUshellMeAreaPopover")) {
							controller.appendListItem();
							clearInterval(checkExist);
						}
					}, 20); // check every 20ms
				}
			});
		},

		appendListItem: function() {
			var list = sap.ui.getCore().byId("sapUshellMeAreaPopover").getContent()[0];
			var items = list.getItems();
			if (this.addOnce) {
				var newItem = new sap.m.StandardListItem({
					icon: "sap-icon://person-placeholder",
					iconInset: true,
					title: "Профиль работника",
					type: "Active",
					press: this.showFragment.bind(this)
				});
				items.unshift(newItem);
				list.removeAllItems();
				items.forEach(function(item) {
					list.addItem(item);
					if (item.getId().indexOf("Contact") > -1) {
						item.setVisible(false);
					}
				});
				this.addOnce = false;
			}
		},

		showFragment: function() {
			if (!this.profileView) {
				this.profileView = new sap.ui.xmlview("ru.rosneft.flp.zEmployeeProfile.view.Root");
				sap.ui.getCore().byId("shell").addDependent(this.profileView);
				for (var model in this.oModels) {
					if (model !== "undefined") {
						this.profileView.setModel(this.oModels[model], model);
					}
				}
			}
			this.profileView.getContent()[0].open();
		}
	});
});