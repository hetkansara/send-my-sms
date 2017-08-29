
export default {
    selectAll: function (value){
        $('.'+value).prop('checked',$('#'+value).is(":checked"));
    },
    exportToExcel: function (element){
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById(element);
        var table_html = table_div.outerHTML.replace(/ /g, '%20');
    
        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Send_My_SMS_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
        a.click();
    },
    app_links: [{
        name: "Dashboard",
        path: "/#!/Dashboard"
    },{
        name: "Send SMS",
        path: "/#!/SendSMS"
    },{
        name: "Dynamic CSV Message",
        path: "/#!/DynamicMessage"
    }, {
        name: "Add Contacts",
        path: "/#!/AddContacts"
    }, {
        name: "Message History",
        path: "/#!/Messages"
    }, {
        name: "Profile",
        path: "/#!/Profile"
    }]
};