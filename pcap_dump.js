var util = require("util");
var events = require("events");
var binding = require("./build/Release/pcap_binding");


function PcapDumpSession(device_name, filter, buffer_size, outfile, is_monitor, number_of_packets_to_be_read) {
    
    this.device_name = device_name;
    this.filter = filter || "";
    this.buffer_size = buffer_size;
    this.outfile = outfile || "tmp.pcap";
    this.is_monitor = Boolean(is_monitor);
    this.opened = null;
    this.packets_read = 0;
    this.number_of_packets_to_be_read = number_of_packets_to_be_read || 1;
    this.session = new binding.PcapSession();

    if (typeof this.buffer_size === "number" && !isNaN(this.buffer_size)) {
        this.buffer_size = Math.round(this.buffer_size);
    } else {
        this.buffer_size = 10 * 1024 * 1024; // Default buffer size is 10MB
    }

    this.device_name = this.device_name || binding.default_device();
    events.EventEmitter.call(this);
}

util.inherits(PcapDumpSession, events.EventEmitter);

exports.lib_version = binding.lib_version();

exports.findalldevs = function() {
    return binding.findalldevs();
};

PcapDumpSession.prototype.start = function() {
    
    this.opened = true;
    this.session.create_pcapDump(this.device_name, this.filter, this.buffer_size, this.outfile, PcapDumpSession.prototype.on_pcap_write_complete.bind(this), this.is_monitor, this.number_of_packets_to_be_read);
};

PcapDumpSession.prototype.close = function() {
    this.opened = false;
    this.session.close();
};

PcapDumpSession.prototype.stats = function() {
    return this.session.stats();
};


PcapDumpSession.prototype.on_pcap_write_complete = function() {
    this.packets_read = this.packets_read + 1;
    if (this.packets_read >= this.number_of_packets_to_be_read) {
        this.emit("pcap_write_complete",{
            "packets_read":this.packets_read ,
            "fileName":this.outfile
        });
    }

};


exports.PcapDumpSession = PcapDumpSession;


exports.createPcapDumpSession = function(device, filter, buffer_size, path, monitor, number_of_packets) {
    return new PcapDumpSession(device, filter, buffer_size, path, monitor, number_of_packets);
};