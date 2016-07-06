


var pcap = require("../pcap"),

pcap_dump = new pcap.PcapDumpSession('en0', "ip proto \\tcp",10*1024*1024,"tmp61.pcap",false,5);

pcap_dump.on('pcap_write_complete',function(message){
        console.log("done.....",message);
});

pcap_dump.start();