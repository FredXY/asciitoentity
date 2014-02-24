/*global define, $, brackets, Mustache */
define(function (require, exports, module) {
    "use strict";
    var COMMAND_ID = "asciitoentity.asciito",
        CommandManager = brackets.getModule("command/CommandManager"),
		ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        Dlg = brackets.getModule("widgets/Dialogs"),
        Modal = require("text!html/modal.html"),
        RightCol = require("text!html/asciito.html");
    function ath(a) {
        var v = a.toString(16);
        while (v.length < 4) {v = "0" + v; }
        return "\\u" + v;
    }
    function asciiModal() {
        var templateVars = {
            title: "ASCII code to Unicode & HTML Entity",
            label1: "ASCII",
			label2: "Unicode Entity",
			label3: "HTML Entity",
            cancel: "Cancel"
        }, $mdl, $ascii;
        Dlg.showModalDialogUsingTemplate(Mustache.render(Modal, templateVars), false);
        $mdl = $(".ascii-entity.instance");
        $ascii = $mdl.find("#c");
        $ascii.focus();
        $mdl.find(".dialog-button[data-button-id='cancel']").on("click", function () {
            Dlg.cancelModalDialogIfOpen("ascii-entity");
        });
        $ascii.on("keyup", function () {
            var	f = this.value, n;
            this.focus();
            this.select();
            if (f.search(/[0-9]/g) === -1) {
                n = f.charCodeAt(0);
            } else {
                n = f;
            }
            $("#u").val(ath(parseInt(n, 10)));
            $("#h").val("&#" + n + ";");
        });
        $mdl.find("#c,#u,#h").on("click", function () {
            this.select();
        });
    }
    ExtensionUtils.loadStyleSheet(module, "css/styles.css");
    $("#main-toolbar .buttons").append(RightCol);
    $(".ascii").on('click', function () {
        asciiModal();
    });
    CommandManager.register("asciito", COMMAND_ID, asciiModal);
});