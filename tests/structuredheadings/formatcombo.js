/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: wysiwygarea,structuredheadings,toolbar,basicstyles,dialog,richcombo */

// Clean up all instances been created on the page.
(function () {

  bender.editor = {
    allowedForTests: "h1; h2; p"
  };

  bender.test({
    setUp: function () {
      //Anything to be run before each test if needed
    },

    "test apply format style": function () {
      var bot = this.editorBot;
      var ed = this.editor;
      bot.setHtmlWithSelection("<p>^foo</p>");
      var name = "NumFormats";
      var formatCombo = ed.ui.get(name);
      assert.areSame(CKEDITOR.TRISTATE_OFF, formatCombo._.state, "check state OFF");

      bot.combo(name, function (combo) {
        assert.areSame(CKEDITOR.TRISTATE_ON, combo._.state, "check state ON when opened");
        combo.onClick("h2");
        assert.areSame(
            "<h2 class=\"autonumber autonumber-1\">^foo</h2>",
            bot.htmlWithSelection(),
            "applied h1 block style"
        );
      });
    }

  });
})();
