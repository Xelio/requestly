var RQ = RQ || {};

RQ.RULE_TYPES = {
  REDIRECT: 'Redirect'
};

RQ.RULE_STATUS = {
  ACTIVE: 'Active'
};

RQ.RULE_KEYS = {
  URL: 'Url',
  HEADER: 'Header'
};

RQ.RULE_OPERATORS = {
  EQUALS: 'Equals',
  CONTAINS: 'Contains'
};

RQ.htmlEncode = function(value){
  return $('<div/>').text(value).html();
};