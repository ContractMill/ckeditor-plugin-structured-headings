/* eslint-disable */
/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: wysiwygarea,structuredheadings,toolbar,basicstyles,dialog,richcombo,undo,list,indentlist */
/* eslint-enable */

// Clean up all instances been created on the page.
(function () {

  var comboName = "NumStyles";

  bender.editor = {
    allowedForTests: "h1; h2; p; ol; li; ul;"
  };

  bender.test({
    setUp: function () {
      //Anything to be run before each test if needed
    },
    assertComboBeforeAfter: function (opts) {
      var bot = this.editorBot;
      // i wish we had ES6

      var initialHtmlWithSelection = opts.beforeHtml || "";
      var comboItem = opts.comboItem || "1. a. i. a. i.";
      var htmlGetter;

      if (opts.ignoreSelection) {
        htmlGetter = bot.getData.bind(bot);
      } else {
        htmlGetter = bot.htmlWithSelection.bind(bot);
      }

      bot.setHtmlWithSelection(initialHtmlWithSelection);

      bot.combo(comboName, function (combo) {
        combo.onClick(comboItem);

        assert.areSame(
          opts.afterHtml,
          htmlGetter(),
          "applied " + comboItem + " to html"
        );

        bot.execCommand("undo");

        assert.areSame(
            initialHtmlWithSelection,
            htmlGetter(),
            "undid " + comboItem
        );
      });
    },
    "applying the complex styles does a no-op": function() {
      // this item would normally be hidden, but let's just make sure that it doesn't do anything
      var comboItem = "1. a. i. a. i.";
      var beforeHtmlWithSelection = "<ol><li>^foo</li></ol>";
      var afterHtmlWithSelection = beforeHtmlWithSelection;
      // wtb destructuring
      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };
      this.assertComboBeforeAfter(opts);
    },
    // TODO tests below are now irrelevant, refactor later
    "apply 1aiai style to a ordered list tag": function () {
      var comboItem = "1. a. i. a. i.";
      var beforeHtmlWithSelection = "<ol><li>^foo</li></ol>";
      var afterHtmlWithSelection = "<ol class=\"list-decimal\"><li>^foo</li></ol>";
      // wtb destructuring
      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };
      this.assertComboBeforeAfter(opts);
    },
    "apply 1aiai style to a nested list tag": function () {
      var comboItem = "1. a. i. a. i.";
      var beforeHtmlWithSelection = "<ol><li>foo<ol><li>^bar</li></ol></li></ol>";
      var afterHtmlWithSelection = "<ol class=\"list-decimal\">" +
        "<li>foo" +
        "<ol class=\"list-lower-alpha\"><li>^bar</li></ol>" +
        "</li></ol>";

      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };

      this.assertComboBeforeAfter(opts);
    },
    "apply 1aiai style to a mixed list, ignore uls in count": function () {
      var comboItem = "1. a. i. a. i.";
      var beforeHtmlWithSelection = "<ol><li>foo" +
        "<ul><li>bar" +
		"<ol><li>^baz</li></ol>" +
		"</li></ul>" +
        "</li></ol>";
      var afterHtmlWithSelection = "<ol class=\"list-decimal\"><li>foo" +
        "<ul><li>bar" +
		"<ol class=\"list-lower-alpha\"><li>^baz</li></ol>" +
		"</li></ul>" +
        "</li></ol>";

      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };

      this.assertComboBeforeAfter(opts);
    },
    "apply 1aiai style to a 6 level nested list tag": function () {
      var comboItem = "1. a. i. a. i.";
      var beforeHtmlWithSelection = "<ol><li>A" +
        "<ol><li>^B" +
        "<ol><li>C" +
        "<ol><li>D" +
        "<ol><li>E" +
        "<ol><li>F</li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol>";
      var afterHtmlWithSelection = "<ol class=\"list-decimal\"><li>A" +
        "<ol class=\"list-lower-alpha\"><li>^B" +
        "<ol class=\"list-lower-roman\"><li>C" +
        "<ol class=\"list-lower-alpha\"><li>D" +
        "<ol class=\"list-lower-roman\"><li>E" +
        "<ol class=\"list-decimal\"><li>F</li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol>";

      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };

      this.assertComboBeforeAfter(opts);
    },
    "clear from nested list": function () {
      var comboItem = "clear";
        // reverse the previous
      var afterHtmlWithSelection = "<ol><li>A" +
        "<ol><li>^B" +
        "<ol><li>C" +
        "<ol><li>D" +
        "<ol><li>E" +
        "<ol><li>F</li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol>";
      var beforeHtmlWithSelection = "<ol class=\"list-decimal\"><li>A" +
        "<ol class=\"list-lower-alpha\"><li>^B" +
        "<ol class=\"list-lower-roman\"><li>C" +
        "<ol class=\"list-lower-alpha\"><li>D" +
        "<ol class=\"list-lower-roman\"><li>E" +
        "<ol class=\"list-decimal\"><li>F</li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol></li>" +
        "</ol>";
      var opts = {
        comboItem: comboItem,
        beforeHtml: beforeHtmlWithSelection,
        afterHtml: afterHtmlWithSelection
      };

      this.assertComboBeforeAfter(opts);

    }
  });
})();
