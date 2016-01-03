do ()->
  inject=(addr)->
    script = document.createElement("script");
    script.src = addr;
    document.head.appendChild(script);
  runOnjQueryLoad = (fn)->
    tmr = window.setInterval ()->
      if jQuery?  then clearInterval(tmr); fn()
    ,0

  requestBOM = (item)->
    bomPage = 'http://erpsupportportal.avagotech.net/Avago_Oracle/Cyoptics/Query_Cyoptics_SAP_Check_Start_BOM.asp'
    jQuery.post(bomPage,{
      "SelInstance":"OPROD"
      "txtItemSearch":item
      "txtQty":"1"
    })

  class requestQueue
    constructor: (@queue = []) ->
      @offset = 0
    next: ()->
      if @queue.length - @offset is 0 then return undefined
      else
        @fn(@queue[@offset], @offset)
        @offset = @offset + 1
    isEmpty:()->
      @queue.length - @offset is 0
    
  findItemInDOM = (item)->
    elementQty = $(".insert table:eq(0) tbody tr").length
    for i in [0..elementQty]
      if $(".insert table:eq(0) tbody tr:eq(#{i}) td:eq(3)").text() is item
        return i

  runOnjQueryLoad ()->
    # Reference to FireBase
    # fb = new Firebase("https://popping-torch-4390.firebaseio.com/ShimPaquetes")

    window.codes = codes = [
      {code:'TPIC-10410-CM1',items:['5067-5150']}
      {code:'TPIC-10410-CM5',items:['5067-5329']}
      # {code:'TPIC-10410-A4',items:['5067-5009']}
      {code:'TPIC-10410-B4',items:['LR4G2WSIL']}
      # {code:'TPIC-10410-D4',items:['5067-5111']}
      # {code:'TPIC-10410-AV1',items:['5067-5072']}
      {code:'RPIC-10410-CM1',items:['5067-5149','5067-5151']}
      {code:'RPIC-10410-CM5',items:['5067-5328','5067-5330']}
      {code:'RPIC-10410-AV1',items:['5067-5073','LR4-HIC-ROSA']}
    ]
    $('body').html('')
    $('body').append('<div class="disp">Cargando...</br></div><div class="insert" style="display: none;"></div>')
    window.q = queue = new requestQueue(codes)
    queue.fn = (code, offset)->
      requestBOM(code.code).done (data)=>
        window.mmm = data
        $('.disp').append('(*)')
        $('body .insert').html(data.substr(data.search(/<table BORDER="1">/)))
        for item, i in code.items
          index = findItemInDOM(item)
          # $('.insert table:eq(0) tbody tr:eq(0) td:eq(5)').text(code)
          codes[offset].items[i] = 
            code:code.code,
            itemCode:item,
            item:$(".insert table:eq(0) tbody tr:eq(#{index}) td:eq(5)").text(),
            qty:$(".insert table:eq(0) tbody tr:eq(#{index}) td:eq(9)").text()
          
        if queue.isEmpty()
          $('.insert').html('')
          $('.disp').html('').append('<table border="1"><tr><th>Code</th><th>Item Code</th><th>Item Desc</th><th>Qty</th></tr></table>')
          codes.forEach (el)->
            el.items.forEach (item,i,arr)->
              if arr.length isnt 1
                if i is 0 then $('.disp table').append("<tr><td rowspan='#{arr.length}'>#{el.items[i].code}</td><td>#{el.items[i].itemCode}</td><td>#{el.items[i].item}</td><td>#{el.items[i].qty}</td></tr>")
                if i >= 1 then $('.disp table').append("<tr><td>#{el.items[i].itemCode}</td><td>#{el.items[i].item}</td><td>#{el.items[i].qty}</td></tr>")
              else
                $('.disp table').append("<tr><td>#{el.items[i].code}</td><td>#{el.items[i].itemCode}</td><td>#{el.items[i].item}</td><td>#{el.items[i].qty}</td></tr>")
                
        else
          queue.next()
    queue.next()

  inject 'https://cdn.firebase.com/js/client/2.2.9/firebase.js'
  inject "//wmatvmlr401/lr4/bom/jquery-2.1.4.js"











