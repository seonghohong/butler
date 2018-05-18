/*! Copyright (c) 2018 munchkin team
 * SourceName: base
 * Version: 1.0.3
 * SnapshotDate: 2018.05.15
 * 
 * Developer's list
 * - seongho, hong
 * 
 * MIT License(http://www.opensource.org/licenses/mit-license.php)
 */

var base = {};

function baseClass(){
	"use strict";
    var $this = this;
    
    /**
     * @desc : Java에서 표현하는 UUID를 구현한다.
     * @date : 2018.01.16
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param : 
     * 		명칭			기본값		필수여부	타입			설명
     * @sample : 
     * @required : 
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
	this.getUUID = function() {
		function s4(){ 
			return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

    /**
     * @desc : 서버에 파일을 업로드 할 수 있다.
     * @date : 2018.01.16
     * @author: 홍성호
     * @support : 
     * 	IE 10+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * url									R		string			업로드할 서버의 URL
     * text					찾아보기		C		string			대체 글자 / isButton이 false일 경우 무효
     * 
     * isButton				true			O		boolean			버튼 형태 여부
     * isDisable			false			O		boolean			비활성화 여부
     * isHide				false			O		boolean			숨김 여부
     * isNewLine			false			O		boolean			새로운 라인으로 처리할것인지 여부
     * isMultiple			false			O		boolean			여러개 파일을 올릴것인지 여부
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * width				50				O		integer			가로 크기
     * height				20				O		integer			세로 크기
     * 
     * cursor				pointer			O		string			커서형태
     * 
     * color				default        	O		string			색상
     * textAlign 			default			O		string			가로 정렬
     * verticalAlign		default			O		string			세로 정렬
     *                      
     * fontFamily			default			O		string			font-family               
     * fontStyle			default			O		string			글자 스타일 / italic 등
     * fontWeight			default			O		string			글자 두께 / px등 명시해야함               
     * fontSize				default			O		string			글자 크기/ px등 명시 해야함
     * lineHeight			default			O		string			글자 줄간격, px등 명시 해야함
     * letterSpacing		default			O		string			자간 / px등 명시 해야함
     * wordSpacing			default			O		string			단어간격 / px등 명시 해야함
     * 
     * borderColor			default			O		string			테두리 색상
     * borderStyle			default			O		string			테두리 스타일 / solid 등     
     * borderWidth			default			O		string			테두리 두께      
     * backgroundColor		default			O		string			배경 색상 / backgroundImage가 우선순위 입니다.        
     * backgroundImage		default			O		string			배경 이미지 / backgroundImage가 우선순위 입니다.             
     * backgroundPosition	default			O		string			배경 위치               
     * backgroundRepeat		default			O		string			배경 반복            
     * 
     * @sample : 
     * 	base.fileUpload({
     * 		'borderColor' : '#FF00FF',
     * 		'borderWidth' : '1px',
     * 		'borderStyle' : 'solid',
     * 		
     * 		'fontSize' : '10px',		
     * 		'textAlign' : 'center',
     * 		'lineHeight' : '20px',
     * 		
     * 		'wrapClass' : 'test',
     * 		
     * 		'target' : '#fileUpload',
     * 		'url' : '/component/file/uploadAjax.do'
     * 	}, function(responseData){
     * 		console.log(responseData);
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.fileupload-9.19.3.js
     * 	- jquery.ui-1.12.1.js
     * @optional :
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     * 18.02.14		홍성호	class > wrapClass로 변경 (부모이기 때문에)
     */
	this.fileUpload = function($param, callback){
		
		var $default = {
			width: 50,
			height: 20,
			isButton: true,
			isDisable : false,
			isHide : false,
			isNewLine : false,
			text : '찾아보기',
			cursor : 'pointer'
		};

        var $option = $.extend({}, $default, $param);
        
//		console.log($option);		
		
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if($option.url === undefined){
			this.modal('url은(는) 필수항목입니다.');
			return;
		}
		
		/*
		 * 부모창 css 설정
		 */
		if($option.wrapClass !== undefined)
			$($option.target).addClass($option.wrapClass);
		
		
		if($option.isButton !== undefined)
			$($option.target).append($option.text);
		if($option.isDisable === true || (base.getIEVersion() && base.getIEVersion() < 10))
			$($option.target).addClass('base-disable');
		$option.isHide === true ? $($option.target).hide() : $($option.target).show();
		$($option.target).css('display', $option.isNewLine === true ? 'block' : 'inline-block');
		
		
		$($option.target).css('width', $option.width);
		$($option.target).css('height', $option.height);
		
		$($option.target).css('cursor', $option.cursor);
		
		if($option.color !== undefined)
			$($option.target).css('color', $option.color);
		if($option.textAlign !== undefined)
			$($option.target).css('text-align', $option.textAlign);
		if($option.verticalAlign !== undefined)
			$($option.target).css('vertical-align', $option.verticalAlign);

		
		if($option.fontFamily !== undefined)
			$($option.target).css('font-family', $option.fontFamily);
		if($option.fontStyle !== undefined)
			$($option.target).css('font-style', $option.fontStyle);
		if($option.fontWeight !== undefined)
			$($option.target).css('font-weight', $option.fontWeight);
		if($option.fontSize !== undefined)
			$($option.target).css('font-size', $option.fontSize);
		if($option.lineHeight !== undefined )
			$($option.target).css('line-height', $option.lineHeight);
		if($option.letterSpacing !== undefined )
			$($option.target).css('letter-spacing', $option.letterSpacing);
		if($option.letterSpacing !== undefined )
			$($option.target).css('word-spacing', $option.letterSpacing);

		
		if($option.borderColor !== undefined )
			$($option.target).css('border-color', $option.borderColor);
		if($option.borderStyle !== undefined )
			$($option.target).css('border-style', $option.borderStyle);
		if($option.borderWidth !== undefined )
			$($option.target).css('border-width', $option.borderWidth);
		if($option.backgroundColor !== undefined )
			$($option.target).css('background-color', $option.backgroundColor);
		if($option.backgroundImage !== undefined )
			$($option.target).css('background-image', $option.backgroundImage);
		if($option.backgroundPosition !== undefined )
			$($option.target).css('background-position', $option.backgroundPosition);
		if($option.backgroundRepeat !== undefined )
			$($option.target).css('background-repeat', $option.backgroundRepeat);
		

		var html = '';
		html += '<input type="file" name="'+ $($option.target).attr("id") + '">';
		$($option.target).append(html);

		
		/*
		 * 자식창인 input[type="file"] 에 대한 정의를 합니다. 
		 */
		$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').css('width', $option.width);
		$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').css('height', $option.height);
		$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').css('display', $option.isButton === true ? 'none' : 'block');
		
		if($option.isMultiple)
			$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').attr('multiple', 'multiple');
			
		
		$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').fileupload({
			url: $option.url,
			dataType: 'json',
		    beforeSend: function(xhr, data) {
		    	$('.base-loading').show();
		    },
		    always: function(e, data){
		    	$('.base-loading').hide();
		    },
			done: function (e, data) {
//				console.log(data); 
				callback(data.result);
			}
		});
		
		/*
		 * 이벤트가 부모창에 전달되지 않도록한다.
		 * 부모아래에 속한 이벤트이고, 클릭을 하면 자식과 부모 모두 눌리기때문에 반드시 넣어야 한다.
		 */
		if($option.isDisable === false){
			$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').click(function(e){
				e.stopPropagation();
			});
		}

		
		/*
		 * 부모를 클릭하였을때, 자식을 호출한다.
		 * 자식창에서 반드시 부모에게 가는 이벤트 전파를 막아야 한다.
		 */
		this.fileUploadTrigger($option);
	}
	

    /**
     * @desc : 파일업로드 사용여부 결정
     * @date : 2018.01.17
     * @author: 홍성호
     * @support : 
     * 	IE 10+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * isDisable			false			R		boolean			비활성화 여부
     * 			
     * @sample : 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.fileupload-9.19.3.js
     * 	- jquery.ui-1.12.1.js
     * @optional :
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.fileUploadTrigger = function($option){

		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if($option.isDisable === undefined){
			this.modal('isDisable은(는) 필수항목입니다.');
			return;
		}

		
		if($option.isDisable || (this.getIEVersion() && this.getIEVersion() < 10)){
			$($option.target).css('opacity', '0.5');
			$($option.target).css('cursor', 'default');
			
			//기존 클릭 이벤트 삭제
			$($option.target).off('click');
			
			//신규 클릭 이벤트 등록
			$($option.target).on('click', function(){
				if(this.getIEVersion() && this.getIEVersion() < 10)
					this.modal('IE 9 이하는 파일업로드를 지원하지 않습니다.');
			});
			
		}else{
			$($option.target).css('opacity', '1');
			$($option.target).css('cursor', 'pointer');

			//기존 클릭 이벤트 삭제
			$($option.target).off('click');

			//신규 클릭 이벤트 등록
			$($option.target).on('click', function(){
				$($option.target + ' input[type="file"][name="' + $($option.target).attr("id") +'"]').click();
			});
		}
	}

    /**
     * @desc : Internet Explorer 버전 확인
     * @date : 2018.01.18
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * 			
     * @sample : 
     * @required : 
     * @optional :
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.getIEVersion = function(){
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	
	this.getIEVersion2 = function(){

		 var word; 

		 var agent = navigator.userAgent.toLowerCase(); 

		 // IE old version ( IE 10 or Lower ) 
		 if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 

		 // IE 11 
		 else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 

		 // Microsoft Edge  
		 else if ( agent.search( "edge/" ) > -1 ) word = "edge/"; 

		 // 그외, IE가 아니라면 ( If it's not IE or Edge )  
		 else return -1; 

		 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

		 if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 

		 return -1; 
	}
	
    /**
     * @desc : 이미지 (image/*) 뷰어
     * @date : 2018.01.25
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * src									R		string			이미지 원본 경로
     * thumbnail							O		string			이미지 썸네일 경로
     * 
     * isDisable			false			O		boolean			비활성화 여부
     * isHide				false			O		boolean			숨김 여부
     * 
     * navbar				true			O		boolean			사진 GNB 표시 여부
     * zoomable				true			O		boolean			사진 확대 기능
     * movable				true			O		boolean			사진 움직임 기능
     * rotatable			true			O		boolean			사진 회전 기능
     * scalable				true			O		boolean			사진 좌우반전, 세로반전 기능
     * transition			true			O		boolean			사진 애니메이션 기능 / 있는게 낫긴함
     * fullscreen			true			O		boolean			사진 풀스크린보기
     * keyboard				true			O		boolean			키보드 동작 여부 / ESC도 안된다
     * download				true			O		boolean			다운로드 동작 여부
     * 
     * width				80				O		integer			썸네일 가로 크기 / px 등 단위 표기 필요
     * height				80				O		integer			썸네일 세로 크기 / px 등 단위 표기 필요
     * 
     * cursor				pointer			O		string			마우스 오버 시 모양
     * 			
     * @sample : 
     * 	base.imageViewer({
     * 		'target' : '#imageViewer',
     * 		'src' : '/images/test/1498199901.gif',
     * 		'thumbnail' : '/images/test/1498199901.gif'
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.viewer-0.6.0.js (custom)
     * 	- jquery.viewer-0.6.0.css (custom)
     * @optional :
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.imageViewer = function($param){

		var $default = {
			isDisable : false,
			isHide : false,
			
			navbar : true,		
			zoomable : true,		
			movable : true,		
			rotatable : true,	
			scalable : true,		
			transition : true,		
			fullscreen : true,		
			keyboard : true,		
			download : true,

			width: '80px',
			height: '80px',
			
			cursor : 'pointer',
			
		    viewed: function () {
		        var context = $(this);
		        $('.viewer-canvas').click(function(e){
		            if(e.target.className == 'viewer-canvas') {
		                 context.viewer('hide');
		            }
		        });
		    }
		};

        var $option = $.extend({}, $default, $param);
        $($option.target).attr('data-source', JSON.stringify($option));
        
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		
		if($option.src === undefined){
			this.modal('src은(는) 필수항목입니다.');
			return;
		}
		
		if($option.thumbnail === undefined){
			$option.thumbnail = $option.src;
		}

		
		var html = '';
		html += '<img class="'+ $($option.target).attr("id") + '" data-original="' + $option.src +'" src="' + $option.thumbnail +'">';
		$($option.target).append(html);


		$($option.target + ' img').css('width', $option.width);
		$($option.target + ' img').css('height', $option.height);
		$($option.target + ' img').css('cursor', $option.cursor === undefined ? 'pointer' : $option.cursor);
		

		if($option.isDisable === true){
			$($option.target + ' img').addClass('base-disable');
			$($option.target + ' img').click(function(e){
				return false;
			})
			$($option.target + ' img').css('cursor', 'default');
		}
		
		if($option.isHide === true){
			$($option.target).hide();
		}
		
		$($option.target).viewer($option);
		
	}

    /**
     * @desc : 이미지 (image/*) 뷰어 클릭 이벤트
     * @date : 2018.01.25
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * seq									O		integer			<img>의 순서를 전달 / 0부터 시작
     * 
     * @sample : 
     * base.imageViewerClick({
	 * 		'target' : '#imageViewer',
	 * 		 'seq' : 0
	 * });
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.viewer-0.6.0.js (custom)
     * 	- jquery.viewer-0.6.0.css (custom)
     * @optional :
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.imageViewerClick = function($param){

		var $default = {
		}
		
        var $option = $.extend({}, $default, $param);
        
		//유효성 검증
		if($option.target === undefined){
			this.modal('target은 필수항목입니다.');
			return;
		}
		
		if($option.seq === undefined)
			$($option.target + ' img:eq(0)').click();
		else
			$($option.target + ' img:eq(' + $option.seq + ')').click();
	}
	

    /**
     * @desc : 이미지 (image/*) 뷰어 이미지 추가 함수
     * @date : 2018.01.26
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * src									R		string			이미지 원본 경로
     * thumbnail							O		string			이미지 썸네일 경로
     * 
     * width				80px			O		string			썸네일 가로 크기 / px 등 단위 표기 필요
     * height				80px			O		string			썸네일 세로 크기 / px 등 단위 표기 필요
     * 
     * cursor				pointer			O		string			마우스 오버 시 모양
     * 			
     * @sample : 
     * 	base.imageViewerInsert({
     * 		'target' : '#imageViewer',
     * 		'src' : '/images/test/1498199901.gif',
     * 		'thumbnail' : '/images/test/1498199901.gif'
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.viewer-0.6.0.js (custom)
     * 	- jquery.viewer-0.6.0.css (custom)
     * @optional :
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     * 18.02.21		홍성호	width, height 기본값 및 타입 형태 설명
     */
	this.imageViewerInsert = function($param){

		//초기화를 해줍니다.
		var $default = JSON.parse($($param.target).attr('data-source'));
		$default.src = null;
		$default.sthumbnail = null;
		
        var $option = $.extend({}, $default, $param);
        
		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if($option.src === undefined){
			this.modal('src은(는) 필수항목입니다.');
			return;
		}
		if($option.thumbnail === undefined){
			$option.thumbnail = $option.src;
		}
		
		//하단에 img 추가해줌
		var html = '';
		html += '<img class="'+ $($option.target).attr("id") + '" data-original="' + $option.src +'" src="' + $option.thumbnail +'">';
		$($option.target).append(html);
		
		//img의 css 속성 정의
		$($option.target + ' img:eq(' + ($($option.target + ' img').length - 1) + ')').css('width', $option.width);
		$($option.target + ' img:eq(' + ($($option.target + ' img').length - 1) + ')').css('height', $option.height);
		$($option.target + ' img:eq(' + ($($option.target + ' img').length - 1) + ')').css('cursor', $option.cursor === undefined ? 'pointer' : $option.cursor);
		
		//$.viewer 업데이트
		$($option.target).viewer('update');
	}

    /**
     * @desc : 이미지 (image/*) 뷰어 이미지 수정 함수
     * @date : 2018.01.26
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * src									R		string			이미지 원본 경로
     * thumbnail							O		string			이미지 썸네일 경로
     * seq									R		integer			변경할 이미지 순서 / 0부터 시작
     * 
     * width				80				O		integer			썸네일 가로 크기 / px 등 단위 표기 필요
     * height				80				O		integer			썸네일 세로 크기 / px 등 단위 표기 필요
     * 
     * cursor				pointer			O		string			마우스 오버 시 모양
     * 			
     * @sample : 
     * 	imageViewerUpdate({
     * 		'target' : '#imageViewer',
     * 		'src' : '/images/test/KakaoTalk_20170531_232833935.png',
     * 		'thumbnail' : '/images/test/KakaoTalk_20170531_232833935.png'
     * 		'seq' : 1
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.viewer-0.6.0.js (custom)
     * 	- jquery.viewer-0.6.0.css (custom)
     * @optional :
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.imageViewerUpdate = function($param){

		//초기화를 해줍니다.
		var $default = JSON.parse($($param.target).attr('data-source'));
		$default.src = null;
		$default.sthumbnail = null;
		
        var $option = $.extend({}, $default, $param);
        
		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if($option.src === undefined){
			this.modal('src은(는) 필수항목입니다.');
			return;
		}
		if($option.seq === undefined){
			this.modal('seq은(는) 필수항목입니다.');
			return;
		}
		if($option.thumbnail === undefined){
			$option.thumbnail = $option.src;
		}
		
		$($option.target + ' img:eq(' + ($option.seq) + ')').attr('src', $option.thumbnail);
		$($option.target + ' img:eq(' + ($option.seq) + ')').attr('data-original', $option.src);
		$($option.target + ' img:eq(' + ($option.seq) + ')').css('width', $option.width);
		$($option.target + ' img:eq(' + ($option.seq) + ')').css('height', $option.height);
		$($option.target + ' img:eq(' + ($option.seq) + ')').css('cursor', $option.cursor === undefined ? 'pointer' : $option.cursor);

		//$.viewer 업데이트
		$($option.target).viewer('update');
	}
	

    /**
     * @desc : 이미지 (image/*) 뷰어 이미지 삭제 함수
     * @date : 2018.01.26
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * seq									O		integer			변경할 이미지 순서 / 0부터 시작
     * 
     * @sample : 
     * 	imageViewerDelete({
     * 		'target' : '#imageViewer',
     * 		'seq' : 1
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.viewer-0.6.0.js (custom)
     * 	- jquery.viewer-0.6.0.css (custom)
     * @optional :
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.imageViewerDelete = function($param){

		//초기화를 해줍니다.
		var $default = JSON.parse($($param.target).attr('data-source'));
		$default.src = null;
		$default.sthumbnail = null;
		
        var $option = $.extend({}, $default, $param);
        
		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		
		if($option.seq === undefined){
			$option.seq = ($($option.target + ' img').length - 1);
		}
		
		if($option.seq < 0){
			this.modal('더이상 삭제할 수 없습니다.');
			return;
		}
			
		
		$($option.target + ' img:eq(' + ($option.seq) + ')').remove();

		//$.viewer 업데이트
		$($option.target).viewer('update');
	}
	

    /**
     * @desc : 사용자 입력 태그(input) 전화번호 형식
     * @date : 2018.02.02
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * allowDash			false			O		boolean			대시를 포함하는지 여부
     * isChangeFlag							O		boolean			input 요소 상태변화 감지
     * 
     * @sample : 
     * 	inputmaskTel(event);
     * 
     * @required : 
     * @optional :
     * @return :
     * 	boolean
     * @update : 
     * 	일시		이름	변경내용
     * 18.05.11		장주혁	isChangeFlag
     */
	this.inputmaskTel = function($param){

		var $default = {
			allowDash : true,
			maxLength : 13			
		}
		
        var $option = $.extend({}, $default, $param);
		
		if($option.allowDash)
			$option.maxLength = 13;
		else
			$option.maxLength = 11;
		
		var html = '';
		html += '<input type="text" class="base-imeModeDisabled" maxlength="' + $option.maxLength + '" name="'+ $($option.target).attr("id") + '">';
		if($option.isChangeFlag)
			html += '<input type="hidden" name="'+$($option.target).attr('id')+'Flag" value="N" />';
		$($option.target).append(html);
		
		$($option.target + ' input').keydown(function(e){
			return isNumber(e);
		});
		$($option.target + ' input').keyup(function(e){
			if($option.allowDash)
				return setTelephoneRegularExpressionWithDash(e);
			else
				return setTelephoneRegularExpressionWithoutDash(e);
		});
		$($option.target + ' input').focusout(function(e){
			if($option.allowDash)
				return setTelephoneRegularExpressionWithDash(e);
			else
				return setTelephoneRegularExpressionWithoutDash(e);
		});
		
	}

	/**
	 * @desc : 전화번호 정규식 표현으로 설정합니다. / 대시포함
	 * @date : 2018.02.01
	 * @author: 홍성호
	 * @support : 
	 * 	IE 8+
	 * @param :
	 * 		명칭			기본값		필수여부	타입			설명
	 * event								R		object			keydown, keyup의 이벤트를 전달
	 * @sample : 
	 * 	setTelephoneRegularExpressionWithDash(event);
	 * 
	 * @required : 
     * @optional :
	 * @return :
     * 	string / 전화번호 정규표현식
	 * @update : 
	 * 	일시		이름	변경내용
	 * 18.04.27		김상천	getTelephoneRegularExpression(str) 를 외부함수로 뺌
	 */
	function setTelephoneRegularExpressionWithDash(event) {
		event = event || window.event;
		
		var keyCode = (event.which) ? event.which : event.keyCode;
		var str = event.target.value; 
		
		var RegNotNum = /[^0-9]/g;
		
		var RegPhonNum = "";
		
		var DataForm = "";
		
		// return blank
		
		if (str == "" || str == null)
			return "";
		
		// delete not number
		
		str = str.replace(RegNotNum, '');
		
		/* 4자리 이하일 경우 아무런 액션도 취하지 않음. */
		
		if (str.length < 4){
			event.target.value = str;
			return;
		}
		
		event.target.value = getTelephoneRegularExpression(str);
		
	}

    /**
     * @desc : 전화번호 정규식 표현으로 설정합니다. / 대시 미포함
     * @date : 2018.02.01
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * event								R		object			keydown, keyup의 이벤트를 전달
     * @sample : 
     * 	setTelephoneRegularExpressionWithoutDash(event);
     * 
     * @required : 
     * @optional :
     * @return :
     * 	string / 전화번호 정규표현식
     * @update : 
     * 	일시		이름	변경내용
     */
	function setTelephoneRegularExpressionWithoutDash(event) {
		event = event || window.event;
		
		var keyCode = (event.which) ? event.which : event.keyCode;
		var str = event.target.value; 
		
		var RegNotNum = /[^0-9]/g;

		var RegPhonNum = "";

		var DataForm = "";

		// return blank

		if (str == "" || str == null)
			return "";

		// delete not number
		str = str.replace(RegNotNum, '');

		event.target.value = str;
		
	}
	
	


    /**
     * @desc : 사용자 입력 태그(input) 달력 형식
     * @date : 2018.02.02
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * isChangeFlag							O		boolean			input 상태 변화 감지
     * 
     * maxDate				0				O		string,date		기본 클라이언트의 오늘 날짜에 대해 설정함 / ex: 0, none, +1m 등 / http://api.jqueryui.com/datepicker/#option-maxDate
     * setDate								O		Date			초기 날짜 설정 (Date 객체를 인자로 넘겨줘야합니다)		
     * 	
     * pair									R		Array			key value 정보 전달
     * - type								R		string			달력 뒤에 오는 checkbox 혹은 text 타입을 정의
     * - key								O		string			input의 value정보
     * - value								O		string			input의 화면에 보이는 정보
     * - checked							O		boolean			input check의 체크 여부
     * - text								O		string			check시 활성화되는 input text 안의 내용
     * - class								O		string			해당 input text에 씌울 class 적용
     * - isPairChangeFlag					O		boolean			생성된 pair의 상태 변화 감지
     * 			
     * @sample : 
     * 	imageViewerUpdate({
     * 		'target' : '#inputmaskCalendar'
     * 		'maxDate' : 0,
	 *		'pair' : [{
	 *			'type' : 'text',
	 *			'key' : '1',
	 *			'text' : ' : '
	 *		},{
	 *			'type' : 'checkbox',
	 *			'key' : '2',
	 *			'value' : '미상'
	 *		}]
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * @optional :
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.14		홍성호	maxDate 추가
     * 18.05.02		김상천	text 추가
     * 18.05.09		김상천	setDate 추가
     * 18.05.14		김상천	isChangeFlag, isPairChangeFlag 추가
     */
	this.inputmaskCalendar = function($param){
		
		/*
		 * DateFormat
		 * 
		 * d - day of month (no leading zero)
		 * dd - day of month (two digit)
		 * o - day of the year (no leading zeros)
		 * oo - day of the year (three digit)
		 * D - day name short
		 * DD - day name long
		 * m - month of year (no leading zero)
		 * mm - month of year (two digit)
		 * M - month name short
		 * MM - month name long
		 * y - year (two digit)
		 * yy - year (four digit)
		 * @ - Unix timestamp (ms since 01/01/1970)
		 * ! - Windows ticks (100ns since 01/01/0001)
		 * '...' - literal text
		 * '' - single quote
		 * anything else - literal text
		 * 
		 */
		
		var $default = {
	    	changeMonth : true,
	    	changeYear : true,
	    	
	    	monthNamesShort : ["1","2","3","4","5","6","7","8","9","10","11","12"],
	    	yearSuffix: "년",
	    	monthSuffix: "월",
	    	
	    	prevText: "전월",
			nextText: "익월",
	    	
			showMonthAfterYear: true,
			
	    	dateFormat: 'yy-mm-dd',
	    	dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	    	dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"],
	    
			maxDate : 0
		}
		
        var $option = $.extend({}, $default, $param);

		if($option.pair) {
			for (var i = 0; i < $option.pair.length; i++) {
				if(isUndefined($option.pair[i].type)) {
					this.modal('pair[' + i + '].type은(는) 필수항목입니다.');
					return;					
				}
				// 필요성에 의문이 생겨 주석처리 (text의 key, checkbox의 value)  by.상천
//				if(isUndefined($option.pair[i].key)) {
//					this.modal('pair[' + i + '].key은(는) 필수항목입니다.');
//					return;
//				}
//				if(isUndefined($option.pair[i].value)) {
//					this.modal('pair[' + i + '].value은(는) 필수항목입니다.');
//					return;
//				}
			}
		}
		
		var html = '';
		html += '<input type="text" name="'+ $($option.target).attr("id") + '" readonly="readonly">';
		
		if($option.isChangeFlag)
			html += '<input type="hidden" name="' + $($option.target).attr("id") + 'Flag" value="N" />';
		
		
		if($option.pair) {
			html += '<p>';
			for (var i = 0; i < $option.pair.length; i++) {
				if($option.pair[i].type == 'checkbox') {
					html += '<label for="' + $option.pair[i].key + '">';
				}
				html += '<input type="' + $option.pair[i].type + '" name="'+ $option.pair[i].key + '" class="' + $option.pair[i].class +'" style="text-align:center;" data-value="' + $option.pair[i].text;
				if(!isUndefined($option.pair[i].value))
					html += '" value="' + $option.pair[i].value;
					html += '">';
				if($option.pair[i].type == 'checkbox') {
					html += $option.pair[i].value;
					html += '</label>';
				}
				if($option.pair[i].isPairChangeFlag)
					if(isUndefined($option.pair[i].type))
						this.modal('isPairChangeFlag를 사용하기 위해서는 pair[' + i + ']의 type을 명시해야 합니다');
					else
						html += '<input type="hidden" name="' + $option.pair[i].key + 'Flag" value="N" />';
			}
			html += '</p>';
		}
		
		$($option.target).append(html);
		
		$($option.target + ' input[name="' + $($option.target).attr("id") + '"').datepicker($option);
		
		// 초기 날짜 설정
		if(!isUndefined($option.setDate))
			$('input[name="' + $($option.target).attr("id") + '"]').datepicker('setDate', $option.setDate);
		
		// checkbox 옵션 이벤트 처리 data-value
		$($option.target).find('input:checkbox').on('change', function() {
			if($(this).is(':checked')) {
				$(this).closest('div').find('input[type="text"]').val('');
				$(this).closest('div').find('input[type="text"]').attr('disabled', 'disabled');
			}else {
				$(this).closest('p').find('input[type="text"]').val($(this).closest('p').find('input[type="text"]').attr('data-value'));
				$(this).closest('div').find('input[type="text"]').attr('disabled', false);
			}
		});
	}
	


    /**
     * @desc : 사용자 입력 태그(input) 달력 형식 From ~ To 형태
     * @date : 2018.02.14
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 
     * maxDate					0			O		string,date		달력의 최대 날짜를 설정함 / ex: 0, none, +1m 등 / http://api.jqueryui.com/datepicker/#option-maxDate
     * maxDateFrom							O		string,date		달력의 최대 날짜를 설정함 / maxDate 보다 우선순위 / ex: 0, none, +1m 등 / http://api.jqueryui.com/datepicker/#option-maxDate
     * maxDateTo							O		string,date		달력의 최대 날짜를 설정함 / maxDate 보다 우선순위 / ex: 0, none, +1m 등 / http://api.jqueryui.com/datepicker/#option-maxDate
     * 			
     * fromDate								O		date			from 에 위치할 날짜
     * toDate								O		date			to 에 위치할 날짜
     * 
     * prefixFromText						O		string			From 달력 앞에 위치할 span의 text값
     * suffixFromText						O		string			From 달력 뒤에 위치할 span의 text값
     * prefixToText							O		string			To 달력 앞에 위치할 span의 text값
     * suffixToText							O		string			To 달력 뒤에 위치할 span의 text값
     * 
     * betweenText							O		string			캘린더 사이에 들어갈 text / input div input
     * betweenClass							O		string			캘린더 사이에 들어갈 class / input div input
     * 
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.			
     * fromClass							O		string			From 달력(input)의 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * toClass								O		string			From 달력(input)의 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * 
     * fromTextClass						O		string			From 달력 앞,뒤에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * toTextClass							O		string			To 달력 앞,뒤에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * 
     * prefixFromTextClass					O		string			From 달력 앞에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * suffixFromTextClass					O		string			From 달력 뒤에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * prefixToTextClass					O		string			To 달력 앞에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * suffixToTextClass					O		string			To 달력 뒤에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * 
     * 
     * @sample : 
     * 	base.inputmaskCalendarFromTo({
     * 		'target' : '#inputmaskCalendar2'
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * @optional :
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.26		김상천	isDateOver() , dateOver() 추가 (onchange 바인드)
     * 18.05.09		홍성호	fromDate, toDate 옵션 추가
     */
	this.inputmaskCalendarFromTo = function($param){
		
		/*
		 * DateFormat
		 * 
		 * d - day of month (no leading zero)
		 * dd - day of month (two digit)
		 * o - day of the year (no leading zeros)
		 * oo - day of the year (three digit)
		 * D - day name short
		 * DD - day name long
		 * m - month of year (no leading zero)
		 * mm - month of year (two digit)
		 * M - month name short
		 * MM - month name long
		 * y - year (two digit)
		 * yy - year (four digit)
		 * @ - Unix timestamp (ms since 01/01/1970)
		 * ! - Windows ticks (100ns since 01/01/0001)
		 * '...' - literal text
		 * '' - single quote
		 * anything else - literal text
		 * 
		 */
		
		var $default = {
	    	changeMonth : true,
	    	changeYear : true,
	    	
	    	monthNamesShort : ["1","2","3","4","5","6","7","8","9","10","11","12"],
	    	yearSuffix: "년",
	    	monthSuffix: "월",
	    	
	    	prevText: "전월",
			nextText: "익월",
	    	
			showMonthAfterYear: true,
			
	    	dateFormat: 'yy-mm-dd',
	    	dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	    	dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"],
	    
			maxDate : 0
	    
		}
		
        var $option = $.extend({}, $default, $param);

		var html = '';
		var prefixFromUUID, suffixFromUUID, prefixToUUID, suffixToUUID;
		
		//from prefix text
		if(isStringValid($option.prefixFromText)){
			prefixFromUUID = base.getUUID();
			
			html += '<span id="' + prefixFromUUID + '">'
			html += $option.prefixFromText;
			html += '</span>'; 
		}
		//from calendar
		html += '<input type="text" name="'+ $($option.target).attr("id") + 'From" readonly="readonly">';
		//from suffix text
		if(isStringValid($option.suffixFromText)){
			suffixFromUUID = base.getUUID();
			
			html += '<span id="' + suffixFromUUID + '">'
			html += $option.suffixFromText;
			html += '</span>'; 
		}
		
		//between text
		if(isStringValid($option.betweenText) || isStringValid($option.betweenClass)){
			html += '<div';
			if(isStringValid($option.betweenClass))
				html += ' class="' + $option.betweenClass + '"';
			html += '>';
			
			if(isStringValid($option.betweenText)){
				html += $option.betweenText;
			}
			
			html += '</div>';
		}
		
		//to prefix text
		if(isStringValid($option.prefixToText)){
			prefixToUUID = base.getUUID();
			
			html += '<span id="' + prefixToUUID + '">'
			html += $option.prefixToText;
			html += '</span>'; 
		}
		//to calendar
		html += '<input type="text" name="'+ $($option.target).attr("id") + 'To" readonly="readonly">';
		//to suffix text
		if(isStringValid($option.suffixToText)){
			suffixToUUID = base.getUUID();
			
			html += '<span id="' + suffixToUUID + '">'
			html += $option.suffixToText;
			html += '</span>'; 
		}
		$($option.target).append(html);
		

		if(isStringValid($option.wrapClass)){
			$($option.target).addClass($option.wrapClass);
		}
		if(isStringValid($option.fromClass)){
			$('input[name="' + $($option.target).attr("id") + 'From"]').addClass($option.fromClass);
		}
		if(isStringValid($option.toClass)){
			$('input[name="' + $($option.target).attr("id") + 'To"]').addClass($option.toClass);
		}
		

		if(isStringValid($option.fromTextClass)){
			$('#' + prefixFromUUID).addClass($option.fromTextClass);
			$('#' + suffixFromUUID).addClass($option.fromTextClass);
		}
		if(isStringValid($option.prefixFromTextClass)){
			$('#' + prefixFromUUID).addClass($option.prefixFromTextClass);
		}
		if(isStringValid($option.suffixFromTextClass)){
			$('#' + suffixFromUUID).addClass($option.suffixFromTextClass);
		}
		if(isStringValid($option.toTextClass)){
			$('#' + prefixToUUID).addClass($option.toTextClass);
			$('#' + suffixToUUID).addClass($option.toTextClass);
		}
		if(isStringValid($option.prefixToTextClass)){
			$('#' + prefixToUUID).addClass($option.prefixToTextClass);
		}
		if(isStringValid($option.suffixToTextClass)){
			$('#' + suffixToUUID).addClass($option.suffixToTextClass);
		}
			
		
		$($option.target + ' input').datepicker($option);
		

		if(!isUndefined($option.maxDateFrom))
			$('input[name="' + $($option.target).attr("id") + 'From"]').datepicker('option', 'maxDate', $option.maxDateFrom);
		if(!isUndefined($option.maxDateTo))
			$('input[name="' + $($option.target).attr("id") + 'To"]').datepicker('option', 'maxDate', $option.maxDateTo);
		
		
		if(!isUndefined($option.fromDate))
			$('input[name="' + $($option.target).attr("id") + 'From"]').datepicker('setDate', $option.fromDate);
		if(!isUndefined($option.toDate))
			$('input[name="' + $($option.target).attr("id") + 'To"]').datepicker('setDate', $option.toDate);
		
		
		
		
		
		// 달력 형석 From ~ To 에서 논리적 날짜 오류 (18.02.27 ~ 18.02.01 등) 발생 시 둘의 날짜를 같게 맞춰줍니다
		var inputmaskCalendarDateFrom = $('input[name="' + $($option.target).attr("id") + 'From"]');
		var inputmaskCalendarDateTo = $('input[name="' + $($option.target).attr("id") + 'To"]');
		
		inputmaskCalendarDateFrom.on("change", function() {			
			if(inputmaskCalendarDateFrom.val() && inputmaskCalendarDateTo.val()) {
				if(isDateOver()) dateOver(inputmaskCalendarDateFrom.val());
			}
		});
		inputmaskCalendarDateTo.on("change", function() {
			if(inputmaskCalendarDateFrom.val() && inputmaskCalendarDateTo.val()) {
				if(isDateOver()) dateOver(inputmaskCalendarDateTo.val());
			}
		});
		
		function isDateOver() {
			var startDate = new Date(inputmaskCalendarDateFrom.val());
			var endDate = new Date(inputmaskCalendarDateTo.val());
			var compareDate = endDate.getTime() - startDate.getTime();
			if (compareDate < 0) {
				return true;
			}			
			return false;
		}
		
		function dateOver(date) {
			if(date === inputmaskCalendarDateFrom.val()) {
				inputmaskCalendarDateTo.val(date);
			}else if(date === inputmaskCalendarDateTo.val()){
				inputmaskCalendarDateFrom.val(date);
			}
		}
	}

    /**
     * @desc : 사용자 입력 태그(input) 달력 설정일 추출
     * @date : 2018.02.08
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 			
     * @sample : 
     * 	inputmaskCalendarGetDate({
     * 		'target' : '#inputmaskCalendar'
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * @optional :
     * @return :
     * 	Date()
     * @update : 
     * 	일시		이름	변경내용
     * 18.02.08		홍성호	alert > this.modal 적용
     */
	this.inputmaskCalendarGetDate = function($param){

		var $default = {
				
		}
        var $option = $.extend({}, $default, $param);
		

		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
//		console.log($( $option.target + ' input' ).datepicker( "getDate" ));
		return $( $option.target + ' input' ).datepicker( "getDate" );
	}

    /**
     * @desc : 사용자 입력 태그(input) Input Text
     * @date : 2018.02.13
     * @author: 홍성호
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 
     * text									O		string			input 내부 text값
     * prefixText							O		string			input 앞에 위치할 span의 text값
     * suffixText							O		string			input 뒤에 위치할 span의 text값
     * 
     * prefixClass							O		string			input 앞에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * suffixClass							O		string			input 뒤에 위치할 span에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * 
     * isButton				false			O		boolean			input 이후 버튼에 대한 표시 여부
     * buttonText							O		string			input 이후 버튼에 대한 text 정보
     * buttonClass							O		string			input 이후 버튼에 대한 class 정보
     * buttonCallback						O		function		input 이후 버튼에 대한 클릭 콜백
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * wrapWidth							O		string			div의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * wrapHeight							O		string			div의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     * 
     * 
     * width								O		string			input의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * height								O		string			input의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     * 
     * border								O		String			input의 border 정보				
     * borderColor							O		String			input의 border-color 정보
     * borderRadius							O		String			input의 border-radius 정보
     * borderStyle							O		String			input의 border-style 정보
     * borderWidth							O		String			input의 border-width 정보
     * 
     * maxlength							O		integer			input의 maxlength 정보
     * placeholder							O		string			input의 place holder
     * onlyNumber							O		boolean			input의 내용에 숫자만 필요할 경우 사용합니다.
     * readonly								O		boolean			input 속성 readonly 활성화
     * isChangeFlag							O		boolean			input 변화 상태 감지
     * 
     * @sample : 
     *  base.inputText({	
     *  	target : '#inputText',
     *  	maxlength : '15',
     *  	prefixText : '좌',
     *  	suffixText : '우',
     *  	placeholder : '내애애애애애용',
     *  	isButton : true,
     *  	buttonText : '검색',
     *  	buttonClass : 'btnSearch',
     *  	isChangeFlag : true
     * 	});	
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.19		김상천	옵션 onlyNumber 추가 (내용 타입이 무조건 숫자)
     * 18.04.27		김상천	옵션 text 추가 (input text 내부 텍스트 입력)
     * 18.04.30		김상천	attr('value', $option.text) 라인 추가 속성으로 value 값이 필요할 때 사용
     * 18.05.04		홍성호	버튼에 대한 내용 추가
     * 18.05.09		홍성호	버튼 콜백 추가
     * 18.05.10		김상천	readonly 속성 추가
     * 18.05.11		장주혁	isChangeFlag 추가
     */
	this.inputText = function($param){
		var $default = {
			resize : 'none',
			isButton : false
			
		}
        var $option = $.extend({}, $default, $param);

		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		
		var html = '';
		var prefixUUID, suffixUUID;
		
		
		if(isStringValid($option.prefixText)){
			prefixUUID = base.getUUID();
			
			html += '<span id="' + prefixUUID + '">'
			html += $option.prefixText;
			html += '</span>'; 
		}
			html += '<input type="text" name="'+ $($option.target).attr("id") + '">';
		if(isStringValid($option.suffixText)){
			suffixUUID = base.getUUID();

			html += '<span id="' + suffixUUID + '">'
			html += $option.suffixText;
			html += '</span>'; 
		}
		
		
		if($option.isButton){
			
			html += '<button type="button" class="';
			if(isStringValid($option.buttonClass))
				html += $option.buttonClass;
			html += '">'; 
			if(isStringValid($option.buttonText))
				html += $option.buttonText;
			html += '</button>';
		}
		
		if($option.isChangeFlag){
			html += '<input type="hidden" name="'+$($option.target).attr("id")+'Flag" value="N" />';
		}
		
		$($option.target).append(html);
		
		if($option.readonly)
			$($option.target + ' input').prop("readonly", true);

		//버튼의 callback 처리를 처리합니다.
		if($option.isButton && $option.buttonCallback){
			$($option.target + ' button').click(function(){
				$option.buttonCallback();
			})
		}

		
		// 해당 input:text의 value 속성이 필요하면 밑에 줄 사용 (시리얼, val에는 문제 없음)
		if(isStringValid($option.text))
			$($option.target + ' input' ).val($option.text);
//			$($option.target + ' input' ).attr('value', $option.text);

		if(isStringValid($option.prefixClass))
			$('#' + prefixUUID).addClass($option.prefixClass);
		if(isStringValid($option.suffixClass))
			$('#' + suffixUUID).addClass($option.suffixClass);
			
		if(isStringValid($option.wrapClass))
			$($option.target).attr('class', $option.wrapClass);
		if(isStringValid($option.wrapWidth))
			$($option.target).css('width', $option.wrapWidth);
		if(isStringValid($option.wrapHeight))
			$($option.target).css('height', $option.wrapHeight);
		
		if(isStringValid($option.width))
			$($option.target + ' input' ).css('width', $option.width);
		if(isStringValid($option.height))
			$($option.target + ' input').css('height', $option.height);
		
		if(isStringValid($option.border))
			$($option.target + ' input').css('border', $option.border);
		if(isStringValid($option.borderColor))
			$($option.target + ' input').css('border-color', $option.borderColor);
		if(isStringValid($option.borderStyle))
			$($option.target + ' input').css('border-style', $option.borderStyle);
		if(isStringValid($option.borderRadius))
			$($option.target + ' input').css('border-radius', $option.borderRadius);
		if(isStringValid($option.borderWidth))
			$($option.target + ' input').css('border-width', $option.borderWidth);

		if(isIntegerValid($option.maxlength))
			$($option.target + ' input').attr('maxlength', $option.maxlength);
		if(isStringValid($option.placeholder))
			$($option.target + ' input').attr('placeholder', $option.placeholder);
		
		
		if($option.onlyNumber === true) {
			$($option.target + ' input').keydown(function(e){
				return isNumber(e);
			});
			$($option.target + ' input').keyup(function(e){
				return setTelephoneRegularExpressionWithoutDash(e);
			});
			$($option.target + ' input').focusout(function(e){
				return setTelephoneRegularExpressionWithoutDash(e);
			});
		}
	}
	

    /**
     * @desc : 사용자 입력 태그(input) Input Checkbox
     * @date : 2018.02.08
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * arget								R		string			element의 ID 전달
     * 
     * isBindLabelText		true			O		boolean			label input tag 이후 pair value를 표시해줄지 여부
     * 
     * pair									R		Array			key value 정보 전달
     * - key								R		string			input의 value정보
     * - value								R		string			input의 화면에 보이는 정보
     * - checked							O		boolean			input Check의 체크 여부
     * - textbox							O		string			check시 활성화되는 input text 와 그 name 값
     * - isPairChangeFlag					O		boolean
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * textbox								O		string			checkbox 뒤에 input text 의 name 을 입력하여 붙여줍니다.
     * 
     * width								O		string			input text의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * height								O		string			input text의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     * 
     * border								O		String			input text의 border 정보				
     * borderColor							O		String			input text의 border-color 정보
     * borderRadius							O		String			input text의 border-radius 정보
     * borderStyle							O		String			input text의 border-style 정보
     * borderWidth							O		String			input text의 border-width 정보
     * 
     * maxlength							O		integer			input text의 maxlength 정보
     * placeholder							O		string			input text의 place holder
     * 
     * isChangeFlag							O		boolean			checkbox 상태 변화 감지			
     * 
     * @sample : 
     * base.inputCheck({             	
     * 	'target' : '#inputCheck',
     * 
     *  'isBindLabelText' : false,
     *  
     *  'isChangeFlag' : true,
     *  	
     * 	'pair' : [{               
     * 		'key' : '02',       
     * 		'value' : '서울특별시'       
     * 	},{                       
     * 		'key' : '031',        
     * 		'value' : '인천광역시'       
     * 	},{                       
     * 		'key' : '032',        
     * 		'value' : '경기도',    
     * 		'textbox' : 'test',
     * 		'class' : 'test1 test2',
     * 		'iconClass' : '',
     * 		'iconHtml' : '',
     * 		'textClass' : '',
     * 		'textHtml' : '',
     * 		'isPairChangeFlag' : true
     * 	}]                        
     * });                           
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.13		김상천	textbox 옵션 추가 (뒤에 input text가 생기며 name 값을 설정)
     * 18.04.23		홍성호	class, iconClass, iconHtml, textClass, textHtml 추가
     * 18.04.24		김상천	각 이벤트 정상 동작 확인
     * 18.05.03		김상천	option selector selectorText 추가 (전체 체크시 textbox의 disable 동작하게 변경해야 함)
     * 18.05.04		홍성호 	isBindLabelText 추가
     * 18.05.11		장주혁	isChangeFlag, isPairChangeFlag 추가
     */
	this.inputCheck = function($param){

		var $default = {
			selector : false,
			selectorText : '전체',
			isBindLabelText : true
		}
        var $option = $.extend({}, $default, $param);

		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if(isArrayInvalid($option.pair)){
			this.modal('pair은(는) 필수항목입니다.');
			return;
		}
		for (var i = 0; i < $option.pair.length; i++) {
			if(isStringInvalid($option.pair[i].key) || isStringInvalid($option.pair[i].value)){
				if(isStringInvalid($option.pair[i].key))
					this.modal('pair[' + i + '].key은(는) 필수항목입니다.');
				if(isStringInvalid($option.pair[i].value))
					this.modal('pair[' + i + '].value은(는) 필수항목입니다.');
				return;
			}
		}
		
		// 기본 옵션 (전체) 설정 및 텍스트 설정
		var html = '';
		if($option.selector === true) {
			html += '<span name="' + $($option.target).attr("id") + 'Selector">';
			html += '	<label>';
			html += '		<input type="checkbox" name="' + $($option.target).attr("id") + '">' + " " + $option.selectorText;
			html += '	</label>';
			html += '</span>'
			$($option.target).append(html);
			$($option.target + " input:checkbox").eq(0).on('change', function() {
				if($(this).is(':checked')) {
					$($option.target + " input:checkbox").prop('checked', 'checked');
				}else {
					$($option.target + " input:checkbox").prop('checked', false);
				}
			});
		}
		
//		console.log($option.pair)
		//라디오 정보 DOM 입력
		for (var i = 0; i < $option.pair.length; i++) {
			var html = '';
			if( isStringValid($option.pair[i].class) ){
				html += '<div class="' + $option.pair[i].class + '">';
			}
			html += '<p>';
			html +=	'	<label for="' + $option.target.replace(/#/gi, "") + i + '">';
			html += '		<input type="checkbox" id="' + $option.target.replace(/#/gi, "") + i + '" name="'+ $($option.target).attr("id") + '" value="' + $option.pair[i].key + '">';
			
			if($option.isBindLabelText)
				html += '		' + $option.pair[i].value;
			
			if(isStringValid($option.pair[i].iconClass) || isStringValid($option.pair[i].iconHtml)){
				html += '<span';
				if( isStringValid($option.pair[i].iconClass) )
					html += ' class="' + $option.pair[i].iconClass + '">';
				if( isStringValid($option.pair[i].iconHtml) )
					html += $option.pair[i].iconHtml;
				html += '</span>';
			}
			if(isStringValid($option.pair[i].textClass) || isStringValid($option.pair[i].textHtml)){
				html += '<span';
				if( isStringValid($option.pair[i].textClass) )
					html += ' class="' + $option.pair[i].textClass + '">';
				if( isStringValid($option.pair[i].textHtml) )
					html += $option.pair[i].textHtml;
				html += '</span>';
			}
			html += '	</label>';
			if( !isUndefined($option.pair[i].textbox) ){
				html += '<input type="text" name="' + $option.pair[i].textbox + '" disabled="disabled" />';
				if($option.pair[i].isPairChangeFlag)
					html += '<input type="hidden" name="'+ $option.pair[i].textbox+'Flag" value="N" />';
			}
			html += '</p>';
			if( isStringValid($option.pair[i].class) ){
				html += '</div>';
			}
			$($option.target).append(html);
			
			if($option.pair[i].checked)
				$($option.target + ' input:eq(' + i + ')').prop('checked', true);
			
			
			// input text 옵션
			if(isStringValid($option.pair[i].width))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('width', $option.pair[i].width);
			if(isStringValid($option.height))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('height', $option.pair[i].height);
			
			if(isStringValid($option.pair[i].border))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border', $option.pair[i].border);
			if(isStringValid($option.pair[i].borderColor))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-color', $option.pair[i].borderColor);
			if(isStringValid($option.pair[i].borderStyle))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-style', $option.pair[i].borderStyle);
			if(isStringValid($option.pair[i].borderRadius))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-radius', $option.pair[i].borderRadius);
			if(isStringValid($option.pair[i].borderWidth))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-width', $option.pair[i].borderWidth);
			if(isIntegerValid($option.pair[i].maxlength))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('maxlength', $option.pair[i].maxlength);
			if(isStringValid($option.pair[i].placeholder))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('placeholder', $option.pair[i].placeholder);
		}
		
		if($option.isChangeFlag){
			var html = '<input type="hidden" name="'+$($option.target).attr('id')+'Flag" value="N" />';
			$($option.target).append(html);
		}
		
		if(isStringValid($option.wrapClass))
			$($option.target).attr('class', $option.wrapClass);
		
		// 추가되는 textbox 옵션에 대한 이벤트 처리
		$($option.target).find('input:checkbox').on('change', function() {
			if($(this).is(':checked')) {
				$(this).closest('p').find('input[type="text"]').attr('disabled', false);
			}else {
				$(this).closest('p').find('input[type="text"]').val('');
				$(this).closest('p').find('input[type="text"]').attr('disabled', 'disabled');
			}
		});
		
	}
	
    /**
     * @desc : 사용자 입력 태그(input) Input Radio
     * @date : 2018.02.08
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 
     * isBindLabelText		true			O		boolean			label input tag 이후 pair value를 표시해줄지 여부
     * 
     * pair									R		Array			key value 정보 전달
     * - key								R		string			input의 value정보
     * - value								R		string			input의 화면에 보이는 정보
     * - checked							O		boolean			input Radio의 체크 여부
     * - textbox							O		string			check시 활성화되는 input text 와 그 name 값
     * - isPairChangeFlag					O		boolean			check시 활성화되는 input text의 상태변화 감지
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * textbox								O		string			radio 버튼 뒤에 input text 의 name 을 입력하여 붙여줍니다.
     * 
     * width								O		string			input text의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * height								O		string			input text의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     * 
     * border								O		String			input text의 border 정보				
     * borderColor							O		String			input text의 border-color 정보
     * borderRadius							O		String			input text의 border-radius 정보
     * borderStyle							O		String			input text의 border-style 정보
     * borderWidth							O		String			input text의 border-width 정보
     * 
     * maxlength							O		integer			input text의 maxlength 정보
     * placeholder							O		string			input text의 place holder
     * isChangeFlag							O		boolean			input 변화 상태 감지
     * 
     * 
     * 
     * @sample : 
     * base.inputRadio({             	
     * 	'target' : '#inputRadio',
     *  	
     *  'isBindLabelText' : false,
     *  
     *  'isChangeFlag' : true,
     *  
     * 	'pair' : [{               
     * 		'key' : '02',       
     * 		'value' : '서울특별시'       
     * 	},{                       
     * 		'key' : '031',        
     * 		'value' : '인천광역시'       
     * 	},{                       
     * 		'key' : '032',        
     * 		'value' : '경기도',
     * 		'textbox' : 'test',
     * 		'class' : 'test1 test2',
     * 		'iconClass' : '',
     * 		'iconHtml' : '',
     * 		'textClass' : '',
     * 		'textHtml' : '',
     * 		'isPairChageFlag' : true 
     * 	}]                        
     * });                           
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.13		김상천	textbox 옵션 추가 (뒤에 input text가 생기며 name 값을 설정)
     * 18.04.23		홍성호	class, iconClass, iconHtml, textClass, textHtml 추가
     * 18.04.24		김상천	각 이벤트 정상 동작 확인
     * 18.05.04		홍성호 	isBindLabelText 추가
     * 18.05.11		장주혁	isChangeFlag, isPairChangeFlag 추가
     */
	this.inputRadio = function($param){

		var $default = {
			isBindLabelText : true
		}
        var $option = $.extend({}, $default, $param);

		//유효성 검증
		if($option.target === undefined){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if(isArrayInvalid($option.pair)){
			this.modal('pair은(는) 필수항목입니다.');
			return;
		}
		for (var i = 0; i < $option.pair.length; i++) {
			if(isStringInvalid($option.pair[i].key) || isStringInvalid($option.pair[i].value)){
				if(isStringInvalid($option.pair[i].key))
					this.modal('pair[' + i + '].key은(는) 필수항목입니다.');
				if(isStringInvalid($option.pair[i].value))
					this.modal('pair[' + i + '].value은(는) 필수항목입니다.');
				return;
			}
			if(isUndefined($option.pair[i].textbox) && $option.pair[i].isPairChangeFlag)
				this.modal('pair['+i+'].isPairChangeFlag 를 사용하기 위해선 textbox가 필요합니다.');
		}
		
//		console.log($option.pair)
		//라디오 정보 DOM 입력
		for (var i = 0; i < $option.pair.length; i++) {
			
			var html = '';
			if( isStringValid($option.pair[i].class) )
				html += '<div class="' + $option.pair[i].class + '">';
			html += '<p>';
			html += '	<label for="' + $option.target.replace(/#/gi, "") + i + '">';
			html += '		<input type="radio" id="' + $option.target.replace(/#/gi, "") + i + '" name="'+ $($option.target).attr("id") + '" value="' + $option.pair[i].key + '">';

			if($option.isBindLabelText)
			html += '		' + $option.pair[i].value;
			
			if(isStringValid($option.pair[i].iconClass) || isStringValid($option.pair[i].iconHtml)){
				html += '<span';
				if( isStringValid($option.pair[i].iconClass) )
					html += ' class="' + $option.pair[i].iconClass + '">';
				if( isStringValid($option.pair[i].iconHtml) )
					html += $option.pair[i].iconHtml;
				html += '</span>';
			}
			if(isStringValid($option.pair[i].textClass) || isStringValid($option.pair[i].textHtml)){
				html += '<span';
				if( isStringValid($option.pair[i].textClass) )
					html += ' class="' + $option.pair[i].textClass + '">';
				if( isStringValid($option.pair[i].textHtml) )
					html += $option.pair[i].textHtml;
				html += '</span>';
			}
			html += '	</label> ';
			if( !isUndefined($option.pair[i].textbox) ){
				html += '<input type="text" name="' + $option.pair[i].textbox + '" disabled="disabled" />';
				if($option.pair[i].isPairChangeFlag)
					html += '<input type="hidden" name="' + $option.pair[i].textbox + 'Flag" value="N" />';
			}
			html += '</p>';
			if( isStringValid($option.pair[i].class) )
				html += '</div>';
			
			$($option.target).append(html);
			
			if($option.pair[i].checked)
				$($option.target + ' input:eq(' + i + ')').prop('checked', true);
			
			
			// input text 옵션
			if(isStringValid($option.pair[i].width))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('width', $option.pair[i].width);
			if(isStringValid($option.height))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('height', $option.pair[i].height);
			
			if(isStringValid($option.pair[i].border))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border', $option.pair[i].border);
			if(isStringValid($option.pair[i].borderColor))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-color', $option.pair[i].borderColor);
			if(isStringValid($option.pair[i].borderStyle))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-style', $option.pair[i].borderStyle);
			if(isStringValid($option.pair[i].borderRadius))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-radius', $option.pair[i].borderRadius);
			if(isStringValid($option.pair[i].borderWidth))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').css('border-width', $option.pair[i].borderWidth);
			if(isIntegerValid($option.pair[i].maxlength))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('maxlength', $option.pair[i].maxlength);
			if(isStringValid($option.pair[i].placeholder))
				$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('placeholder', $option.pair[i].placeholder);
		}
		
		if($option.isChangeFlag){
			var html = '<input type="hidden" name="' + $($option.target).attr('id') + 'Flag" value="N" />';
			$($option.target).append(html);
		}
		
		if(isStringValid($option.wrapClass))
			$($option.target).attr('class', $option.wrapClass);
		
		// 추가되는 textbox 옵션에 대한 이벤트 처리
		$($option.target).find('input:radio').on('change', function() {
			var _name = $(this).attr('name');
			$(this).closest('div#' + _name).find('input[type="text"]').val('');
			$(this).closest('div#' + _name).find('input[type="text"]').attr('disabled', 'disabled');
			$(this).closest('p').find('input[type="text"]').attr('disabled', false);
		});
	}

    /**
     * @desc : 공통 alert 모달 / string 전달 시 content의 내용만 변경합니다.
     * @date : 2018.02.08
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * title				'안내'			O		string			alert의 제목
     * content								R		html			alert의 내용 / html 형태 전달
     * 
     * okTitle				'확인'			O		string			확인 버튼 단추 표시	
     * 
     * @sample 1: 
     *  base.modal({
     *  	title : '안녕',
     *  	content : '반가워'
     *  });
     * 
     * @sample 2:
     *  base.modal('반가워');
     * 
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * 
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
	this.modal = function($param){
		
		var $default = {
				title : '안내',
				okTitle : '확인'
		}
		
		if(typeof $param === 'string'){
			$param = {
					content : $param
			}
		}else if($param instanceof Date){
			$param = {
				content : $param.toString()
			}
		}
		
        var $modalOption = $.extend({}, $default, $param);

		var id = base.getUUID();
		
		var html = '';
		html += '<div id="'+ id + '" title="' + $modalOption.title + '">';
		html += $modalOption.content; 
		html += '</div>';
		$('body').append(html);
		
		try{
			$('#' + id).dialog({
				modal: true,
				buttons: [{
					text: $modalOption.okTitle,
					click: function(){
						$(this).dialog('close');
					}
				}]
			});
		}catch(e){
			alert($modalOption.content);
		}
	}

    /**
     * @desc : 공통 alert confirm 모달 
     * @date : 2018.04.27
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * title				'안내'			O		string			alert의 제목
     * 
     * okTitle				'확인'			O		string			확인 버튼 단추 표시	
     * cancelTitle			'취소'			O		string			취소 버튼 단추 표시
     * 
     * okCallback							O		function		확인 버튼 누를 때 실행할 function 명
     * calcelCallback						O		function		취소 버튼 누를 때 실행할 function 명
     * 
     * @sample:
     *  base.modalConfirm({
     *  	okCallback : alert,
     *  	cancelCallback : ajax
     *  });	
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * 
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
	this.modalConfirm = function($param){

		var $default = {
			title : '안내',
			okTitle : '확인',
			cancelTitle : '취소'
		}
		
		var _isOk = false;
		
        var $modalOption = $.extend({}, $default, $param);
		
		var id = base.getUUID();

		var html = '';
		html += '<div id="'+ id + '" title="' + $modalOption.title + '">';
		html += $modalOption.content; 
		html += '</div>';
		$('body').append(html);

		$('#' + id).dialog({
			modal: true,
			buttons: [{
				text: $modalOption.okTitle,
				click: function(){
					
					if($modalOption.okCallback){
						$modalOption.okCallback();
					}
					
					$(this).dialog('close');
				}
			},{
				text: $modalOption.cancelTitle,
				click: function(){

					if($modalOption.cancelCallback){
						$modalOption.cancelCallback();
					}

					$(this).dialog('close');
				}
			}]
		});
	}
	
	

    /**
     * @desc : 공통 윈도우 팝업  // 콜백 처리법 : 부모에 callback 함수 기입 / 자식에 window.opener.부모함수 입력하여 처리
     * @date : 2018.05.10
     * @author: 홍성호
     * @support : 
     * 	IE 10+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * url									R		string			view 가져올 URL
     * title								R		string			윈도우 팝업 제목
     * 
     * width				400				O		integer			모달의 가로 크기 (px 단위)
     * height				300				O		integer			모달의 세로 크기 (px 단위)
     * 
     * @sample 1: 
     * 
     * 	base.windowPopup({
     * 		url : '/democ/popup/call/responseCallPopupView.do',
     * 		title : '팝업',
     * 		width : 600,
     * 		height : 800
     * 	});
     * 
     * @sample 2:
     * 콜백
     * 	base.windowPopup({
     * 		url : '/democ/popup/call/responseCallPopupView.do',
     * 		title : '팝업',
     * 		width : 600,
     * 		height : 800
     * 	});
     * 
     * 부모창 : 
     * 	function callResponseCallback(args..){
     * 		console.log(param);
     * 	}
     * 자식창 : 
     * 	window.opener.callResponseCallback(args..);
     * 	window.close();
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * 	
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.windowPopup = function($param){

		var $default = {
			width : 400,
			height : 300
		}
		
        var $windowlOption = $.extend({}, $default, $param);
		
		//유효성 검증
		if($windowlOption.url === undefined){
			this.modal('url은(는) 필수항목입니다.');
			return;
		}
		if(  isStringInvalid($windowlOption.title) ){
			this.modal('title은(는) 필수항목입니다.');
			return;
		}
		
		var _option = 'width=' + $windowlOption.width + ', height=' + $windowlOption.height;
		
		var _windowPopup = window.open($param.url, $param.title, _option);
		_windowPopup.focus();
		
	}

    /**
     * @desc : 공통 레이어 팝업 모달
     * @date : 2018.04.26
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * url									R		string			view 가져올 URL
     * type									O		string			GET / POST type 지정
     * data									O		Object			POST시 사용 // DATA정보
     * 
     * width				400				O		integer			모달의 가로 크기 (px 단위)
     * height				300				O		integer			모달의 세로 크기 (px 단위)
     * 
     * @sample 1: 
     *  base.layerPopup({
     *  	url : '/component/form/popup2.do',
     *  	type : 'POST',
     *  	data : {
     *  		a : 'test 한글도 되겠지',
     *  		b : 'test1',
     *  		c : 'test12345'
     *  	}
     *  });
     *  
     * @sample 2:
     *  base.layerPopup({
     *  	url : '/component/form/popup1.do?p=아..abcd'
     *  });
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * 
     * @return :
     * 	callback object
     * 
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.27		홍성호	콜백 명령어 추가
     * 18.05.09		홍성호	가로, 세로 크기 추가
     */
	this.layerPopup = function($param, callback){
		
		var $default = {
			url : '',
			type : 'GET',
			data : '',
			width : 400,
			height : 300
		}

        var _layerOption = $.extend({}, $default, $param);
		
		
		var html = '';
		var _uuid = 'container_' + this.getUUID();
		html += '<div id="' + _uuid + '"  class="modalContainer" ></div>';
		$('body').append(html);
		
		$.ajax({
            url: _layerOption.url,
            type : _layerOption.type,
            data : _layerOption.data,
            beforeSend: function () {},
            dataType: 'html',
            success: function (data) {
            	$('div#' + _uuid).append(data);
            	
    			$('#' + _uuid).dialog({
    				modal: true,
    				width : _layerOption.width,
    				height : _layerOption.height
    			});
    			

    			$('#' + _uuid).on('dialogclose', function (e) { //close
    				if(callback){
    					var _responseData = $('div[id=' + _uuid + ']').attr('data-class');
    					
    					if(isStringValid(_responseData)){
    						callback( JSON.parse(_responseData) );
    					}
    				}
    				
    				$('#' + _uuid).remove();
                });
            }
        });
	}
	

    /**
     * @desc : 공통 레이어 팝업 부모에게 값 전달하기
     * @date : 2018.04.27
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * selector								R		string			this 사용하여 현재 이벤트의 위치를 전달받는다.
     * param								O		string			부모에게 전달할 데이터를 담는다. json > string화 처리
     * 
     * @sample 1: 
     *  base.layerPopupToParent(this, class);
     *  
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.layerPopupToParent = function(selector, param){

		//유효성 검증
		if(selector === undefined){
			this.modal('selector(는) 필수항목입니다.');
			return;
		}
		
		$(selector).closest('div[id^=container_]').attr('data-class', JSON.stringify(param));
	}

    /**
     * @desc : 공통 레이어 팝업 닫기
     * @date : 2018.04.27
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * selector								R		string			this 사용하여 현재 이벤트의 위치를 전달받는다.
     * param								O		string			부모에게 전달할 데이터를 담는다. json > string화 처리
     * 
     * @sample 1: 
     *  base.layerPopupClose(this, {});
     *  
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * 
     * @return :
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.layerPopupClose = function(selector, param){
		
		//유효성 검증
		if(selector === undefined){
			this.modal('selector(는) 필수항목입니다.');
			return;
		}
		
		
		if(selector && param)
			base.layerPopupToParent(selector, param);
		
		$(selector).closest('div[id^=container_]').dialog('close');
	}

    /**
     * @desc : 비동기 서버 통신
     * @date : 2018.02.09
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * url									R		string			서버 통신 주소
     * type					'POST'			O		string			서버 Request Method 형태
     * data									O		object			서버에 전송할 모델 전달 / $.serialize() 권장 
     * 
     * 
     * isDisplayProgress	true			O		boolean			로딩 표시 여부
     * 
     * isWhen				false			O		boolean			다중 ajax시 사용하므로, 기본적으로 입력받지 않습니다.
     * 
     * 
     * @sample : 
     *  base.ajax({
     *  	url : '/component/api/sample/testAjax.do',
     *  	isDisplayProgress : true
     *  }, function(data){
     *  	console.log(data);
     *  })
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * 	callback object
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.ajax = function($param, callback){
		var deferred = $.Deferred();

		var $default = {
			type : 'POST',
			isDisplayProgress : true,
			isWhen : false
		}

		var $option = $.extend({}, $default, $param);

		if(isStringInvalid($option.url)){
			this.modal('url은(는) 필수항목입니다.');
            deferred.reject();
		}
		if(isStringInvalid($option.type)){
			this.modal('type은(는) 필수항목입니다.');
            deferred.reject();
		}
			
		$.ajax({
			url: $option.url,
			type: $option.type,
			data: $option.data,
			dataType: 'json',
    		async : true,
    		beforeSend : function(jqXHR, plainObject){
    			if($option.isDisplayProgress)
    				$('.base-loading').show();
    		}
    	}).done(function( data, textStatus, jqXHR ){
			if(callback != null) {
				callback(data, textStatus, jqXHR);
			}
            if (data.IsSucceed) {
                deferred.resolve(data);
            } else {
                deferred.reject(data);
            }
    	}).fail(function( jqXHR, textStatus, errorThrown){
			if(callback != null)
				callback(jqXHR, textStatus, errorThrown);
            deferred.reject();
    	}).always(function( data, textStatus, jqXHR) {
    		if($option.isDisplayProgress && !$option.isWhen)
    			$('.base-loading').hide();
    	});
        return deferred.promise();
	}

    /**
     * @desc : 동기 서버 통신
     * @date : 2018.02.09
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * url									R		string			서버 통신 주소
     * type					'POST'			O		string			서버 Request Method 형태
     * data									O		object			서버에 전송할 모델 전달 / $.serialize() 권장
     * 
     * isDisplayProgress	true			O		boolean			로딩 표시 여부
     * 
     * isWhen				false			O		boolean			다중 ajax시 사용하므로, 기본적으로 입력받지 않습니다.
     * 
     * @sample : 
     *  base.ajax({
     *  	url : '/component/api/sample/testAjax.do',
     *  	isDisplayProgress : true
     *  }, function(data){
     *  	console.log(data);
     *  })
     *  
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * 	callback object
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.sjax = function($param, callback){
		var deferred = $.Deferred();
		
		var $default = {
			type : 'POST',
			isDisplayProgress : true,
			isWhen : false
		}
		
		var $option = $.extend({}, $default, $param);
		
		if(isStringInvalid($option.url)){
			this.modal('url은(는) 필수항목입니다.');
			return;
		}
		if(isStringInvalid($option.type)){
			this.modal('type은(는) 필수항목입니다.');
			return;
		}
		
		$.ajax({
			url: $option.url,
			type: $option.type,
			data: $option.data,
			dataType: 'json',
			async : false,
			beforeSend : function(jqXHR, plainObject){
				if($option.isDisplayProgress)
					$('.base-loading').show();
			}
		}).done(function( data, textStatus, jqXHR ){
			if(callback != null)
				callback(data, textStatus, jqXHR);
			
			if (data.IsSucceed) {
				deferred.resolve(data);
			} else {
				deferred.reject(data);
			}
		}).fail(function( jqXHR, textStatus, errorThrown){
			if(callback != null)
				callback(jqXHR, textStatus, errorThrown);
			deferred.reject();
		}).always(function( data, textStatus, jqXHR) {
			if($option.isDisplayProgress)
				$('.base-loading').hide();
		});
	}

    /**
     * @desc : 동기 서버 통신
     * @date : 2018.02.09
     * @author: 홍성호
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * url									R		string			서버 통신 주소
     * type					'POST'			O		string			서버 Request Method 형태
     * data									O		object			서버에 전송할 모델 전달 / $.serialize() 권장
     * 
     * isDisplayProgress	true			O		boolean			로딩 표시 여부
     * 
     * isWhen				false			O		boolean			다중 ajax시 사용하므로, 기본적으로 입력받지 않습니다.
     * 
     * @sample : 
     * 
     * 	base.when([{
     * 		url : '/component/api/sample/test2Ajax.do',
     * 		data : {
     * 			param2 : 'test222'			
     * 		}
     * 	},{
     * 		url : '/component/api/sample/testAjax.do',
     * 		data : {
     * 			param : 'test111'			
     * 		}
     * 	}], function(data){
     * 		console.log(data);
     * 	});
     * 
     *  
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * 
     * @return :
     * 	callback object
     * 
     * @update : 
     * 	일시		이름	변경내용
     */
	this.when = function($param, callback){
		
		var $default = {
			type : 'POST',
			isDisplayProgress : true,
			isWhen : true
		}
		
		var deferred = [];

		if(isArrayValid($param)){
			for (var i = 0; i < $param.length; i++) {
				var $option = $.extend({}, $default, $param[i]);
				deferred.push(this.ajax($option));
			}
		}else{
			var $option = $.extend({}, $default, $param);
			deferred.push(this.ajax($option));
		}
		
		$.when.apply($, deferred).then(function(){
			callback(arguments);
		}).fail(function(responseData){
			callback(responseData);
		}).always(function(){
    		$('.base-loading').hide();
		});
	}
	
	  /**
     * @desc : bindObjectData - object 형식의 데이터를 html에 바인딩합니다. 특정 요소의 자식컨트롤에 바인딩 하기 위해서는 $container 에 container 값을 넣으세요
     * @date : 2018.02.21
     * @author: 성범수
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * data				 R		Object			바인딩할 데이터
     * $container		 O		Object			바인딩될 제이쿼리 컨테이너
     * @sample : 
     * 
     * bindObjectData(response.Data, { $container: $container });
     * 
     * @required :
     * 	- jquery-3.2.1.min.js
     *  
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
    this.bindObjectData = function ($param) {
        var opts = {};
        if ($param.target) {
            var defaults = {
                prefix: '',
                $target: $('body')
            };
            opts = $.extend({}, defaults, $param.target);
        } else {
            opts = {
                prefix: '',
                $target: $('body')
            }
        }

        $.each($param.data, function (name, value) {
            var $obj = null;
            //Array 처리
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                	var subOpts = {
                        prefix: name + '[' + i + '].',
                        $target: opts.$target
                    }
                    $this.bindObjectData({
                		data : value[i],
                		target : subOpts
                	});
                }
            }
            //name 검색
            if (opts.$target == '') {
                $obj = $('[name="' + (opts.prefix != '' ? opts.prefix : '') + name + '"]');
            } else {
                $obj = opts.$target.find('[name="' + (opts.prefix != '' ? opts.prefix : '') + name + '"]');
            }
            if ($obj.length > 0) {
                $obj.each(function () {
			    	if ($(this).is(':radio')) {
			            $(this).each(function () {
			                if ($(this).val() == value || value.toLowerCase() == 'true') {
			                    $(':radio[name="' + $(this).attr('name') + '"]').each(function () {
			                        $(this).data('checked', false);
			                    });
			                    $(this)[0].checked = true;
			                    $(this).data('checked', true);
			                    $(this).trigger('change');
			                }
			            });
			        }
			        if ($(this).is(':checkbox')) {
			        	if ($(this).length) {
			                if (value != null) {
			                    var arr = value.split(',');
			                    $(this).each(function () {
			                        for (var i = 0; i < arr.length; i++) {
			                            if (arr[i].toLowerCase() == 'n') {
			                                $(this)[0].checked = false;
			                                $(this).val('N');
			                            } else if (arr[i].toLowerCase() == 'y') {
			                                $(this)[0].checked = true;
			                                $(this).val('Y');
			                            } else if ($(this).val() == arr[i] || arr[i].toLowerCase() == 'true') {
			                                $(this)[0].checked = true;
			                            }
			                            $(this).trigger('change');
			                        }
			                    });
			                }
			            }
			        }
                    if ($(this).is(':password')) {
                        $(this).val('');
                    }
                    if ($(this).is('input, textarea') && !$(this).is(':radio') && !$(this).is(':checkbox')) {
                        $(this).val($this.htmlDecode(value));
                    }
/*                    if ($(this).is('img')) {
                        $(this).attr('src', '/uploadFiles' + value);
                    }
*/                  
                    if ($(this).is('span,label')) {
                        $(this).html($this.changeBr(value));
                    }
                });
            }
        });
    };
    
    /**
     * @desc : htmlDecode - Script 단에서 인코딩된 html을 decoding 합니다.
     * @date : 2018.02.21
     * @author: 성범수
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * str						  R		String			디코딩할 스트링
     * @sample : 
     * 
     * htmlDecode(str);
     * 
     * @required :
     * 	- jquery-3.2.1.min.js
     *  
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
    this.htmlDecode = function (str) {
        if (str == null) return str;
        return str.toString().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "'");
    };
    
    /**
     * @desc : changeBr - 캐리지 리턴 대신 br 태크를 삽입한다
     * @date : 2018.02.21
     * @author: 성범수
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * str						  R		String			디코딩할 스트링
     * @sample : 
     * 
     * htmlDecode(str);
     * 
     * @required :
     * 	- jquery-3.2.1.min.js
     *  
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
    this.changeBr = function (str) {
        if (typeof str == 'string') {
            if (str == null || str == '')
                return '';
            return str.replace(/\n/g, "<br/>");
        } else if (typeof str == 'boolean') {
            return str.toString();
        } else {
            return str;
        }
    };
    
    /**
     * @desc : div 안 span을 생성하고 텍스트를 부여할 수 있도록 name 값을 부여한다
     * @date : 2018.04.06
     * @author: 김상천
     * @support : 
     * 	IE 9+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * dataSpan								R		string			span 속성인 data-span 의 값.
     * text									O		string			span 에 들어갈 text 지정
     * 
     * @sample : 
     *  base.inputSpan({
	 *		'target' : '#test4',
	 *		'dataSpan' : 'etc',
	 *		'text' : '텍스트입력'
	 *	});
     * 
     * 
     * @required :
     * 	- jquery-3.2.1.min.js
     *  
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 	일시		이름	변경내용
     * 18.05.07		김상천	text 미입력시 undefinded 표시되는 것 수정 (if문 추가) 
     */
    this.inputSpan = function($param){
    	var $default = {
				
		}
        var $option = $.extend({}, $default, $param);

		//유효성 검증
		if(isUndefined($option.target)){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if(isUndefined($option.dataSpan)){
			this.modal('dataSpan은(는) 필수항목입니다.');
			return;
		}
		
		var html = '';
		html += '<span data-span="' + $option.dataSpan + '">';
		if(!isUndefined($option.text))
			html += $option.text;
		html += '</span>';
		$($option.target).append(html);
    };
    
    /**
     * @desc : 사용자 입력 태그(textarea) Input Textarea
     * @date : 2018.04.13
     * @author: 김상천
     * @support : 
     * 	
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * width								R		string			textarea의 가로 크기(단위:px)지정
     * height								R		string			textarea의 세로 크기(단위:px)지정
     * rows									O		string			textarea의 세로 크기(단위:줄)지정(height 가 우선)
     * cols									O		string			textarea의 가로 크기(단위:줄)지정(width 가 우선)
     * 
     * resize				both			O		string			textarea의 크기 변경 가능(none, both, horizontal, vertical)
     * maxlength							O		string			textarea의 maxlength 정보
     * placeholder							O		string			textarea의 place holder
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * wrapWidth							O		string			div의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * wrapHeight							O		string			div의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     * 
     * borderWidth							O		string			textarea의 border-width 정보				
     * borderColor							O		string			textarea의 border-color 정보
     * borderStyle							O		string			textarea의 border-style 정보
     * borderRadius							O		string			textarea의 border-radius 정보
     * backgroundColor						O		string			배경 색상 / backgroundImage가 우선순위 입니다.        
     * backgroundImage						O		string			배경 이미지 / backgroundImage가 우선순위 입니다.             
     * backgroundPosition					O		string			배경 위치               
     * backgroundRepeat						O		string			배경 반복
     * isChangeFlag							O		boolean			textarea 상태변화 감지
     * 
     * @sample : 
     *  base.inputTextarea({
	 *		'target' : '#divTextarea',
	 *		'rows' : '10',
	 *		'cols' : '30',
	 *		'text' : '내애애애애애용',
	 *		
	 *		'resize' : 'none',
	 *		'maxlength' : '30',
	 *		'placeholder' : '입력해보라',
	 *
	 *		'wrapWidth' : '200px',
	 *		'wrapHeight' : '150px',
	 *		
	 *		'borderWidth' : '4px',
	 *		'borderColor' : 'skyblue',
	 *		'borderStyle' : 'solid',
	 *		'borderRadius' : '10px',
	 *		
	 *		'isChangeFlag' : true
	 *	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.30		김상천	text 옵션 추가 (textarea 내부 텍스트)
     * 18.05.10		김상천	name 값에 # 들어가는것 수정 ($option.target -> $($option.target).attr("id") )
     * 18.05.11		장주혁	isChangeFlag 추가
     */
	this.inputTextarea = function($param) {
		var $default = {
			resize : 'none'
		}
		var $option = $.extend({}, $default, $param);
		
		if($option.target === undefined) {
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
//		if(!isIntegerValid($option.width)) {
//			this.modal('width(는) 필수항목입니다.');
//			return;
//		}
//		if(!isIntegerValid($option.height)) {
//			this.modal('height(는) 필수항목입니다.');
//			return;
//		}

		var html = '<textarea rows="' + $option.rows + '" cols="' + $option.cols + '" name="' + $($option.target).attr("id") + '">';
		if(!isUndefined($option.text))
			html += $option.text;
		html += '</textarea>';
		if($option.isChangeFlag)
			html += '<input type="hidden" name="'+$($option.target).attr('id')+'Flag" value="N" />';
		$($option.target).append(html);
		
		$($option.target + ' textarea').css('width', $option.width);
		$($option.target + ' textarea').css('height', $option.height);
		
		
		if(isStringValid($option.resize))
			$($option.target + ' textarea').css('resize', $option.resize);
		if(isIntegerValid($option.maxlength))
			$($option.target + ' textarea').attr('maxlength', $option.maxlength+1);
		if(isStringValid($option.placeholder))
			$($option.target + ' textarea').attr('placeholder', $option.placeholder);
		
		if(isStringValid($option.wrapClass))
			$($option.target).attr('class', $option.wrapClass);
		if(isStringValid($option.wrapWidth))
			$($option.target).css('width', $option.wrapWidth);
		if(isStringValid($option.wrapHeight))
			$($option.target).css('height', $option.wrapHeight);		
		
		if(isStringValid($option.borderWidth))
			$($option.target + ' textarea').css('border-width', $option.borderWidth);
		if(isStringValid($option.borderColor))
			$($option.target + ' textarea').css('border-color', $option.borderColor);
		if(isStringValid($option.borderStyle))
			$($option.target + ' textarea').css('border-style', $option.borderStyle);
		if(isStringValid($option.borderRadius))
			$($option.target + ' textarea').css('border-radius', $option.borderRadius);
		if(isStringValid($option.backgroundColor))
			$($option.target + ' textarea').css('background-color', $option.backgroundColor);
		if($option.backgroundImage !== undefined)
			$($option.target + ' textarea').css('background-image', $option.backgroundImage);
		
		$('#' + $($option.target).attr("id") + ' textarea').on('keyup', function(e) {
		    if($(this).val().length > $option.maxlength) {
		        base.modal('입력 제한 [' + $option.maxlength + ']자를 넘을 수 없습니다.');
		        $(this).val($(this).val().substring(0, $option.maxlength));
		        e.preventDefault();
		    }
		});
	}
	
	/**
     * @desc : 사용자 입력 태그(select) Input SelectBox
     * @date : 2018.04.13
     * @author: 김상천
     * @support : 
     * 	
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 
     * selector				false			R		boolean			선택 옵션을 넣을지 말지 결정
     * selectorText			==선택==		O		string			selector 이 true 일 때 text 를 변경할 수 있음
     * 
     * isBindSpanText		false			O		boolean			select option 에 pair의 value를 select tag 하위에 span에 넣을지 여부
     * isBindSpanClass						O		string			select tag 하위의 span class
     * 
     * isChangeFlag							O		boolean			select 상태 변화 감지
     * 
     * pair									R		Array			key value 정보 전달 (위에서 아래 순서로 적용됨)
     * - type								R		string			select의 태그(optgroup, option)결정
     * - value								R		string			option의 화면에 보이는 정보
     * - belong								O		string			속하는 그룹의 key 값
     * - selected							O		boolean			input Check의 체크 여부
     * - textbox							O		string			check시 활성화되는 input text 와 그 name 값
     * - isPairChangeFlag					O		boolean			check시 활성화되는 input text의 상태 변화 감지
     *  
     * maxlength							O		integer			input text의 maxlength 정보
     * placeholder							O		string			input text의 place holder
     * 
     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
     * wrapWidth							O		string			div의 가로 크기 / px 등 단위를 같이 넣어야 합니다.
     * wrapHeight							O		string			div의 세로 크기 / px 등 단위를 같이 넣어야 합니다.
     *  
     *  
     * @sample : 
     * 	base.inputSelectBox({
     * 	   'target' : '#selectOption',
     * 	   'selector' : true,
     * 	   isBindSpanText : true,
     * 	   'isChangeFlag' : true,
     * 	   'pair' : [{
     * 	      'type' : 'option',
     * 	      'key' : 'A',
     * 	      'value' : '첫번째'
     * 	   },{
     * 	      'type' : 'option',
     * 	      'key' : 'B',
     * 	      'value' : '두번째'
     * 	   },{
     * 	      'type' : 'option',
     * 	      'key' : 'Z',
     * 	      'value' : '기타',
     * 	      'textbox' : 'inputTextName',
     * 	      'maxlength' : 50,
     * 	      selected : true,
     * 		  'isPairChangeFlag' : true
     * 	   }]
     * 	});
     * 
     * @sample : dataBind 방식
     * $option = {
     * 'target' : '#selectOption',
     *     'selector' : true,
     *     isBindSpanText : true,
     *     'isChangeFlag' : true,
     *  'dataKey' : 'code',
     * 'dataValue' : 'codeName',
     *     'pair' : [{
     *    "code": "26",
     *    "codeName": "Code1",
     *    "codeDescription": null,
     *    "currentAmount": null,
     *    "totalAmount": null,
     *    "telephoneNumber": null
     * },{
     *    "code": "27",
     *    "codeName": "Code2",
     *    "codeDescription": null,
     *    "currentAmount": null,
     *    "totalAmount": null,
     *    "telephoneNumber": null
     * }]
     * };
     * base.selectTest($option);
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     * 18.04.24		김상천	input:text의 id 속성을 data-pair 로 교체, 이벤트 정상 동작 확인 
     * 18.04.25		김상천	selector (기본 선택 옵션) 과 selectorText (선택 텍스트) 를 설정할 수 있는 옵션 추가
     * 18.04.30		김상천	selector 에 포함된 selected 삭제
     * 18.05.04		홍성호	select 하위 tag에 span text 내용 추가
     * 18.05.04		김상천	pair 필수 값 해제 (selectbox 가 2개 연달아 올 때, 뒤의 [==선택==] 창만 남기기 위해서)
     * 18.05.10     장주혁  if(!isUndefined(isBindSpanText)) 조건 수정 -> if(isBindSpanText), 입력 값이 boolean 이기 때문
     * 18.05.18         백승혁     pair DataBind 구현 및 예제 추가 / dataKey,DataValue,DataType 디폴트 추가 / TODO - Type 재정의 필요
     */
	this.inputSelectBox = function($param) {
		var $default = {
			selector : false,
			selectorText : '==선택==',
			isBindSpanText : false,
			dataType : 'type',
			dataKey : 'key',
			dataValue : 'value'
		}
		var $option = $.extend({}, $default, $param);
		
		if(isUndefined($option.target)) {
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if(isUndefined($option.selector)) {
			this.modal('selector(는) 필수항목입니다.');
			return;
		}
//		if(isArrayInvalid($option.pair)) {
//			this.modal('pair은(는) 필수항목입니다.');
//			return;
//		}
		
		if(!isUndefined($option.pair)) {
			for (var i = 0; i < $option.pair.length; i++) {
				//if($option.pair[i][$option.dataType] !== 'group' && $option.pair[i][$option.dataType] !== 'option')
				//	this.modal('pair[' + i + '].type을(를) 다시 확인하십시오.');
				if(isStringInvalid($option.pair[i][$option.dataKey]) || isStringInvalid($option.pair[i][$option.dataValue])) {
					if(isStringInvalid($option.pair[i][$option.dataKey]))
						this.modal('pair[' + i + ']'+[$option.dataKey]+'은(는) 필수항목입니다.');
					if(isStringInvalid($option.pair[i][dataValue]))
						this.modal('pair[' + i + ']'+[$option.dataValue]+'은(는) 필수항목입니다.');
					return;
				}
			}
		}
		
		// select 박스 추가 + 기본 옵션 (==선택==) 설정 및 텍스트 설정
		var html = '';
		var _selectedValue = '';
		html += '<select name="' + $($option.target).attr("id") + '">';
		if($option.selector === true)
			html += '<option value="">' + $option.selectorText;
		$($option.target).append(html);
		
		// group, option 판단 + 기본 선택
		if(!isUndefined($option.pair)) {
			for(var i = 0; i < $option.pair.length; i++) {
				var html = '';
				if($option.pair[i][$option.dataType] === 'group') {
					html += '<optgroup label="' + $option.pair[i][dataKey] + '">';	
					$('select[name="' + $($option.target).attr("id") + '"]').append(html);
				}else {
					if(!isUndefined($option.pair[i].selected) && $option.pair[i].selected){
						html += '<option value="' + $option.pair[i][$option.dataKey] + '" selected="selected">' + $option.pair[i][$option.dataValue];
						_selectedValue = $option.pair[i][$option.dataValue];
					}else
						html += '<option value="' + $option.pair[i][$option.dataKey] + '">' + $option.pair[i][$option.dataValue];
					
					if(!isUndefined($option.pair[i].belong))
						$('select optgroup[label="' + $option.pair[i].belong + '"]').append(html);
					else
						$('select[name="' + $($option.target).attr("id") + '"]').append(html);	
				
					if(!isUndefined($option.pair[i].textbox)) {
						var html = '';
						if(!isUndefined($option.pair[i].selected))
							html = '<input type="text" data-pair="' + $option.pair[i][$option.dataKey] + '" name="' + $option.pair[i].textbox + '"/>';
						else
							html = '<input type="text" data-pair="' + $option.pair[i][$option.dataKey] + '" name="' + $option.pair[i].textbox + '" disabled="disabled"/>';
						if($option.pair[i].isPairChangeFlag)
							html += '<input type="hidden" name="'+$option.pair[i].textbox+'Flag" value="N" />';
						
						$('select[name="' + $($option.target).attr("id") + '"]').after(html);
					}
				
				if(isIntegerValid($option.pair[i].maxlength))
					$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('maxlength', $option.pair[i].maxlength);
				if(isStringValid($option.pair[i].placeholder))
					$($option.target + ' input:text[name="' + $option.pair[i].textbox + '"]').attr('placeholder', $option.pair[i].placeholder);
				}
			}
		}
		
		if($option.isBindSpanText){
			html = '';
			
			html += '<span class="base-selectOptionSpanClass"';
			if(!isUndefined($option.isBindSpanClass))
				html += ' ' + $option.isBindSpanClass + '"';
			html += '>';
			html += _selectedValue;
			html += '</span>';
			
			$($option.target).append(html);
				
		}
		
		if($option.isChangeFlag){
			html = '<input type="hidden" name="'+$($option.target).attr('id')+'Flag" value="N" />';
			$($option.target).append(html);
		}
		
		// 추가되는 textbox 옵션에 대한 이벤트 처리
		$($option.target).find('select').on('change', function() {
			var _name = $(this).attr('name');
			if($(this).val() == $(this).closest('div#' + _name).find('input[type="text"]').attr("data-pair")) {
				$(this).closest('div#' + _name).find('input[type="text"]').attr('disabled', false);
			}else {
				$(this).closest('div#' + _name).find('input[type="text"]').val('');
				$(this).closest('div#' + _name).find('input[type="text"]').attr('disabled', 'disabled');
			}
			
			//span에 change 될 경우 text 변경
			if($option.isBindSpanText){
				var _bindSpanText = '';
				if(isStringValid($(this).val()))
					_bindSpanText = $(this).find("option:selected").text();
				
				$(this).closest('div#' + _name).find('span.base-selectOptionSpanClass').text(_bindSpanText);
			}
		});
		
		if(isStringValid($option.wrapClass))
			$($option.target).attr('class', $option.wrapClass);
		if(isStringValid($option.wrapWidth))
			$($option.target).css('width', $option.wrapWidth);
		if(isStringValid($option.wrapHeight))
			$($option.target).css('height', $option.wrapHeight);
	}
	
	/**
     * @desc : 사용자 입력 태그(input check, radio, select)의 체크된 값 추출 
     * @date : 2018.04.25
     * @author: 김상천
     * @support : 
     * 	IE 8+
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * 			
     * @sample : 
     * 	getInputCheckedValue({
     * 		'target' : '#getInputCheckedValue'
     * 	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * 	- jquery.ui-1.12.1.js (custom)
     * 	- jquery.ui-1.12.1.css (custom)
     * @optional :
     * @return :
     * 	Date()
     * @update : 
     * 	일시		이름	변경내용
     */
	this.getInputCheckedValue= function($param){

		var $default = {

		}
        var $option = $.extend({}, $default, $param);
		
		//유효성 검증
		if(isUndefined($option.target)){
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		
		var arr = [];
		
		if($($option.target).find('input[type="checkbox"]') !== null && $($option.target).find('input[type="checkbox"]').length !== 0){
			var len = $($option.target).find('input[type="checkbox"]:checked').length;
			for(var i=0; i<len; i++){
				var b = {
						key : $($option.target).find(':checked').eq(i).val(),
						val : $($option.target).find(':checked').eq(i).closest('label').text().trim()
					}
				arr.push(b);
			}
		}
		else if($($option.target).find('input[type="radio"]')  !== null & $($option.target).find('input[type="radio"]').length !== 0){
			var b = {
					key : $($option.target).find(':checked').val(),
					val : $($option.target).find(':checked').closest('label').text().trim()
				}
			arr.push(b);
		}
		else if($($option.target).find('select')  !== null && $($option.target).find('select').length !== 0){
			var b = {
					key : $($option.target).find(':selected').val(),
					val : $($option.target).find(':selected').text().trim()
				}
			arr.push(b);
		}

		return arr;
	}
	
	/**
     * @desc : 버튼 생성(div)
     * @date : 2018.05.10
     * @author: 김상천
     * @support : 
     * 	
     * @param :
     * 		명칭			기본값		필수여부	타입			설명
     * target								R		string			element의 ID 전달
     * buttonText							R		string			버튼의 텍스트 설정
     * event								O		function		클릭 이벤트 설정
     * 
     * prefixImageClass						O		string			버튼 앞에 오는 이미지 설정
     * suffixImageClass						O		string			버튼 뒤에 오는 이미지 설정
     * 
     * @sample : 
     * base.button({
	 *		target : '.aaa',
	 *		event : 'aaaClick',
	 *		buttonText : '디브클릭',
	 *		prefixImageClass : 'preImgC',
	 *		suffixImageClass : 'sufImgC'
	 *	});
     * 
     * @required : 
     * 	- jquery-3.2.1.min.js
     * @optional :
     * @return :
     * @update : 
     * 	일시		이름	변경내용
     */
	this.button = function($param) {
		var $default = {
			isHide : false
		}
		var $option = $.extend({}, $default, $param);
		
		if($option.target === undefined) {
			this.modal('target은(는) 필수항목입니다.');
			return;
		}
		if(!$option.buttonText) {
			this.modal('buttonText(는) 필수항목입니다.');
			return;
		}
		
		
		if(isStringValid($option.event))
			$($option.target).attr('data-event', $option.event);
			
			
		var html = '';
		if(isStringValid($option.prefixImageClass))
			html += '<div class="' + $option.prefixImageClass + '"></div>';
		if(isStringValid($option.buttonText))
			html += '<span data-span="' + $($option.target).attr("class") + '">' + $option.buttonText + '</span>';
		if(isStringValid($option.suffixImageClass))
			html += '<div class="' + $option.suffixImageClass + '"></div>';
		$($option.target).append(html);	
		
		
		if($option.isHide)
			$($option.target).hide();
		
	}
}


this.base = new baseClass();


/**
 * @desc : 최상위의 window를 가져옵니다.
 * @date : 2018.01.16
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param : 
 * 		명칭			기본값		필수여부	타입			설명
 * @sample : 
 * @required : 
 * @optional :
 * @return :
 * @update : 
 * 	일시		이름	변경내용
 */
function getParent(win) {
    if (win.location === win.parent.location)
        return win;
    else
        return getParent(win.parent);
}

/**
 * @desc : key event의 숫자 여부 확인 / 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 9:tab
 * @date : 2018.02.01
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * event								R		object			keydown, keyup의 이벤트를 전달
 * @sample : 
 * 	isNumber(event);
 * 
 * @required :
 * @optional : 
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름		변경내용
 * 18.04.19		김상천		복사 붙여넣기 활성화 (숫자만 남도록)
 */
function isNumber(event){
	event = event || window.event;
	var keyCode = (event.which) ? event.which : event.keyCode;
	
	if (keyCode == 13)
		event.preventDefault();
	if ( keyCode == 9 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39 )
		return;
	else if ( (event.ctrlKey && keyCode == 86) || (event.ctrlKey && keyCode == 67) )
		return
	else
		return false;
}

/**
 * @desc : 입력된 정보가 undefined 인지 확인합니다.
 * @date : 2018.02.14
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		integer			integer값 전달
 * @sample : 
 * 	isUndefined(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isUndefined(target){
	return typeof target === "undefined";
}

/**
 * @desc : 입력된 integer가 유효한지 확인합니다.
 * @date : 2018.02.13
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		integer			integer값 전달
 * @sample : 
 * 	isIntegerValid(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isIntegerValid(target){
	return !isNaN(target) && parseInt(Number(target), 10) == target && !isNaN(parseInt(target, 10));
}

/**
 * @desc : 입력된 string이 유효한지 확인합니다.
 * @date : 2018.02.08
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		string			string값 전달
 * @sample : 
 * 	isStringValid(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isStringValid(target){
	if(target === undefined)
		return false;
	if(target === null)
		return false;
	if(target.length === 0)
		return false;
	return true;
}

/**
 * @desc : 입력된 string이 무효한지 확인합니다.
 * @date : 2018.02.08
 * @author: 홍성호
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		string			string값 전달
 * @sample : 
 * 	isStringInvalid(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isStringInvalid(target){
	if(target === undefined)
		return true;
	if(target === null)
		return true;
	if(target.length === 0)
		return true;
	return false;
}

/**
 * @desc : 입력된 Array가 유효한지 확인합니다.
 * @date : 2018.02.08
 * @author: 홍성호
 * @support : 
 * 	IE 9+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		array			array값 전달
 * @sample : 
 * 	isArrayValid(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isArrayValid(target){
	if(target === undefined)
		return false;
	if(target === null)
		return false;
	if(!Array.isArray(target))
		return false;
	if(target.length === 0)
		return false;
	return true;
}

/**
 * @desc : 입력된 Array가 무효한지 확인합니다.
 * @date : 2018.02.08
 * @author: 홍성호
 * @support : 
 * 	IE 9+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * target								R		array			array값 전달
 * @sample : 
 * 	isArrayInvalid(target);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	boolean
 * @update : 
 * 	일시		이름	변경내용
 */
function isArrayInvalid(target){
	if(target === undefined)
		return true;
	if(target === null)
		return true;
	if(!Array.isArray(target))
		return true;
	if(target.length === 0)
		return true;
	return false;
}


/**
 * @desc : 전화번호 정규식 표현으로 설정합니다. / 대시포함(기존의 setTelephoneRegularExpressionWithDash 에서 function 화)
 * @date : 2018.04.26
 * @author: 김상천
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * 		str								R		object			해당 str을 전화번호 정규식 표현으로 반환
 * @sample : 
 * 	getTelephoneRegularExpression(str);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	string / 전화번호 정규표현식
 * @update : 
 * 	일시		이름	변경내용
 */
function getTelephoneRegularExpression(str) {
	if(str == "" || isUndefined(str) || str === null)
		return;
	/* 지역번호 02일 경우 10자리 이상입력 못하도록 제어함. */
	var RegNotNum = /[^0-9]/g;
	
	if (str.substring(0, 2) == "02" && str.length > 10) {
		str = str.substring(0, 10);
	}
	
	if (str.length > 3 && str.length < 7) {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2";
			
			RegPhonNum = /([0-9]{2})([0-9]+)/;
			
		} else {
			DataForm = "$1-$2";
			
			RegPhonNum = /([0-9]{3})([0-9]+)/;
		}
	} else if (str.length == 7) {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		} else {
			DataForm = "$1-$2";
			
			RegPhonNum = /([0-9]{3})([0-9]{4})/;
		}
	} else if (str.length == 9) {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		} else {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		}
	} else if (str.length == 10) {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
		} else {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		}
	} else if (str.length > 10) {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
		} else {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{3})([0-9]{4})([0-9]+)/;
		}
	} else {
		if (str.substring(0, 2) == "02") {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		} else {
			DataForm = "$1-$2-$3";
			
			RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		}
	}
	
	while (RegPhonNum.test(str)) {
		str = str.replace(RegPhonNum, DataForm);
	}
	
	return str;
}


/**
 * @desc : 날짜 표현식으로 데이터를 반환합니다. (스크립트 형식만 지원)
 * @date : 2018.04.26
 * @author: 김상천
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * 	date								R		object			해당 date를 날짜 표현식으로 변경 후 반환
 * 	dateFormat
 * @sample : 
 * 	getDateFormatExpression(date, dateFormat);
 * 
 * @required : 
 * @optional :
 * @return :
 * 	string / 날짜 표현식
 * @update : 
 * 	일시		이름	변경내용
 * 18.04.30		김상천	기존 14자만 가능하던 날짜를 8자 받으면(년,월,일) 출력 가능하게 함
 */
function getDateFormatExpression(date, dateFormat, expression) {
	var getDate = "";
	
	if(date.length !== 14 && date.length !== 8) {
		base.modal('올바른 날짜 길이가 아닙니다.');
		return;
	}

	if(date.length === 14) {
		if(dateFormat.includes("yyyy")){
			getDate += date.substring(0, 4);
			if(dateFormat.includes("MM"))
				getDate += "-";
		}else if(dateFormat.includes("yy")){
			getDate += date.substring(2, 4);
			if(dateFormat.includes("MM"))
				getDate += "-";
		}
		if(dateFormat.includes("MM")){
			getDate += date.substring(4, 6);
			if(dateFormat.includes("dd"))
				getDate += "-";
		}
		if(dateFormat.includes("dd")) {
			getDate += date.substring(6, 8);
			if(dateFormat.includes("HH"))
				getDate += " ";
		}
		if(dateFormat.includes("HH")) {
			getDate += date.substring(8, 10);
			if(dateFormat.includes("mm"))
				getDate += ":";
		}
		if(dateFormat.includes("mm")) {
			getDate += date.substring(10, 12);
			if(dateFormat.includes("ss"))
				getDate += ":";
		}
		if(dateFormat.includes("ss")) {
			getDate += date.substring(12);
		}
	}else if(date.length === 8) {
		if(dateFormat.includes("yyyy")){
			getDate += date.substring(0, 4);
			if(dateFormat.includes("MM"))
				getDate += "-";
		}else if(dateFormat.includes("yy")){
			getDate += date.substring(2, 4);
			if(dateFormat.includes("MM"))
				getDate += "-";
		}
		if(dateFormat.includes("MM")){
			getDate += date.substring(4, 6);
			if(dateFormat.includes("dd"))
				getDate += "-";
		}
		if(dateFormat.includes("dd")) {
			getDate += date.substring(6, 8);
		}
	}
		
	return getDate;
}


/**
 * @desc : 현재 날짜와 시각을 반환합니다. (20180301103025 형식리턴)
 * @date : 2018.05.10
 * @author: 김상천
 * @support : 
 * 	IE 8+
 * @param :
 * 		명칭			기본값		필수여부	타입			설명
 * @sample : 
 * 	getTodayDateTime();
 * 
 * @required : 
 * @optional :
 * @return :
 * 	string / 20180301103025  (14자리)
 * @update : 
 * 	일시		이름	변경내용
 */
function getTodayDateTime() {
	var d = new Date();
	var _today = leadingZeros(d.getFullYear(), 4) + leadingZeros(d.getMonth() + 1, 2) + leadingZeros(d.getDate(), 2)
				+ leadingZeros(d.getHours(), 2) + leadingZeros(d.getMinutes(), 2) + leadingZeros(d.getSeconds(), 2);
	
	function leadingZeros(n, digits) {
		 // 1 -> 01 과 같이 변경하기
		 var zero = '';
		 n = n.toString();

		 if (n.length < digits) {
			  for (i = 0; i < digits - n.length; i++)
			  zero += '0';
		 }
		 return zero + n;
	}
	return _today;
}





(function( $ ) {
	$.fn.stopScroll = function( $param, callback) {
		

		var $default = {
			delay: 250
		}
        var $option = $.extend({}, $default, $param);

		//유효성 검증
		if($option.target === undefined){
			base.modal('target은(는) 필수항목입니다.');
			console.log('유효성 검증 실패 :: target은(는) 필수항목입니다.');
			return;
		}
		
		return this.each(function() {
			var $element = $( this ), element = this;
			$element.scroll(function() {
				clearTimeout( $.data( element, $option.target ) );
				$.data( element, $option.target, setTimeout(function() {
					callback({
						scrollTop : $element.scrollTop()
					});
				}, $default.delay ) );
			});
		});
	};

})( jQuery );
