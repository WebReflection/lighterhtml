'use strict';
const templateType = 0;
exports.templateType = templateType;

function Template($, _) {
  this.$ = $;
  this._ = _;
}
exports.Template = Template

const TP = Template.prototype;
TP.nodeType = templateType;
TP.valueOf = function () {
  return unroll(this);
};
