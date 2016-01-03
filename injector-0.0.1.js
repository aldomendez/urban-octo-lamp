(function() {
  var codes, inject, requestBOM, requestQueue, runOnjQueryLoad;
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
  inject("//wmatvmlr401/lr4/bom/jquery-2.1.4.js");
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
    function requestQueue(queue1) {
      this.queue = queue1 != null ? queue1 : [];
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
    
    return requestQueue;

  })();
  window.codes = codes = ['TPIC-10410-CM1', 'TPIC-10410-CM5', 'TPIC-10410-A4', 'TPIC-10410-B4', 'TPIC-10410-D4', 'TPIC-10410-AV1', 'RPIC-10410-CM1', 'RPIC-10410-CM5', 'RPIC-10410-AV1'];
  return runOnjQueryLoad(function() {
    var queue;
    queue = new requestQueue(codes);
    queue.fn = function(code, offset) {
      return requestBOM(code).done((function(_this) {
        return function(data) {
          window.mmm = data;
          $('body').html(data.substr(data.search(/<table BORDER="1">/)));
          codes[offset] = {
            code: code,
            item: $('table:eq(0) tbody tr:eq(1) td:eq(5)').text(),
            qty: $('table:eq(0) tbody tr:eq(1) td:eq(9)').text()
          };
          return queue.next();
        };
      })(this));
    };
    return queue.next();
  });
})();