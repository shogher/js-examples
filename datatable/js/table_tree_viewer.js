jQuery(document).ready(function($) {
	var table;
	var dataType = function(data, type, row) {
		return data.replace(", ", ".").replace(" ",",");
	};
	var numberView = function(number,decimalDelimiter, thousandDelimiter) {
		var number, str, decimal;
		number = number.replace(",", ".");
        number = parseFloat(number, 10);
        str = "";
        decimal = decimalDelimiter + number*10%10;
        number= number-(number%1);
        while(number>1000) {
			if (str) {
           		str = thousandDelimiter + number % 1000 + str ;
			} else {
				str=number % 1000;
			}
           	number = Math.floor(number /1000);
        } 
        str =  number  + thousandDelimiter + str + decimal;
        return str;
    };
	var initTree = function(tree) {
		var item, itemNode, nodeText;
		for (item in tree) {
			for (itemNode in tree[item].nodes) {
				nodeText = tree[item].nodes[itemNode];
				nodeText.text = nodeText.text.branch + "  " +numberView( nodeText.text.sum, ".", ",");
			}	
		}	
		return tree;
	};
	function drawTable(tableData) {
		table = $('#example').DataTable({
			'data': tableData,
			'paging': false,
			'language' : {
				"decimal": ".",
           		"thousands": ",",
				"sEmptyTable": "Տվյալները բացակայում են",
				"sProcessing": "Կատարվում է...",
				"sInfoThousands":  ",",
				"sLengthMenu": "Ցուցադրել _MENU_ արդյունքներ մեկ էջում",
				"sLoadingRecords": "Բեռնվում է ...",
				"sZeroRecords": "Հարցմանը համապատասխանող արդյունքներ չկան",
				"sInfo": "Ցուցադրված են _START_-ից _END_ արդյունքները ընդհանուր _TOTAL_-ից",
				"sInfoEmpty": "Արդյունքներ գտնված չեն",
				"sInfoFiltered": "(ֆիլտրվել է ընդհանուր _MAX_ արդյունքներից)",
				"sInfoPostFix":  "",
				"sSearch": "Փնտրել",
				"oPaginate": {
					"sFirst": "Առաջին էջ",
					"sPrevious": "Նախորդ էջ",
					"sNext": "Հաջորդ էջ",
					"sLast": "Վերջին էջ"
				},
				"oAria": {
					"sSortAscending":  ": ակտիվացրեք աճման կարգով դասավորելու համար",
					"sSortDescending": ": ակտիվացրեք նվազման կարգով դասավորելու համար"
				}
			},
			'columns': [
				{ 'title': 'Գնման ենթակա  ապրանքներ, աշխատանքներ և ծառայությունների խմբեր' }, 
				{ 'title': 'Գնման ենթակա ապրանքներ, աշխատանքներ և ծառայություններ' }, 
				{ 'title': 'Չափման միավորը' }, 
				{ 'title': 'Ամբողջ քանակը (ծավալը)',
				  'sClass': 'text-right',
				}, 
				{ 'title': 'Գումարը',
				  'sClass': 'text-right'
				}
			],
			"columnDefs": [
				{ "visible": false, "targets": 0 },
				{ "visible": true, "targets": 4 ,
                  "render": dataType},
				{ "visible": true, "targets": 3,
                  "render": dataType}
			],
			"order": [[ 0, 'asc' ]],
			"displayLength": 25,
			"drawCallback": function ( settings ) {
				var api = this.api();
				var rows = api.rows( {page:'current'} ).nodes();
				var last=null;
				api.column(0, {page:'current'} ).data().each( function ( group, i ) {
					var amount= api.rows({ page: 'current' }).data()[i][5];
					if ( last !== group ) {
						$(rows).eq( i ).before(
							'<tr class="group"><td colspan="3">'+group+'<td colspan="1">' + dataType(amount) + '</td></td></tr>'
							);
						last = group;
					}
				});
			}
		});
		$('#example tbody').on( 'click', 'tr.group', function() {
			var currentOrder = table.order()[0];
			if ( currentOrder[0] === 0 && currentOrder[1] === 'asc' ) {
				table.order( [ 0, 'desc' ] ).draw();
			} else {
				table.order( [ 0, 'asc' ] ).draw();
			}
		});
	} 
	var tableData = dataSet[0];
	drawTable(tableData);
	$('#tree').treeview({
		data: initTree(tree),
		levels: 1,
		expandIcon: 'glyphicon glyphicon-triangle-right',
		collapseIcon: 'glyphicon glyphicon-triangle-bottom',
		onNodeSelected: function(event, data) {
			var item, nodes, nodesText;
			$("#example, #details, #example_wrapper").empty();
			if (data && data.id !== undefined) {
				table.destroy();
				drawTable(dataSet[data.id])
				$("#details").removeClass("details-background");
			} else {
				nodes = data.nodes;
				nodesText = "";
				for (item in nodes) {
					nodesText += '<h5>' + nodes[item].text + '</h6>';
				}
				$("#details").addClass("details-background").html(nodesText);
			}
		}	
	});
	$('#tree').treeview('selectNode', 1);
    $('#tree').treeview('expandNode', [ 0, { levels: 1 } ]);

 
});
