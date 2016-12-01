/* bender-tags: editor */
/* bender-ckeditor-plugins: wysiwygarea,structuredheadings */

// Clean up all instances been created on the page.
(function () {
  "use strict";
  function removeAllInstances() {
    var allInstances = CKEDITOR.instances;
    for (var i in allInstances) {
      CKEDITOR.remove(allInstances[i]);
    }
  }

  bender.test({
    setUp: function () {
      removeAllInstances();
    },

    "test it loads with the plugin enabled": function () {
      CKEDITOR.replace("editor1");
      bender.assert.isObject(CKEDITOR.instances.editor1, "editor instance not found");
    }
  });
})();
