function displayxp() {
var html = '<div class="userblock">'+
  '<div class="row-fluid">'+
 '<div class="span12">'+
  '<div class="header">'+user+'<span class="orange" style="float:right;display: none;"><i class="fa fa-star"></i> Level '+level+'</span></div>'+
  '<table class="table" id="alltrades">'+
    '<tbody>'+
      '<tr>'+
        '<td style="width: 33%;"><i class="fa fa-adjust"></i> Ratio: <span class="green">'+ratio+'</span></td>'+
        '<td style="width: 33%;"><i class="fa fa-tasks"></i> Percentage: <span class="green">'+percentage+'%</span></td>'+
        '<td style="width: 33%;"><i class="fa fa-star-half-o"></i> Experience: <span class="orange">'+xp+'</span></td>'+
      '</tr>'+
  '</tbody>'+
'</table>'+
'</div>'+
'</div>'+
'</div>';
$('.xp').html(html);
}