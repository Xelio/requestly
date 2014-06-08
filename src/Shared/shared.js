var RQ = RQ || {};

RQ.RULE_TYPES = {
  REDIRECT: 'redirect'
};

RQ.RULE_STATUS = {
  ACTIVE: 'active'
};

RQ.htmlEncode = function(value){
  return $('<div/>').text(value).html();
};