var pcap_dump = require("../pcap_dump"),
  should = require("should");

describe("pcap_dump", function() {
  beforeEach(function() {
    this.instance = pcap_dump.createPcapDumpSession();
  });

  describe("#start should take the default values ", function() {
    it("buffer size should be 10485760 ", function() {
      this.instance.start();
      should(this.instance.buffer_size).be.equal(10485760);
    });

    it("outfile should be tmp.pcap ", function() {
      this.instance.start();

      should(this.instance.outfile).be.equal("tmp.pcap");

    });

    it("number_of_packets_to_be_read should be 1", function() {
      this.instance.start();

      should(this.instance.number_of_packets_to_be_read).be.equal(1);

    });

    it("is_monitor should be false", function() {
      this.instance.start();

      should(this.instance.is_monitor).be.equal(false);

    });


  });


});