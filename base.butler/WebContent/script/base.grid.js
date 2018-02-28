/*! Copyright (c) 2018 Seongho, Hong
 * SourceName: base.grid
 * Version: 0.0.1
 * SnapshotDate: 2018.03.07
 */


var baseGridArray = [];

(function($) {
	jQuery.extend(base, {
	    /**
	     * @desc : Grid // 그리드를 생성합니다.
	     * @date : 2018.02.21
	     * @author: 홍성호
	     * @support : 
	     * 	IE 9+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * target								R		string			div element의 ID 전달
	     * 
	     * source								R		string			서버로 부터 요청할 grid 데이터 URL 정보
	     * type					paging			O		string			그리드 타입 / scroll(가상화 모드), paging(페이지 모드)
	     * 
	     * thead
	     * - text								R		string			바인딩 될 데이터의 제목 정보
	     * - name								R		string			바인딩 될 데이터의 key / DB의 column과 매치되면 좋겠지요.
	     * - thClass							O		string
	     * - width				auto			O		string			Cell의 가로 크기 / px 등 단위 표기 필요
	     * - titleAlign			center			O		string			thead tr th의 정렬 정보
	     * - textAlign							O		string			tbody tr td의 정렬 정보
	     * 
	     * 
	     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.			
	     * 
	     * width				100%			O		string			grid의 가로 크기 / px 등 단위 표기 필요
	     * height				300px			O		string			grid의 세로 크기 / px 등 단위 표기 필요
	     * 
	     * theadHeight							O		string			thead의 세로 크기 / px 등 단위 표기 필요
	     * theadLineHeight		theadHeight		O		string			thead의 줄간격 / px 등 단위 표기 필요 / theadHeight가 선언되고, 해당 항목이 null 일경우 theadHeight를 승계함
	     * 
	     * defaultAlterText		-				O		string			cell의 데이터가 존재하지 않을 때, 대체 텍스트
	     * 
	     * 
	     * @sample : 
	     * 	base.grid({
	     * 		target : '#grid1'
	     *  });
	     * 
	     * @required :
	     * 	- jquery-3.2.1.min.js
	     *  
	     * @optional :
	     * @return :
	     * @update : 
	     * 	일시		이름	변경내용
	     * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
	     */
		grid : function($param){

			
			var $default = {
				width : '100%',
				height : '300px',
				
				theadHeight : '30px',
				
				cellHeight : '30px',
				defaultAlterText : '-',
				
				isUpdate : true
					
			}
			
	        var $option = $.extend({}, $default, $param);
			

			//유효성 검증
			if($option.target === undefined){
				this.modal('target은(는) 필수항목입니다.');
				return;
			}
			

			//Wrap의 Style을 설정합니다.
			//div의 기본 Class를 넣습니다.
			$($option.target).addClass('base-grid');
			if(!isUndefined($option.wrapClass))
				$($option.target).addClass($option.wrapClass);
			
			
			//초기설정
			base._gridInitialize($option);

			
		},

		/**
		 * @desc : Grid를 초기 생성합니다.
		 * @date : 2018.03.02
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridInitialize($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridInitialize : function($option){
			base._gridInitTable($option);
			base._gridInitThead($option);
			base._gridInitTbody($option);			
		},

	    /**
	     * @desc : Grid // 정렬을 올림차순으로 합니다.
	     * @date : 2018.02.21
	     * @author: 홍성호
	     * @support : 
	     * 	IE 9+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * target								R		string			div element의 ID 전달
	     * index				0				R		integer			정렬할 td의 번호를 전달 // 0번 부터 시작
	     * @sample : 
	     * 	base.gridSortAscending({
	     * 		target : '#grid1',
	     * 		index : 0
	     *  });
	     * 
	     * @required :
	     * 	- jquery-3.2.1.min.js
	     *  
	     * @optional :
	     * @return :
	     * @update : 
	     * 	일시		이름	변경내용
	     * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
	     */
		gridSortAscending : function($param){
			
			var $default = {
				index : 0
			}
	        var $option = $.extend({}, $default, $param);

			//유효성 검증
			if($option.target === undefined){
				this.modal('target은(는) 필수항목입니다.');
				return;
			}

			var _target = $.grep(baseGridArray, function(array, f){
				return array.key == $option.target;
			});
			
			if(isArrayInvalid(_target))
				return;
			
			var _gridObject = _target[0].value;
			_gridObject.ascending($option.index);
		},

	    /**
	     * @desc : Grid // 정렬을 내림차순으로 합니다.
	     * @date : 2018.02.21
	     * @author: 홍성호
	     * @support : 
	     * 	IE 9+
	     * @param :
	     * 		명칭			기본값		필수여부	타입			설명
	     * target								R		string			div element의 ID 전달
	     * index				0				R		integer			정렬할 td의 번호를 전달 // 0번 부터 시작
	     * @sample : 
	     * 	base.gridSortDescending({
	     * 		target : '#grid1',
	     * 		index : 0
	     *  });
	     * 
	     * @required :
	     * 	- jquery-3.2.1.min.js
	     *  
	     * @optional :
	     * @return :
	     * @update : 
	     * 	일시		이름	변경내용
	     * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
	     */
		gridSortDescending : function($param){

			var $default = {
				index : 0
			}
	        var $option = $.extend({}, $default, $param);

			//유효성 검증
			if($option.target === undefined){
				this.modal('target은(는) 필수항목입니다.');
				return;
			}
			
			var _target = $.grep(baseGridArray, function(array, f){
				return array.key == $option.target;
			});
			
			if(isArrayInvalid(_target))
				return;
			
			var _gridObject = _target[0].value;
			_gridObject.descending($option.index);
		},
		
		/**
		 * @desc : Grid // 정렬을 초기화 합니다.
		 * @date : 2018.02.21
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * target								R		string			div element의 ID 전달
		 * @sample : 
		 * 	base.gridSortDefault({
		 * 		target : '#grid1'
		 *  });
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
	     * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
	     * 18.03.05		홍성호 	base.gridSortInitialize에서 base.gridSortDefault로 명칭 변경
		 */
		gridSortDefault : function($param){

			var $default = {
			}
		    var $option = $.extend({}, $default, $param);

			//유효성 검증
			if($option.target === undefined){
				this.modal('target은(는) 필수항목입니다.');
				return;
			}
			
			var _target = $.grep(baseGridArray, function(array, f){
				return array.key === $option.target;
			});

			if(isArrayInvalid(_target))
				return;
			
			var _gridObject = _target[0].value;
			_gridObject.initialize();
		},
		
		gridCellUpdate : function($param){
			
			var $default = {
					isUpdate : true
			}
		    var $option = $.extend({}, $default, $param);

			//유효성 검증
			if($option.target === undefined){
				this.modal('target은(는) 필수항목입니다.');
				return;
			}
			
			//Global에 저장된 Grid의 정보가 있는지 확인합니다.
			for(i in baseGridArray){
				
				//Grid가 존재한다면,
				if(baseGridArray[i].key === $option.target){
					var _gridBeforeOption = baseGridArray[i].value; 
					
					if(isStringInvalid($option.source))
						$option.source = _gridBeforeOption.source;
					
					if(isStringInvalid($option.data))
						$option.data = _gridBeforeOption.data;
					
					$option.type = _gridBeforeOption.type;
					$option.thead = _gridBeforeOption.thead;
					$option.height = _gridBeforeOption.height;
					
					base._gridCellUpdate($option);
					
					break;
				}
				
			}
			
		},
			


		/**
		 * @desc : Grid를 초기 생성합니다. // Table의 윤곽을 그려줍니다.
		 * @date : 2018.03.02
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridInitTable($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridInitTable : function($option){

			var html;
			
			//table을 생성합니다.
			html = '';
			html += '<table data-target="' + $option.target + '">';
			html += '</table>';
			$($option.target).append(html);
			
			//table의 CSS 설정을 합니다.
			//높이설정
			if(isStringValid($option.height))
				$($option.target + ' table').css('height', $option.height);
			
		},

		/**
		 * @desc : Grid를 초기 생성합니다. // Table의 Thead 즉, 제목을 그려줍니다.
		 * @date : 2018.03.02
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridInitThead($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridInitThead : function($option){

			var html;
			
			//thead를 생성합니다.
			html = '';
			html += '<thead>';
			html += '	<tr>';
			html += '	</tr>';
			html += '</thead>';
			//thead를 집어 넣습니다.
			$($option.target + ' table').append(html);
			
			for ( var i in $option.thead) {
				
				if(isStringInvalid($option.thead[i].text)){
					base.modal('to Developer :: 그리드의 값은 필수값입니다.');
					console.log('유효성 검증 실패 :: to Developer :: 그리드의 값은 필수값입니다.');
					return;
				}
				if(isStringInvalid($option.thead[i].name)){
					base.modal('to Developer :: 그리드의 키는 필수값입니다.');
					console.log('유효성 검증 실패 :: to Developer :: 그리드의 키는 필수값입니다.');
					return;
				}
				
				
				html = '';
				html += '<th data-index="' + i + '" data-name="' + $option.thead[i].name + '" class="base-gridSortDefault">';
				html += '	<span>' + $option.thead[i].text + '</span>';
				html +=	'	<div class="base-hide base-gridSortWrap">';
				html +=	'		<div class="base-gridIcon base-gridIconUp"></div>';
				html +=	'	</div>';
				html +=	'	<div class="base-hide base-gridSortWrap">';
				html +=	'		<div class="base-gridIcon base-gridIconDown"></div>';
				html +=	'	</div>';
				html += '</th>';
				
				$($option.target + ' table thead tr').append(html);
			}

			//thead의 필터 속성에 대해 처리합니다.
			//페이징 방식에 대해서 필터를 처리합니다.
			if($option.type === 'paging'){
				$($option.target + ' table thead tr th').css('cursor', 'pointer');
				$($option.target + ' table thead tr th').on('click', function(){
					var _target = $(this).closest('table').attr('data-target');
					var _index = $(this).attr('data-index');
					
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDefault');
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortAscending');
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDescending');
					$($option.target + ' table thead tr th').not(this).addClass('base-gridSortDefault');
					$($option.target + ' table thead tr th > div.base-gridSortWrap').addClass('base-hide');
					
					if($(this).hasClass('base-gridSortDefault')){
						base.gridSortAscending({
							target : _target,
							index : _index
						});
						$(this).find('div.base-gridIconUp').parent().removeClass('base-hide');
						$(this).removeClass('base-gridSortDefault');
						$(this).addClass('base-gridSortAscending');
					}else if( $(this).hasClass('base-gridSortAscending') ){
						base.gridSortDescending({
							target : _target,
							index : _index
						});
						$(this).find('div.base-gridIconDown').parent().removeClass('base-hide');
						$(this).removeClass('base-gridSortAscending');
						$(this).addClass('base-gridSortDescending');
					}else if( $(this).hasClass('base-gridSortDescending') ){
						base.gridSortDefault({
							target : _target
						});
						$(this).removeClass('base-gridSortDescending');
						$(this).addClass('base-gridSortDefault');
					}
				});
			}else if($option.type === 'scrollSort'){
				for ( var i in $option.thead) {
					
					if($option.thead[i].isSort){
						$($option.target + ' table thead tr th[data-index="' +i + '"]').css('cursor', 'pointer');
						
						$($option.target + ' table thead tr th[data-index="' +i + '"]').on('click', function(){
							var _target = $(this).closest('table').attr('data-target');
							var _recordSortTarget = $(this).attr('data-name');
							var _index = $(this).attr('data-index');
							
							$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDefault');
							$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortAscending');
							$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDescending');
							$($option.target + ' table thead tr th').not(this).addClass('base-gridSortDefault');
							$($option.target + ' table thead tr th > div.base-gridSortWrap').addClass('base-hide');
							

							$option.data.recordSortTarget = _recordSortTarget;

							if($(this).hasClass('base-gridSortDefault')){
								$(this).find('div.base-gridIconUp').parent().removeClass('base-hide');
								$(this).removeClass('base-gridSortDefault');
								$(this).addClass('base-gridSortAscending');
								
								$option.data.recordSortOrder = "asc";
								
							}else if( $(this).hasClass('base-gridSortAscending') ){
								$(this).find('div.base-gridIconDown').parent().removeClass('base-hide');
								$(this).removeClass('base-gridSortAscending');
								$(this).addClass('base-gridSortDescending');
								
								$option.data.recordSortOrder = "desc";
								
							}else if( $(this).hasClass('base-gridSortDescending') ){
								$(this).removeClass('base-gridSortDescending');
								$(this).addClass('base-gridSortDefault');
								
								$option.data.recordSortOrder = "default";
								
							}else{
								base.modal('to Developer :: 그리드 정렬 정보가 없습니다.');
								console.log('유효성 검증 실패 :: to Developer :: 그리드 정렬 정보가 없습니다.');
								return;
							}
							
							base._gridCellUpdate($option);
						});
					}
					
				}
			}
			
			var tableWidth = $($option.target + ' table').width();
			
			//thead의 스타일을 처리합니다.
			for ( var i in $option.thead) {
				//가로 길이를 설정합니다.
				if(isStringValid($option.thead[i].width)){
					var cellWidth = $option.thead[i].width;
					if($option.thead[i].width.indexOf('%') !== -1){
						var percent = $option.thead[i].width.substring(0, $option.thead[i].width.length-1);
						cellWidth = ( tableWidth / 100 ) * percent 
					}
					$($option.target + ' table thead tr th').eq(i).width(cellWidth);
					$($option.target + ' table thead tr th span').eq(i).width(cellWidth);
				}
				else{
					$($option.target + ' table thead tr th').eq(i).width(tableWidth / $option.thead.length);
					$($option.target + ' table thead tr th span').eq(i).width(tableWidth / $option.thead.length);
				}
				
				//th의 클래스를 설정합니다.
				if(isStringValid($option.thead[i].thClass))
					$($option.target + ' table thead tr th').eq(i).addClass($option.thead[i].thClass);
				
				//th의 글자 정렬을 설정합니다.
				if(isStringValid($option.thead[i].titleAlign)){
					if($option.thead[i].titleAlign === 'left')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tl');
					else if($option.thead[i].titleAlign === 'center')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tc');
					else if($option.thead[i].titleAlign === 'right')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tr');
				}
			}
			if(isStringValid($option.theadHeight)){
				$($option.target + ' table thead tr th').css('height', $option.theadHeight);
				
				if(isStringInvalid($option.theadLineHeight))
					$option.theadLineHeight = $option.theadHeight;

				$($option.target + ' table thead tr th').css('line-height', $option.theadLineHeight);
				
				$($option.target + ' table thead tr th div.base-gridSortWrap div.base-gridIcon').css('height', $option.theadHeight);
			}
			
			var cellWidth = [];
			$($option.target + ' table thead tr th').each(function(index){
				cellWidth.push($(this).width());
			});
			$($option.target + ' table').attr('data-width', cellWidth);
			
		},

		/**
		 * @desc : Grid를 초기 생성합니다. // Table의 tbody의 데이터를 바인딩 합니다.
		 * @date : 2018.03.05
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridInitTbody($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridInitTbody : function($option){
			
			
			//셀 크기가 PX로 선언되었을 경우
			if($option.cellHeight.indexOf('px') > -1 ){
				if($option.type === 'scroll')
					$option.recordEndIndex = Math.ceil( ($($option.target + ' table').height() - $($option.target + ' table thead').height()) / $option.cellHeight.replace(/px/gi,'') );
			}else{
				//TODO Grid Cell의 Height 여러개 처리
				base.modal('to developer :: Cell의 Height가 현재 PX만 지원됩니다.');
				console.log('유효성 검증 실패 :: to developer :: Cell의 Height가 현재 PX만 지원됩니다.');
				return;
			}
			
			base._gridCellUpdate($option);
			
		},
		/**
		 * @desc : Grid를 초기 생성합니다. // Table의 tbody의 더미 tr 을 그려줍니다.
		 * @date : 2018.03.05
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridTbodyTemplate($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 * 2018.03.06	홍성호	cellUpdate 변경으로, tbody 초기 생성 시 slimScroll의 여부를 확인 후 있다면 제거한 뒤 생성한다.
		 */
		_gridTbodyTemplate : function($option){

			//tbody의 더미를 그립니다.
			if(isIntegerValid($option.totalSize)){

				//CellUpdate시 기존의 스크롤이 존재할수 있으므로.
				$($option.target + ' table').find('div.slimScrollDiv').remove();
				
				html = '';
				
				html += '<tbody></tbody>';
				$($option.target + ' table').append(html);
				
				for ( var i = 0 ; i < $option.totalSize ; i++) {
					html = '';
					html += '<tr>';
					for( var j in $option.thead){
						html += '<td data-name="' + $option.thead[j].name + '" >';
						html += '	<span class="base-gridCell">';
						html += '	</span>';
						html += '</td>';
					}
					html += '</tr>';
					$($option.target + ' table tbody').append(html);
				}
				
				if($option.totalSize == 0){

					html = '';
					html += '<tr>';
					html += '	<td colspan="' + $option.thead.length + '">';
					html += '		<span class="base-gridCell">';
					html +=	'			표시할 데이터가 없습니다.';	
					html += '		</span>';
					html += '	</td>';
					html += '</tr>';
					$($option.target + ' table tbody').append(html);
					
				}
			}else{
				base.modal('to Developer :: $option.totalSize를 확인해주세요.');
				console.log('유효성 검증 실패 :: to Developer :: $option.totalSize를 확인해주세요.');
				return;
			}
			
			//tbody의 스타일을 정의합니다.
			//tbody의 세로 높이를 설정합니다.
			if(isStringValid($option.height)){
				var _tbodyHeight = $($option.target + ' table').height() - $($option.target + ' table thead').height();
				var _trHeight = $($option.target + ' table tbody tr').height();
				
				$option.recordStartIndex = 0;
				$option.recordEndIndex = Math.ceil(_tbodyHeight / _trHeight);
				
				$($option.target + ' table tbody').height(_tbodyHeight);
			}
			//tbody의 가로 길이를 설정합니다.
				
			var gridWidthArray = $($option.target + ' table').attr('data-width');
			for ( var i = 0 ; i < $option.totalSize ; i ++) {
				for( var j in $option.thead){
					$($option.target + ' table tbody tr').eq(i).find('td').eq(j).width(gridWidthArray.split(',')[j]);
					$($option.target + ' table tbody tr').eq(i).find('td').eq(j).find('span').width(gridWidthArray.split(',')[j]);
				}
			}
			
		},


		/**
		 * @desc : Grid의 Cell을 업데이트 해줍니다.
		 * @date : 2018.03.06
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridCellUpdate($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridCellUpdate : function($option){
			var _data = $.extend({}, $option.data, {
				recordStartIndex : $option.recordStartIndex,
				recordEndIndex : $option.recordEndIndex
			});
			
			//데이터 정보를 서버로부터 읽습니다.
			base.ajax({
				url : $option.source,
				data : _data,
				type : 'POST',
				isDisplayProgress : false
			},function(data){
				//데이터가 유효하지 않을 시
				if(!data.IsSucceed){
					//TODO Grid Source Exception 처리
					base.modal('Grid 목록 로딩 오류');
					console.log('유효성 검증 실패 :: Grid 목록 로딩 오류');
					return;
				}

				//그리드가 스크롤 혹은 페이징 타입이 아닐경우
				if($option.type !== 'scroll' && $option.type !== 'paging' && $option.type !== 'scrollSort'){
					base.modal('to Developer :: type은 필수값입니다.');
					console.log('유효성 검증 실패 :: to Developer :: type은 필수값입니다.');
					return;
				}

				if($option.isUpdate){
					//더미를 그리기 위해 총 데이터의 사이즈를 가져옵니다.
					$option.totalSize = data.TotalSize;
					base._gridTbodyTemplate($option);
				}
				
				//기존 데이터를 지워줍니다.
				$($option.target + ' table tbody tr td span').html('&nbsp;');
				$($option.target + ' table tbody tr td').attr('title', '');
				
				//데이터 바인딩 합니다.
				for(var i in data.Data){
					for(var j in $option.thead){
						var _gridIndex = (data.Data[i].rnum)
						var _gridKey = $option.thead[j].name;
						var _gridValue = $option.defaultAlterText;
						for (var k in data.Data[i]) {
							if (k === _gridKey){
								_gridValue = data.Data[i][k];							
							}
						}
						$($option.target + ' table tbody tr').eq(_gridIndex).find('td[data-name="' + _gridKey + '"]').find('span').text(_gridValue);
						$($option.target + ' table tbody tr').eq(_gridIndex).find('td[data-name="' + _gridKey + '"]').attr('title', _gridValue);
					}
				}

				//바인딩 된 데이터의 툴팁을 그려줍니다.
				$( $option.target + ' table tbody').tooltip();
				
				
				if($option.isUpdate){

					//스크롤을 만들어줍니다.
					base._gridScroll($option);
					
					//그리드를 최종적으로 셋팅합니다.
					base._gridSetting($option);
					
					$option.isUpdate = false;
				}
			});
		},

		/**
		 * @desc : Grid를 초기 생성합니다. // 그리드의 스크롤바를 만들어줍니다.
		 * @date : 2018.03.02
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridScroll($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridScroll : function($option){

			if(typeof $().slimscroll === "function"){
				$($option.target + ' table tbody').slimscroll({
					height : $( $option.target + ' table tbody').height() 
				});
				
				
				if($option.type === 'scroll' || $option.type === 'scrollSort'){
					$($option.target + ' table tbody').stopScroll({
						target : $option.target
					},function(data){
						var _scrollHeight = $($option.target + ' table tbody').height();
						var _trHeight = $($option.target + ' table tbody tr').height();
						
						
						//로딩할 크기
						//시작값
						var _trStartIndex = Math.floor(data.scrollTop / _trHeight);
						//종료값
						var _trEndIndex = Math.ceil((data.scrollTop + _scrollHeight) / _trHeight);
//						console.log('recordStartIndex : ' + _trStartIndex);
//						console.log('recordEndIndex : ' + _trEndIndex);
						
						$option.recordStartIndex = _trStartIndex;
						$option.recordEndIndex = _trEndIndex;
						
						base._gridCellUpdate($option);
					});
				}
				
				
			}else{
				base.modal('to Developer :: javascript slimscroll은 필수항목입니다.');
				console.log('유효성 검증 실패 :: to Developer :: javascript slimscroll은 필수항목입니다');
				return;
			}
			
		},

		_gridSetting : function($option){

			
			var children = $($option.target).find(' table tbody tr');
			
			var attribute = {
				source : $option.source,
				type : $option.type,
				data : $option.data,
				thead : $option.thead,
				height : $option.height
			};
			
			if($option.type === 'paging'){
				$.extend(attribute, {
					order : function(){
						var compare = function(a, b) {
							
							var sorting = base._gridSortNumber(a, b);
							
							if (typeof sorting == "number")
								return sorting;
							
							var change = base._gridSortString(a, b);
							
							var a = change.first;
							var b = change.second;
							
							return a.localeCompare(b);
						};
						
						var ascendingOrder = function(a, b) {
							return compare(a, b);
						};
						var descendingOrder = function(a, b) {
							return compare(b, a);
						};
						
						return {
							ascending : ascendingOrder,
							descending : descendingOrder
						};
					}(),
					index : false,
					array : function() {
						var array = [];
						for (var x = 0; x < children.length; x++)
							array[x] = children[x];
						return array;
					}(),
					defaultArray : null,
					checkIndex : function(index) {
						if (index)
							this.index = parseInt(index, 10);
						else
							this.index = 0;
					},
					getText : function(child) {
						if (this.index)
							child = child.cells[this.index];
						return base._gridTextClone(child);
					},
					setChildren : function() {
						var array = [];
						for ( var i in this.array) {
							array[i] = this.array[i];
						}
						
						$($option.target + ' table tbody').empty();
						
						for (var x = 0; x < array.length; x++)
							$($option.target + ' table tbody').append(array[x]);
					},
					ascending : function(index) { // 오름차순 
						this.checkIndex(index);
						var _self = this;
						var order = this.order;
						var ascending = function(a, b) {
							var a = _self.getText(a);
							var b = _self.getText(b);
							return order.ascending(a, b);
						};
						this.array.sort(ascending);
						this.setChildren();
					},
					descending : function(index) { // 내림차순
						this.checkIndex(index);
						var _self = this;
						var order = this.order;
						var descending = function(a, b) {
							var a = _self.getText(a);
							var b = _self.getText(b);
							return order.descending(a, b);
						};
						this.array.sort(descending);
						this.setChildren();
					},
					initialize : function(){
						this.array = [];
						for ( var i in this.defaultArray) {
							this.array[i] = this.defaultArray[i];
						}
						this.setChildren();
					}
				})
				
				if (!attribute.defaultArray) {
					attribute.defaultArray = [];
					for ( var i in attribute.array) {
						attribute.defaultArray[i] = attribute.array[i];
					}
				}
			}
			
			
			//Grid ID(key)가 중복되는 GridArray가 있으면 지워줍니다.
			for(i in baseGridArray){
				if(baseGridArray[i].key === $option.target){
					baseGridArray.splice(i, 1);
					break;
				}
			}
			
			//Grid의 정보를 Global 변수에 넣어줍니다.
			var grid = {
				key : $option.target,
				value : attribute
			}
			baseGridArray.push(grid);
			
			
		},
		
		/**
		 * @desc : Grid // td의 텍스트 복사를 합니다.
		 * @date : 2018.02.21
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * tag									R		object			td cell의 object를 전달	
		 * @sample : 
		 * 	_gridTextClone(tag);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * 	object
		 * @update : 
		 * 	일시		이름	변경내용
		 * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
		 */
		_gridTextClone : function(tag) {
			var clone = tag.cloneNode(true); // 태그의 복사본 만들기. 
			var br = clone.getElementsByTagName("br");
			while (br[0]) {
				var blank = document.createTextNode(" ");
				clone.insertBefore(blank, br[0]);
				clone.removeChild(br[0]);
			}
			var isBlock = function(tag) {
				var display = "";
				if (window.getComputedStyle)
					display = window.getComputedStyle(tag, "")["display"];
				else
					display = tag.currentStyle["display"];
				return (display == "block") ? true : false;
			};
			var children = clone.getElementsByTagName("*");
			for (var x = 0; x < children.length; x++) {
				var child = children[x];
				if (!("value" in child) && isBlock(child))
					child.innerHTML = child.innerHTML + " ";
			}
			var textContent = ("textContent" in clone) ? clone.textContent : clone.innerText;
			return textContent;
		},

		/**
		 * @desc : Grid // integer 형태를 정렬합니다.
		 * @date : 2018.02.21
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * first								R		integer			td cell의 비교할 첫번째 integer를 전달
		 * second								R		integer			td cell의 비교할 두번째 integer를 전달
		 * @sample : 
		 * 	_gridSortNumber(first, second);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * 	object
		 * @update : 
		 * 	일시		이름	변경내용
		 * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
		 */
		_gridSortNumber : function (first, second){
			if (typeof first == "number" && typeof second == "number")
				return first - second;

			// 천단위 쉼표와 공백문자만 삭제하기.  
			var first = (first + "").replace(/[,\s\xA0]+/g, "");
			var second = (second + "").replace(/[,\s\xA0]+/g, "");

			var numFirst = parseFloat(first) + "";
			var numSecond = parseFloat(second) + "";

			if (numFirst == "NaN" || numSecond == "NaN" || first != numFirst || second != numSecond)
				return false;

			return parseFloat(first) - parseFloat(second);
		},
		

		/**
		 * @desc : Grid // string 형태를 정렬합니다.
		 * @date : 2018.02.21
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * first								R		object			td cell의 비교할 첫번째 object를 전달
		 * second								R		object			td cell의 비교할 두번째 object를 전달
		 * @sample : 
		 * 	_gridSortString(first, second);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * 	object
		 * @update : 
		 * 	일시		이름	변경내용
		 * 18.02.28		홍성호	base.js에서 base.grid.js로 이동
		 */
		_gridSortString : function(first, second){

			// 문자열의 복사본 만들기. 
			var a = first.toString().replace(/[\s\xA0]+/g, " ");
			var b = second.toString().replace(/[\s\xA0]+/g, " ");

			var change = {
				first : a,
				second : b
			};

			if (a.search(/\d/) < 0 || b.search(/\d/) < 0 || a.length == 0
					|| b.length == 0)
				return change;

			var regExp = /(\d),(\d)/g; // 천단위 쉼표를 찾기 위한 정규식. 

			a = a.replace(regExp, "$1" + "$2");
			b = b.replace(regExp, "$1" + "$2");

			var unit = 0;
			var aNb = a + " " + b;
			var numbers = aNb.match(/\d+/g); // 문자열에 들어있는 숫자 찾기 

			for (var x = 0; x < numbers.length; x++) {

				var length = numbers[x].length;
				if (unit < length)
					unit = length;
			}

			var addZero = function(string) { // 숫자들의 단위 맞추기 

				var match = string.match(/^0+/);

				if (string.length == unit)
					return (match == null) ? string : match + string;

				var zero = "0";

				for (var x = string.length; x < unit; x++)
					string = zero + string;

				return (match == null) ? string : match + string;
			};

			change.first = a.replace(/\d+/g, addZero);
			change.second = b.replace(/\d+/g, addZero);

			return change;
		}
		
	})
})(jQuery)
