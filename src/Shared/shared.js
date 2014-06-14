var RQ = RQ || {};

RQ.RULE_TYPES = {
  REDIRECT: 'Redirect'
};

RQ.RULE_STATUS = {
  ACTIVE: 'Active'
};

RQ.htmlEncode = function(value){
  return $('<div/>').text(value).html();
};