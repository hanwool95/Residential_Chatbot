// ws 변수 선언
let ws;

// 웹 소켓 선언
ws = new WebSocket("ws://localhost:8100");

$( document ).ready( function()
  {
      // view의 텍스트 모아두는 div 타겟하여 txtRecv
      let txtRecv = $('#Recv');

      // ws의 onopen 함수. 서버 연결되면 동작. e는 event
      ws.onopen = function(e){
          txtRecv.append( "connected<br>" );
   };

      // ws의 onmessage 함수. 웹소켓에서 메세지 수신 있을 경우 동작. e는 메세지
      ws.onmessage = function(e){
          e.data.text().then((s) =>{
              txtRecv.append( s + "<br>" );
              console.log(s)
          })
          // txtRecv.append( e.data.text() + "<br>" );
          // console.log(e.data)
   };
      // ws의 onclose 함수. 웹소켓 세션이 종료될 경우 동작. e는 close event
      ws.onclose = function(e){
          txtRecv.append( "closed<br>" );
   }
  });

// 서버로 메세지 전송하는 함수. on Click event 발생시 실행.
function sendMessage()
  {
      // 사용자가 입력해 놓은 input box안 내용은 txtSend의 val()
      let txtSend = $('#Send');
      // ws에 정보 전송.
      ws.send( txtSend.val() );
      // $('#Recv').append( txtSend.val() + "<br>")
      // Box 초기화.
      txtSend.val( "" );
  }