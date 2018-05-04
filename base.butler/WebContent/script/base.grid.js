/*! Copyright (c) 2018 munchkin team
 * SourceName: base.grid
 * Version: 1.0.0
 * SnapshotDate: 2018.05.04
 * 
 * Developer's list
 * - seongho, hong
 * 
 * MIT License(http://www.opensource.org/licenses/mit-license.php)
 */

var baseGridArray = [];

(function($) {
	jQuery.extend(base, {
	    /**
	     * @desc : Grid // 그리드를 생성합니다.
	     * - border가 collapse일 경우 thead > tbody > tfoot 의 우선순위 입니다.
	     * 
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
	     * title
	     * - text								R		string			바인딩 될 데이터의 제목 정보
	     * - name								R		string			바인딩 될 데이터의 key / DB의 column과 매치되면 좋겠지요.
	     * - thClass							O		string
	     * - width				auto			O		string			Cell의 가로 크기 / px 등 단위 표기 필요
	     * - titleAlign			center			O		string			thead tr th의 정렬 정보
	     * - cellAlign							O		string			tbody tr td의 정렬 정보
	     * 
	     * 
	     * wrapClass							O		string			div에 넣을 클래스 명칭 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.			
	     * titleClass							O		string			table thead tr에 넣을 클래스 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
	     * cellClass							O		string			table tbody tr에 넣을 클래스 / 여러 클래스의 경우 띄어쓰기로 구분 / Class 특성상 제일 오른쪽이 우선순위입니다.
	     * 
	     * width				100%			O		string			grid의 가로 크기 / px 등 단위 표기 필요
	     * height				300px			O		string			grid의 세로 크기 / px 등 단위 표기 필요
	     * 
	     * titleHeight							O		string			thead tr의 세로 크기 / px 등 단위 표기 필요 / titleClass보다 우선순위입니다.
	     * titleLineHeight		titleHeight		O		string			thead tr의 줄간격 / px 등 단위 표기 필요 / titleHeight가 선언되고, 해당 항목이 null 일경우 titleHeight를 승계함 / titleClass보다 우선순위입니다.
	     * 
	     * cellHeight							O		string			tbody tr의 세로 크기 / px 등 단위 표기 필요 / cellClass 보다 우선순위입니다.
	     * cellLineHeight		cellHeight		O		string			tbody tr의 줄간격 / px 등 단위 표기 필요 / cellHeight가 선언되고, 해당 항목이 null 일경우 cellHeight를 승계함 / cellClass 보다 우선순위입니다.
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
				
				titleHeight : '30px',
				
				cellHeight : '30px',
				defaultAlterText : '-',
				
				isUpdate : true,
				gridDefaultTitle: [{
					text:'',
					width: '0%',
					name: 'gridHiddenSequence',
					hidden : true
				},{
					text:'',
					width: '0%',
					name: 'gridHiddenData',
					hidden : true
				}]
				
					
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
		 * @desc : Grid 데이터의 검색조건 등을 변경하여 데이터를 다시 뿌려줍니다.
		 * @date : 2018.03.07
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	gridCellUpdate($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		gridCellUpdate : function($param){
			
			var $default = {
				isUpdate : true,
				gridDefaultTitle: [{
					text:'',
					width: '0%',
					name: 'gridHiddenSequence',
					hidden : true
				},{
					text:'',
					width: '0%',
					name: 'gridHiddenData',
					hidden : true
				}]
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
					$option.title = _gridBeforeOption.title;
					$option.height = _gridBeforeOption.height;
					
					$option.titleClass = _gridBeforeOption.titleClass;
					$option.cellClass = _gridBeforeOption.cellClass;
					
					$option.cellHeight = _gridBeforeOption.cellHeight;
					$option.cellLineHeight = _gridBeforeOption.cellLineHeight;

					if($option.type === 'scroll' || $option.type === 'scrollSort'){
						$option.recordStartIndex = 0;
						$option.recordEndIndex = Math.ceil(_gridBeforeOption.recordMaxHeight / _gridBeforeOption.recordCellHeight);
					}

					//thead 영역을 초기화 합니다.
					$($option.target + ' table thead tr th').removeClass('base-gridSortDefault');
					$($option.target + ' table thead tr th').removeClass('base-gridSortAscending');
					$($option.target + ' table thead tr th').removeClass('base-gridSortDescending');
					$($option.target + ' table thead tr th').addClass('base-gridSortDefault');
					$($option.target + ' table thead tr th > div.base-gridSortWrap').addClass('base-hide');
					
					base._gridCellUpdate($option);
					
					break;
				}
				
			}
			
		},

		gridRowData : function(selector) {
			return JSON.parse($(selector).closest('tr').find('td[data-name="gridHiddenData"] span').attr('data-row'));
		},
		
		
		gridLayerPopupClose : function(selector){

			//유효성 검증
			if(selector === undefined){
				this.modal('selector(는) 필수항목입니다.');
				return;
			}
			
			var _param = base.gridRowData(selector);
			
			if(selector && _param)
				base.layerPopupToParent(selector, _param);
			
			$(selector).closest('div[id^=container_]').dialog('close');
		},
			
		gridRowCopy : function(selector, target){
			
			$(target + ' table tbody').append($(selector).closest('tr').clone());
			var _gridClone = $(selector).closest('tr').clone();
			
			for(var i in baseGridArray){
				if( target === baseGridArray[i].key ){
					for (var j in baseGridArray[i].value.title){
						if(baseGridArray[i].value.title[j].cellRender){
							var _rowData = JSON.parse($(_gridClone).find('td[data-name="gridHiddenData"]').find('span').attr('data-row'));

							$(target + ' table tbody tr:last-child').find('td').eq(j).find('span').html( baseGridArray[i].value.title[j].cellRender(_rowData) );
						}
					}
				}
			}
			if( $(target + ' table tbody tr').length === 1 ){
				$(target + ' table tbody tr td').css('border-top', 'none');
			}
		},
		

		gridRowDelete : function(selector){
			if($(selector).closest('tr').index() === 0)
				$(selector).closest('tbody').find('tr').eq(1).find('td').css('border-top', 'none');
			$(selector).closest('tr').remove();
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
		 * 2018.03.09	홍성호	table의 class를 동적으로 추가합니다.
		 */
		_gridInitTable : function($option){

			var html;
			
			//table을 생성합니다.
			html = '';
			html += '<table data-target="' + $option.target + '">';
			html += '</table>';
			$($option.target).append(html);
			
			//table의 CSS 설정을 합니다.
			if(isStringValid($option.height))
				$($option.target + ' table').addClass($option.tableClass);
			
			
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
		 * 2018.03.07	홍성호	scrollSort 기능 추가
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
			
			
			
			for ( var i in $option.title) {
				
				if(isStringInvalid($option.title[i].text)){
					base.modal('to Developer :: 그리드의 값은 필수값입니다.');
					console.log('유효성 검증 실패 :: to Developer :: 그리드의 값은 필수값입니다.');
					return;
				}
				if(isStringInvalid($option.title[i].name)){
					base.modal('to Developer :: 그리드의 키는 필수값입니다.');
					console.log('유효성 검증 실패 :: to Developer :: 그리드의 키는 필수값입니다.');
					return;
				}
				
				
				html = '';
				html += '<th data-index="' + i + '" data-name="' + $option.title[i].name + '" class="base-gridSortDefault">';
				html += '	<span>' + $option.title[i].text + '</span>';
				html +=	'	<div class="base-hide base-gridSortWrap">';
				html +=	'		<div class="base-gridIcon base-gridIconUp"></div>';
				html +=	'	</div>';
				html +=	'	<div class="base-hide base-gridSortWrap">';
				html +=	'		<div class="base-gridIcon base-gridIconDown"></div>';
				html +=	'	</div>';
				html += '</th>';
				
				$($option.target + ' table thead tr').append(html);
			}

			//grid의 사용성에 도움이 되는 숨김정보에 대해 넣습니다.
			for ( var i in $option.gridDefaultTitle ){

				html = '';
				html += '<th class="base-gridHidden" data-name="' + $option.gridDefaultTitle[i].name + '" >';
				html += '</th>';
				
				$($option.target + ' table thead tr').append(html);
			}

			if(!isUndefined($option.titleClass))
				$($option.target + ' table thead tr th').addClass($option.titleClass);

			//thead의 필터 속성에 대해 처리합니다.
			//페이징 방식에 대해서 필터를 처리합니다.
			if($option.type === 'paging'){
				$($option.target + ' table thead tr th').css('cursor', 'pointer');
				$($option.target + ' table thead tr th').on('click', function(){
					var _target = $(this).closest('table').attr('data-target');
					var _index = $(this).attr('data-index');
					

					//Global에 저장된 Grid의 정보가 있는지 확인합니다.
					for(i in baseGridArray){
						
						//Grid가 존재한다면,
						if(baseGridArray[i].key === $option.target){
							$option.source = baseGridArray[i].value.source;
							$option.totalSize = baseGridArray[i].value.totalSize;
							return;
						}
					}
					
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDefault');
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortAscending');
					$($option.target + ' table thead tr th').not(this).removeClass('base-gridSortDescending');
					$($option.target + ' table thead tr th').not(this).addClass('base-gridSortDefault');
					$($option.target + ' table thead tr th > div.base-gridSortWrap').addClass('base-hide');
					
					if($(this).hasClass('base-gridSortDefault')){
						base._gridSort($.extend({}, $option, {
							sortPattern : 'ASCENDING',
							index : _index
						}));
						$(this).find('div.base-gridIconUp').parent().removeClass('base-hide');
						$(this).removeClass('base-gridSortDefault');
						$(this).addClass('base-gridSortAscending');
					}else if( $(this).hasClass('base-gridSortAscending') ){
						base._gridSort($.extend({}, $option, {
							sortPattern : 'DESCENDING',
							index : _index
						}));
						$(this).find('div.base-gridIconDown').parent().removeClass('base-hide');
						$(this).removeClass('base-gridSortAscending');
						$(this).addClass('base-gridSortDescending');
					}else if( $(this).hasClass('base-gridSortDescending') ){
						base._gridSort($.extend({}, $option, {
							sortPattern : 'DEFAULT',
							index : _index
						}));
						$(this).removeClass('base-gridSortDescending');
						$(this).addClass('base-gridSortDefault');
					}
				});
			}else if($option.type === 'scrollSort'){
				for ( var i in $option.title) {
					
					if($option.title[i].isSort){
						$($option.target + ' table thead tr th[data-index="' +i + '"]').css('cursor', 'pointer');
						
						$($option.target + ' table thead tr th[data-index="' +i + '"]').on('click', function(){
							var _target = $(this).closest('table').attr('data-target');
							var _recordSortTarget = $(this).attr('data-name');
							var _index = $(this).attr('data-index');
							
							//Global에 저장된 Grid의 정보가 있는지 확인합니다.
							for(i in baseGridArray){
								
								//Grid가 존재한다면,
								if(baseGridArray[i].key === $option.target){
									$option.source = baseGridArray[i].value.source;
									$option.totalSize = baseGridArray[i].value.totalSize;
									break;
								}
							}
							
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

							var _scrollTop = $($option.target + ' table tbody').scrollTop();
							
							$option.recordStartIndex = Math.floor( _scrollTop / $option.recordCellHeight );
							$option.recordEndIndex = Math.ceil( (_scrollTop+$option.recordMaxHeight) / $option.recordCellHeight );
							
							base._gridCellUpdate($option);
						});
					}
					
				}
			}
			
			var tableWidth = $($option.target + ' table').width();
			var _tableBorderCollapse = $($option.target + ' table').css('border-collapse');
			//thead의 스타일을 처리합니다.
			for ( var i in $option.title) {
				
				var _cellMarginLeftWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('margin-left').replace(/px/gi,''));
				var _cellMarginRightWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('margin-right').replace(/px/gi,''));
				
				var _cellPaddingLeftWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('padding-left').replace(/px/gi,''));
				var _cellPaddingRightWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('padding-right').replace(/px/gi,''));
				
				var _cellBorderLeftWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('border-left-width').replace(/px/gi,''));
				var _cellBorderRightWidth = parseFloat($($option.target + ' table thead tr th').eq(i).css('border-right-width').replace(/px/gi,''));
				
				var _cellWrapWidth = _cellMarginLeftWidth + _cellMarginRightWidth + _cellPaddingLeftWidth + _cellPaddingRightWidth;
				
				if( _cellBorderLeftWidth > 0 && _cellBorderRightWidth > 0 && _tableBorderCollapse === 'collapse'){
					
					var _browserVersion = base.getIEVersion2();
					
					if(i == 0){
						if(_browserVersion === 11){
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth * 2);
							_cellWrapWidth += parseFloat(_cellBorderRightWidth);
						}else{
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth);
							_cellWrapWidth += parseFloat(_cellBorderRightWidth / 2);
						}
					}else if( i == ($option.title.length-1)){

						if(_browserVersion === 11){
							_cellWrapWidth += parseFloat(_cellBorderRightWidth * 2);
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth);
						}else{
							_cellWrapWidth += parseFloat(_cellBorderRightWidth);
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth / 2);
						}
					}else{
						if(_browserVersion === 11){
							_cellWrapWidth += parseFloat(_cellBorderRightWidth);
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth);
						}else{
							_cellWrapWidth += parseFloat(_cellBorderRightWidth / 2);
							_cellWrapWidth += parseFloat(_cellBorderLeftWidth / 2);
						}
					}
				}
				
				//가로 길이를 설정합니다
				if(isStringValid($option.title[i].width)){
					var cellWidth = $option.title[i].width;
					
					
					if($option.title[i].width.indexOf('%') !== -1){
						var percent = $option.title[i].width.substring(0, $option.title[i].width.length-1);
						cellWidth = ( tableWidth / 100 ) * percent 
					}
					$($option.target + ' table thead tr th').eq(i).width(cellWidth - _cellWrapWidth);
					$($option.target + ' table thead tr th span').eq(i).width(cellWidth - _cellWrapWidth);
				}
				else{
					$($option.target + ' table thead tr th').eq(i).width((tableWidth / $option.title.length) - _cellWrapWidth);
					$($option.target + ' table thead tr th span').eq(i).width((tableWidth / $option.title.length) - _cellWrapWidth);
				}
				
				//th의 클래스를 설정합니다.
				if(isStringValid($option.title[i].thClass))
					$($option.target + ' table thead tr th').eq(i).addClass($option.title[i].thClass);
				
				//th의 글자 정렬을 설정합니다.
				if(isStringValid($option.title[i].titleAlign)){
					if($option.title[i].titleAlign === 'left')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tl');
					else if($option.title[i].titleAlign === 'center')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tc');
					else if($option.title[i].titleAlign === 'right')
						$($option.target + ' table thead tr th span').eq(i).addClass('base-tr');
				}
			}
			if(isStringValid($option.titleHeight)){
				$($option.target + ' table thead tr th').css('height', $option.titleHeight);
				
				if(isStringInvalid($option.titleLineHeight))
					$option.titleLineHeight = $option.titleHeight;

				$($option.target + ' table thead tr th').css('line-height', $option.titleLineHeight);
				
				$($option.target + ' table thead tr th div.base-gridSortWrap div.base-gridIcon').css('height', $option.titleHeight);
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
				if($option.type === 'scroll' || $option.type === 'scrollSort')
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
		 * @desc : Grid tbody의 스타일을 재설정 합니다.
		 * @date : 2018.03.09
		 * @author: 홍성호
		 * @support : 
		 * 	IE 9+
		 * @param :
		 * 		명칭			기본값		필수여부	타입			설명
		 * @sample : 
		 * 	_gridTbodyStyle($option);
		 * 
		 * @required :
		 * 	- jquery-3.2.1.min.js
		 *  
		 * @optional :
		 * @return :
		 * @update : 
		 * 	일시		이름	변경내용
		 */
		_gridTbodyStyle : function($option){

			if(!isUndefined($option.cellClass))
				$($option.target + ' table tbody tr td').addClass($option.cellClass);
			
			
			$($option.target + ' table tbody tr').height($option.cellHeight);
			$($option.target + ' table tbody tr').css('line-height', $option.cellLineHeight);
			
			//Thead와 tbody 사이의 border collapse 적용
			var _tableBorderCollapse = $($option.target + ' table').css('border-collapse');
			for ( var i in $option.title) {
				//thead의 tr:last의 border-bottom-width 확인
				var _borderBottomWidth = $($option.target + ' table thead tr:last th').eq(i).css('border-bottom-width').replace(/px/gi, '');
				//tbody의 tr:first의 border-top-width 확인
				var _borderTopWidth = $($option.target + ' table tbody tr:first td').eq(i).css('border-top-width').replace(/px/gi, '');
				
				//둘다 존재한다면, thead tr:last border-bottom-width를 삭제합니다. 
				if(_borderBottomWidth > 0 && _borderTopWidth > 0 && _tableBorderCollapse === 'collapse'){
					$($option.target + ' table thead tr:last th').eq(i).css('border-bottom-width', 0);
				}
			}
			
			//cell Align을 설정합니다 ( table tbody tr td )

			for ( var i = 0 ; i < $option.totalSize ; i++) 
				for ( var j in $option.title) 
					if(isStringValid($option.title[j].cellAlign))
						$($option.target + ' table tbody tr').eq(i).find('td').eq(j).css('text-align', $option.title[j].cellAlign);

			
			//tbody의 스타일을 정의합니다.
			//tbody의 세로 높이를 설정합니다.
			if(isStringValid($option.height) || $option.isUpdate){
				var _tbodyHeight = $($option.target + ' table').height() - $($option.target + ' table thead').height();

				var _browserVersion = base.getIEVersion2();
				var _trHeight = 0;
				if(_browserVersion === 11){
					_trHeight = $($option.target + ' table tbody tr td').outerHeight(true);
				}else{
					_trHeight = $($option.target + ' table tbody tr').height();
				}

				$option.recordStartIndex = 0;
				$option.recordEndIndex = Math.ceil(_tbodyHeight / _trHeight);
				$option.recordScrollTop = 0;
				$option.recordCellHeight = _trHeight;
				$option.recordMaxHeight = _tbodyHeight;
				
				$($option.target + ' table tbody').height(_tbodyHeight);
			}
			//tbody의 가로 길이를 설정합니다.
				
			var gridWidthArray = $($option.target + ' table').attr('data-width');
			for ( var i = 0 ; i < $option.totalSize ; i ++) {
				for( var j in $option.title){
					$($option.target + ' table tbody tr').eq(i).find('td').eq(j).width(gridWidthArray.split(',')[j]);
					$($option.target + ' table tbody tr').eq(i).find('td').eq(j).find('span').width(gridWidthArray.split(',')[j]);
				}
			}
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
		 * 2018.03.09	홍성호	tbody의 더미 형식이 totalSize만큼의 tr td를 생성하는 것이 아닌 div의 세로 높이를 크게하여 스크롤이 생성되도록 한다.
		 * 2018.03.09	홍성호	중복되는 스타일 정의에 대해 _gridTbodyStyle로 함수화
		 */
		_gridTbodyTemplate : function($option){

			//tbody의 더미를 그립니다.
			if(isIntegerValid($option.totalSize)){

				//CellUpdate시 기존의 스크롤이 존재할수 있으므로.
				$($option.target + ' table').find('div.slimScrollDiv').remove();
				
				html = '';
				html += '<tbody></tbody>';
				$($option.target + ' table').append(html);
				

				html = '';
				html += '<tr>';
				for( var j in $option.title){
					html += '<td data-name="' + $option.title[j].name + '" >';
					html += '	<span class="base-gridCell">';
					html += '		&nbsp;';
					html += '	</span>';
					html += '</td>';
				}
				html += '</tr>';
				$($option.target + ' table tbody').append(html);

			}else{
				base.modal('to Developer :: $option.totalSize를 확인해주세요.');
				console.log('유효성 검증 실패 :: to Developer :: $option.totalSize를 확인해주세요.');
				return;
			}
			
			base._gridTbodyStyle($option);
			
			$($option.target + ' table tbody tr').remove();

			var html = '';
			html += '<div class="base-gridDummy"><div>';
			$($option.target + ' table tbody').append(html);
			$($option.target + ' table tbody div.base-gridDummy').height( $option.recordCellHeight * $option.totalSize);
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
		 * 2018.03.09	홍성호	더미데이터의 방식 변경으로, 스크롤 상단과 하단에 각각의 필요한 세로 높이만큼 DIV를 활용하여 공간을 채워준다. 
		 */
		_gridCellUpdate : function($option){
			var _data = $.extend({}, $option.data, {
				recordStartIndex : $option.recordStartIndex,
				recordEndIndex : $option.recordEndIndex
			});
			//데이터 정보를 서버로부터 읽습니다.
			
			if($option.source){
				
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
					$($option.target + ' table tbody').empty();

					//데이터 영역 외 상단에 더미 정보를 넣습니다.
					if( $option.recordStartIndex !== 0){
						html = '';
						html += '<div class="base-gridDummy base-gridTopDummy">&nbsp;</div>';

						$($option.target + ' table tbody').append(html);
						$($option.target + ' table tbody div.base-gridTopDummy').height( $option.recordCellHeight * $option.recordStartIndex);
					}
					//데이터 영역에 더미 정보를 넣습니다.
					for(var i = 0 ; i < data.Data.length ; i++){
						html = '';
						html += '<tr>';
						for( var j in $option.title){
							html += '<td data-name="' + $option.title[j].name + '" >';
							html += '	<span class="base-gridCell">';
							html += '		&nbsp;';
							html += '	</span>';
							html += '</td>';
						}
						
						for( var j in $option.gridDefaultTitle ){
							html += '<td class="base-gridHidden" data-name="' + $option.gridDefaultTitle[j].name + '" >';
							html += '	<span class="base-gridCell">';
							html += '		&nbsp;';
							html += '	</span>';
							html += '</td>';
						}
						
						html += '</tr>';
						$($option.target + ' table tbody').append(html);
					}
					//데이터 영역 외 하단에 더미 정보를 넣습니다.
					html = '';
					html += '<div class="base-gridDummy base-gridBottomDummy">&nbsp;</div>';
					$($option.target + ' table tbody').append(html);
					
					var _gridBottomDummyHeight = 0;
					if($option.type === 'scroll' || $option.type === 'scrollSort'){
						_gridBottomDummyHeight = $option.recordCellHeight * ($option.totalSize - $option.recordEndIndex)
					}
					
					$($option.target + ' table tbody div.base-gridBottomDummy').height( _gridBottomDummyHeight );
					
					
					var _gridCellRender = false;
					
					//데이터 바인딩 합니다.
					for(var i in data.Data){
						for(var j in $option.title){
							
							var _gridIndex = (data.Data[i].rnum)
							var _gridKey = $option.title[j].name;
							var _gridValue = $option.defaultAlterText;
							
							for (var k in data.Data[i]) {
								if (k === _gridKey){
									_gridValue = data.Data[i][k];							
								}
							}
							
							if($option.title[j].cellRender)
								_gridCellRender = true;
							else{
								$($option.target + ' table tbody tr').eq(i).find('td[data-name="' + _gridKey + '"]').find('span').text(_gridValue);
								$($option.target + ' table tbody tr').eq(i).find('td[data-name="' + _gridKey + '"]').attr('title', _gridValue);
							}
						}
						$($option.target + ' table tbody tr').eq(i).find('td[data-name="gridHiddenSequence"]').find('span').text(i);
						$($option.target + ' table tbody tr').eq(i).find('td[data-name="gridHiddenData"]').find('span').attr('data-row', JSON.stringify(data.Data[i]));
						
					}
					
					
					//데이터 render 돌립니다.
					if(_gridCellRender){
						for(var i in data.Data){
							for(var j in $option.title){
								if( $option.title[j].cellRender ){
									$($option.target + ' table tbody tr').eq(i).find('td[data-name="' + $option.title[j].name + '"]').find('span').html( $option.title[j].cellRender( data.Data[i] ) );
								}
								
							}
						}
					}
					
					base._gridTbodyStyle($option);
					
					//바인딩 된 데이터의 툴팁을 그려줍니다.
					$( $option.target + ' table tbody').tooltip();
					
					base._gridArrayPush($option);
				});
			}else{
				
				if($($option.target + ' table tbody').length === 0)
					$($option.target + ' table').append('<tbody></tbody>');
				
				//그리드 url이 없어 셀 바인딩이 안될경우 스크롤이 깨지니깐.. 새로 정의해준다
				if($($option.target + ' table tbody').height() === 0)
					$($option.target + ' table tbody').height( $option.height.replace(/px/gi,'') - $($option.target + ' table thead').height() );
				
				base._gridArrayPush($option);
			}
		},
		
		_gridArrayPush : function($option){
			if($option.isUpdate){

				//스크롤을 만들어줍니다.
				base._gridScroll($option);
				
				//Grid ID(key)가 중복되는 GridArray가 있으면 지워줍니다.
				for(i in baseGridArray){
					if(baseGridArray[i].key === $option.target){
						baseGridArray.splice(i, 1);
						break;
					}
				}
				
				baseGridArray.push({
					key : $option.target,
					value : $option
				})
				
				$option.isUpdate = false;
			}
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
						
						var _browserVersion = base.getIEVersion2();
						var _trHeight = 0;
						if(_browserVersion === 11){
							_trHeight = $($option.target + ' table tbody tr td').outerHeight(true);
						}else{
							_trHeight = $($option.target + ' table tbody tr').height();
						}
						
						//로딩할 크기
						//시작값
						var _trStartIndex = Math.floor(data.scrollTop / _trHeight) ;
						//종료값
						var _trEndIndex = Math.ceil((data.scrollTop + _scrollHeight) / _trHeight);
						
						$option.recordStartIndex = _trStartIndex;
						$option.recordEndIndex = _trEndIndex;
						$option.recordScrollTop = data.scrollTop;
						$option.recordCellHeight = _trHeight;
						
						base._gridCellUpdate($option);
					});
				}
				
				
			}else{
				base.modal('to Developer :: javascript slimscroll은 필수항목입니다.');
				console.log('유효성 검증 실패 :: to Developer :: javascript slimscroll은 필수항목입니다');
				return;
			}
			
		},
		_gridSort : function($option){
			
			var $_gridRows = $($option.target + ' table tbody tr').get();
			
			$_gridRows.sort(function(a, b){
				
				
				var _valueA, _valueB;
				
				if($option.sortPattern === 'ASCENDING' || $option.sortPattern === 'DESCENDING'){
					_valueA = $('td', a).eq($option.index).find('span').text();
					_valueB = $('td', b).eq($option.index).find('span').text();
					
				}else if($option.sortPattern === 'DEFAULT'){
					_valueA = $('td[data-name="gridHiddenSequence"]', a).find('span').text();
					_valueB = $('td[data-name="gridHiddenSequence"]', b).find('span').text();
				}else{
					BIT.modal('to Developer :: 올바른 정렬 방식이 아닙니다.');
					console.log('유효성 검증 실패 :: to Developer :: 올바른 정렬 방식이 아닙니다.');
					return;
				}

				if($.isNumeric(_valueA))
					_valueA *= 1;
				
				if($.isNumeric(_valueB))
					_valueB *= 1;
				
		        if ($option.sortPattern === 'ASCENDING' || $option.sortPattern === 'DEFAULT' ) {
		            return (_valueA > _valueB) ? 1 : -1;     // A bigger than B, sorting ascending
		        } else if($option.sortPattern === 'DESCENDING') {
		            return (_valueA < _valueB) ? 1 : -1;     // B bigger than A, sorting descending
		        }
			});

			$.each($_gridRows, function(index, row){
				$($option.target + ' table tbody').append(row);
		    });
		}
	})
})(jQuery)
