/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: wysiwygarea,structuredheadings,toolbar,basicstyles,dialog,richcombo */

// Clean up all instances been created on the page.
(function () {

  var comboName = "NumStyles";
  var itemName = "clear";

  bender.editor = {
    allowedForTests: "h1; h2; p"
  };

  bender.test({
    setUp: function () {
      //Anything to be run before each test if needed
    },
    "clear numbering style to a single autonumbered heading": function () {
      var bot = this.editorBot;
      bot.setHtmlWithSelection("<h1 class=\"autonumber autonumber-0 autonumber-N\">^foo</h1>");

      bot.combo(comboName, function (combo) {
        combo.onClick(itemName);
        assert.areSame(
            "<h1>^foo</h1>",
            bot.htmlWithSelection(),
            "cleared styling from h1"
        );
      });
    },
    "clear numbering style to multiple autonumbered h1": function () {
      var bot = this.editorBot;
      bot.setHtmlWithSelection(
        "[<h1 class=\"autonumber autonumber-0 autonumber-N\">foo</h1>" +
        "<p>bar</p>" +
        "<h1 class=\"autonumber autonumber-0 autonumber-N\">baz</h1>]"
      );

      bot.combo(comboName, function (combo) {
        combo.onClick(itemName);
        assert.areSame(
            "<h1>foo</h1><p>bar</p><h1>baz</h1>",
            bot.getData(),
            "cleared styling fro headings"
        );
      });
    }
  });
})();
