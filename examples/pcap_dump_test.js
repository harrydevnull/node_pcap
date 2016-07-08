


var pcap = require("../pcap"),

pcap_dump = new pcap.PcapDumpSession('en0', "ip proto \\tcp",10*1024*1024,"tmp91.pcap",false,5);

pcap_dump.on('pcap_write_complete_async',function(message){
        console.log("done.....",message);
});

//pcap_dump.start();
pcap_dump.startAsyncCapture();
