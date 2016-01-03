// Generated by CoffeeScript 1.7.1
(function() {
  var findItemInDOM, inject, requestBOM, requestQueue, runOnjQueryLoad;
  inject = function(addr) {
    var script;
    script = document.createElement("script");
    script.src = addr;
    return document.head.appendChild(script);
  };
  runOnjQueryLoad = function(fn) {
    var tmr;
    return tmr = window.setInterval(function() {
      if (typeof jQuery !== "undefined" && jQuery !== null) {
        clearInterval(tmr);
        return fn();
      }
    }, 0);
  };
  requestBOM = function(item) {
    var bomPage;
    bomPage = 'http://erpsupportportal.avagotech.net/Avago_Oracle/Cyoptics/Query_Cyoptics_SAP_Check_Start_BOM.asp';
    return jQuery.post(bomPage, {
      "SelInstance": "OPROD",
      "txtItemSearch": item,
      "txtQty": "1"
    });
  };
  requestQueue = (function() {
    function requestQueue(queue) {
      this.queue = queue != null ? queue : [];
      this.offset = 0;
    }

    requestQueue.prototype.next = function() {
      if (this.queue.length - this.offset === 0) {
        return void 0;
      } else {
        this.fn(this.queue[this.offset], this.offset);
        return this.offset = this.offset + 1;
      }
    };

    requestQueue.prototype.isEmpty = function() {
      return this.queue.length - this.offset === 0;
    };

    return requestQueue;

  })();
  findItemInDOM = function(item) {
    var elementQty, i, _i;
    elementQty = $(".insert table:eq(0) tbody tr").length;
    for (i = _i = 0; 0 <= elementQty ? _i <= elementQty : _i >= elementQty; i = 0 <= elementQty ? ++_i : --_i) {
      if ($(".insert table:eq(0) tbody tr:eq(" + i + ") td:eq(3)").text() === item) {
        return i;
      }
    }
  };
  runOnjQueryLoad(function() {
    var codes, queue;
    window.codes = codes = [
      {
        code: 'TPIC-10410-CM1',
        items: ['5067-5150']
      }, {
        code: 'TPIC-10410-CM5',
        items: ['5067-5329']
      }, {
        code: 'TPIC-10410-B4',
        items: ['LR4G2WSIL']
      }, {
        code: 'RPIC-10410-CM1',
        items: ['5067-5149', '5067-5151']
      }, {
        code: 'RPIC-10410-CM5',
        items: ['5067-5328', '5067-5330']
      }, {
        code: 'RPIC-10410-AV1',
        items: ['5067-5073', 'LR4-HIC-ROSA']
      }
    ];
    $('body').html('');
    $('body').append('<div class="disp">Cargando...</br></div><div class="insert" style="display: none;"></div>');
    window.q = queue = new requestQueue(codes);
    queue.fn = function(code, offset) {
      return requestBOM(code.code).done((function(_this) {
        return function(data) {
          var i, index, item, _i, _len, _ref;
          window.mmm = data;
          $('.disp').append('(*)');
          $('body .insert').html(data.substr(data.search(/<table BORDER="1">/)));
          _ref = code.items;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            item = _ref[i];
            index = findItemInDOM(item);
            codes[offset].items[i] = {
              code: code.code,
              itemCode: item,
              item: $(".insert table:eq(0) tbody tr:eq(" + index + ") td:eq(5)").text(),
              qty: $(".insert table:eq(0) tbody tr:eq(" + index + ") td:eq(9)").text()
            };
          }
          if (queue.isEmpty()) {
            $('.insert').html('');
            $('.disp').html('').append('<table border="1"><tr><th>Code</th><th>Item Code</th><th>Item Desc</th><th>Qty</th></tr></table>');
            return codes.forEach(function(el) {
              return el.items.forEach(function(item, i, arr) {
                if (arr.length !== 1) {
                  if (i === 0) {
                    $('.disp table').append("<tr><td rowspan='" + arr.length + "'>" + el.items[i].code + "</td><td>" + el.items[i].itemCode + "</td><td>" + el.items[i].item + "</td><td>" + el.items[i].qty + "</td></tr>");
                  }
                  if (i >= 1) {
                    return $('.disp table').append("<tr><td>" + el.items[i].itemCode + "</td><td>" + el.items[i].item + "</td><td>" + el.items[i].qty + "</td></tr>");
                  }
                } else {
                  return $('.disp table').append("<tr><td>" + el.items[i].code + "</td><td>" + el.items[i].itemCode + "</td><td>" + el.items[i].item + "</td><td>" + el.items[i].qty + "</td></tr>");
                }
              });
            });
          } else {
            return queue.next();
          }
        };
      })(this));
    };
    return queue.next();
  });
  inject('https://cdn.firebase.com/js/client/2.2.9/firebase.js');
  return inject("//wmatvmlr401/lr4/bom/jquery-2.1.4.js");
})();
