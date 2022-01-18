window.onload = function(){
    //웹소켓 연결하여 클라이언트 소켓 정의.
    var socket = io.connect('ws://127.0.0.1:3001');
    // id를 참조하여 메세지 정의. div는 메세지 박스, txt는 메세지 내용.
    var div = document.getElementById('message');
    var txt = document.getElementById('txtChat');
    //텍스트 박스에 포커스 주기
    txt.focus();

    // 텍스트박스 element에 onkeydown이라는 이벤트 발생시 실행될 바인딩 함수(고유 함수 제작)
    txt.onkeydown = sendMessage.bind(this);
    function sendMessage(event){
        // event.keyCode 13은 Enter. 즉 Enter event 발생시 동작.
        if(event.keyCode == 13){
            // message는 이벤트 발생했을 때 메세지값을 받음.
            var message = event.target.value;
            // 메세지 입력되었는지 확인
            if(message){
                // 엔터 + 메세지 있으면 소켓서버에 serverReceviver라는 이벤트 활성화하여 메세지 값 전송.
                socket.emit('serverReceiver', message);
                //텍스트박스는 초기화
                txt.value = '';
            }
        }
    };

    //ClientReceiver라는 이벤트 함수를 켜놓는 상황 정의. 서버로부터 이 이벤트 호출 받는다면 실행.
    // data 안에는 Client가 전송한 clientID 정보, message 정보가 있음.
    socket.on('clientReceiver', function(data){
        //채팅창에 출력할 메세지 string을 합성. 서버로부터 받아온 data 안의 정보를 활용하여 제작.
        var message = '['+ data.clientID + '님의 말' + '] ' + data.message;
        // div 채팅창에 메세지 추가 이후 띄어쓰기.
        div.innerText += message + '\r\n';
        // div 채팅창 스크롤바 내리기
        div.scrollTop = div.scrollHeight;
    });
};

