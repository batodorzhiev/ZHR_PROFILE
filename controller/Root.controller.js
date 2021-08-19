sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ru.rosneft.flp.zEmployeeProfile.controller.Root", {
		closeDialog: function(e) {
			e.getSource().getParent().close();
		}
	});
});