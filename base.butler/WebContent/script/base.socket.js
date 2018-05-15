/*! Copyright (c) 2018 munchkin team
 * SourceName: base.socket
 * Version: 0.0.2
 * SnapshotDate: 2018.05.15
 * 
 * Developer's list
 * - seongho, hong
 * 
 * MIT License(http://www.opensource.org/licenses/mit-license.php)
 */

var baseSocketArray = [];
var baseSocketLoop;
var baseSocketFunctionLoop = [];

var baseSocketHeartbeatTime = 2000;
var baseSocketHeartbeatLimitTime = 5000;

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
//				console.log("_connectCallback~~");
				
				
				_client.subscribe($option.destination, function(data){
					
					var body = JSON.parse(data.body);
					if(body.type === 'heartbeat'){
						
						
						var _isEmptyData = true;
						
						for(var i = 0 ; i < baseSocketArray.length ; i ++){
							console.log(baseSocketArray[i]);
							var _bodyData = JSON.parse(baseSocketArray[i].data);
							if(baseSocketArray[i].userPId === body.userPId 
									&& 
								baseSocketArray[i].destination === body.destination 
									&&
								_bodyData.type === body.object 
							){
//								console.log("날짜를 갱신합니다.");
								baseSocketArray[i].sessionDate = new Date();
								_isEmptyData = false;
								return;
							}
						}
						
						if(_isEmptyData){
							var _arrayData = {
									userPId : body.userPId,
									userName : body.userName,
									destination : body.destination,
									type : body.object ,
									sessionDate : new Date(),
									data : JSON.stringify(body.data)
							};
							baseSocketArray.push(_arrayData);
							
							if(callback){
								callback(body);
							}

						}
						
					}else if(body.type === 'refresh' && callback){
						callback(body);
					}else if(body.type === 'writing' && callback){
						//참여자 정보 추가하기
						
						if(isIntegerValid(body.userPId)){
							
							var _isDuplication = false;
							for(var i = 0 ; i < baseSocketArray.length ; i++){
								if(
									baseSocketArray[i].userPId === body.userPId
										&&
									baseSocketArray[i].type === 'writing'
								){
									_isDuplication = true;
									return;
								}
							}
							if(!_isDuplication){
								var _arrayData = {
										userPId : body.userPId,
										userName : body.userName,
										destination : $option.destination,
										type : 'writing',
										sessionDate : new Date(),
										data : data.body
								};
								baseSocketArray.push(_arrayData);
							}
							
							stopSocketLoop();
							startSocketLoop($option, callback);
							
						}else{
							base.modal('userPId 정보가 필요합니다.');
							return;
						}
						
						callback(body);
					}else if(body.type === 'written' && callback){
						//write heart-beat가 끝나서 굳이 지울필요가 없음.
						if(callback)
							callback(body);
					}else{
						if(callback)
							callback(data);
					}
				})
			}
			var _errorCallback = function(x){
				console.log("errorCallback~~", x);
				return x;
			};

			_client.connect($option.userName, $option.password, _connectCallback, _errorCallback, $option.virtualHost);

			

			startSocketLoop($option, callback);
			
			return _client;
			
		},

	    /**
	     * @desc : 이벤트 :: 새로고침 / 구독하고 있는 페이지에 대해 새로고침 명령어를 전달한다. 
	     * @date : 2018.05.14
	     * @author: 홍성호
	     * @support : 
	     * 	IE 10+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * client								R		string			base.socket으로 부터 반환된 connection 정보
	     * destination							R		string			websocket 서버의 목적지 정보
	     * 
	     * @sample : 
	     * 	
	     * base.socketEventRefresh({	
         *		client : socketClient,
         *      destination : '/topic/test',
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
		socketEventRefresh : function($option){
			if($option.client && $option.client.connected){
				
				var _socketDefault = {
					type : 'refresh'
				}

		        var _socketParam = $.extend({}, _socketDefault, $option.data);
				
				$option.client.send($option.destination, {"content-type":"text/plain"}, JSON.stringify(_socketParam));
			}
		},

		socketEventWriting : function($option){
			if($option.client && $option.client.connected){
				
				var _socketDefault = {
					type : 'writing'
				}

				var _socketParam = $.extend({}, _socketDefault, $option.data);

				var _loop = setInterval( function(){
					var _heartbeat = {
						type : 'heartbeat',
						object : 'writing',
						userPId : $option.data.userPId,
						userName : $option.data.userName,
						destination : $option.destination,
						data : _socketParam
					}
					$option.client.send($option.destination, {"content-type":"text/plain"}, JSON.stringify(_heartbeat));
				}, baseSocketHeartbeatTime);
				
				var loopData = {
					type : 'writing',
					userPId : $option.data.userPId,
					destination : $option.destination,
					data : _loop
				}
				baseSocketFunctionLoop.push(loopData);
				
				$option.client.send($option.destination, {"content-type":"text/plain"}, JSON.stringify(_socketParam));
			}
		},

		socketEventWritten : function($option){
			if($option.client && $option.client.connected){
				//루프를 끕니다.
				
				console.log('루프를 끕니다');
				for(var i = 0 ; i < baseSocketFunctionLoop.length ; i++){
					
					if( 
							baseSocketFunctionLoop[i].userPId === $option.data.userPId
								&&
							baseSocketFunctionLoop[i].destination === $option.destination
								&&
							baseSocketFunctionLoop[i].type === 'writing'
					){
						var _loop = baseSocketFunctionLoop[i].data;
						clearInterval(_loop);
					}
				}
				
				//현재 사용자가 수정중이라면, 수정중을 뻅니다.
				
				
				var _socketDefault = {
					type : 'written'
				}

				var _socketParam = $.extend({}, _socketDefault, $option.data);
				
				$option.client.send($option.destination, {"content-type":"text/plain"}, JSON.stringify(_socketParam));
			}
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


function startSocketLoop($option, callback){
	baseSocketLoop = setInterval( function(){
		for(var i = 0 ; i < baseSocketArray.length; i++){
			if( ( (new Date()) - baseSocketArray[i].sessionDate) > 5000 ){
				baseSocketArray.splice(i,1);
				if(callback) callback();
			}
		}
	}, baseSocketHeartbeatLimitTime);
}
function stopSocketLoop(){
	clearInterval(baseSocketLoop);
}