/*! Copyright (c) 2018 munchkin team
 * SourceName: base.socket
 * Version: 0.0.1
 * SnapshotDate: 2018.03.15
 * 
 * Developer's list
 * - seongho, hong
 * 
 * MIT License(http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {
	jQuery.extend(base, {

	    /**
	     * @desc : 웹소켓을 사용하여 서버로부터 전달되는 메시지를 구독한다.
	     * @date : 2018.03.15
	     * @author: 홍성호
	     * @support : 
	     * 	IE 10+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * host									R		string			websocket 서버의 host 정보
	     * port					15674			O		itneger			websocket 서버의 port 정보 / rabbitmq의 기본값의 경우 15672
	     * virtualHost			/				O		string			websocket 서버의 virtual host 정보
	     * destination			/topic/test		O		string			websocket 서버의 목적지 정보
	     * userName				guest			O		string			websocket 서버의 계정 아이디
	     * password				guest			O		string			websocket 서버의 계정 비밀번호
	     * 
	     * @sample : 
	     * 	
	     * var socketClient = base.socket({	
	     * 		host : 'host..',	
	     * 		port : 'port..',	
	     * 		virtualHost : '/common/topic',	
	     * 		destination : '/topic/test',	
	     * 		userName : 'account',	
	     * 		password : 'password'	
	     * }, function(callbackData){	
	     * 		console.log(callbackData);	
	     * 		$('body').append('<p>' + callbackData.body + '</p>');	
	     * });	
	     * 
	     * @required : 
	     * 	- jquery-3.2.1.js
	     * 	- sockjs-1.1.4.js
	     * 	- stomp.js
	     * @optional :
	     * @return :
	     * 		stomp
	     * @update : 
	     * 	일시		이름	변경내용
	     */
		socket : function($param, callback){
			

			var $default = {
				port : '15674',
				virtualHost: '/',
		    	destination : '/topic/test',
				userName : 'guest',
				password : 'guest'
			}
			
	        var $option = $.extend({}, $default, $param);
			
			
			if (location.search == '?ws') {
				if( ! window.WebSocket ){
					base.modal('to Developer :: WebSocket 관련 Script Library가 존재하지 않습니다.');
					console.log('유효성 검증 실패 :: to Developer :: WebSocket 관련 Script Library가 존재하지 않습니다.');
					return;
				}
				var _ws = new WebSocket('ws://' + $option.host + ':' + $option.port + '/ws');
			} else {
				if( ! window.SockJS ){
					base.modal('to Developer :: SockJS 관련 Script Library가 존재하지 않습니다.');
					console.log('유효성 검증 실패 :: to Developer :: SockJS 관련 Script Library가 존재하지 않습니다.');
					return;
				}
				var _ws = new SockJS('http://' + $option.host + ':' + $option.port + '/stomp');
			}

			var _client = Stomp.over(_ws);
			
			var _connectCallback = function(){
				console.log("_connectCallback~~");
				_client.subscribe($option.destination, function(data){
					callback(data);
				})
			}
			var _errorCallback = function(x){
				console.log("errorCallback~~", x);
				return x;
			};

			_client.connect($option.userName, $option.password, _connectCallback, _errorCallback, $option.virtualHost);
			
			return _client;
			
		},

	    /**
	     * @desc : 웹소켓을 사용하여 설정된 destination을 구독하는 클라이언트에게 메시지를 전달한다.
	     * @date : 2018.03.15
	     * @author: 홍성호
	     * @support : 
	     * 	IE 10+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * client								R		string			base.socket으로 부터 반환된 connection 정보
	     * destination							R		string			websocket 서버의 목적지 정보
	     * data									O		string			websocket 서버의 계정 아이디
	     * 
	     * @sample : 
	     * 	
	     * base._socketSendTest({	
         *		client : socketClient,
         *      destination : '/topic/test',
         *		data : 'testMessage.......'
	     * });	
	     * 
	     * @required : 
	     * 	- jquery-3.2.1.js
	     * 	- sockjs-1.1.4.js
	     * 	- stomp.js
	     * @optional :
	     * @return :
	     * @update : 
	     * 	일시		이름	변경내용
	     */
		_socketSendTest : function($option){
			if($option.client){
				if($option.client.connected)
					$option.client.send($option.destination, {"content-type":"text/plain"}, $option.data);
			}
		}
	})
})(jQuery)