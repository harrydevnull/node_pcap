var
  rewire = require("rewire"),
  pcap_dump = rewire("../pcap_dump"),
  should = require("should"),
  sinon = require("sinon");

describe("pcap_dump", function() {
  beforeEach(function() {
    var pcapServiceMock = {

      default_device: function() {
        return "en0";
      },
      PcapSession: function() {
        return mysessionObject;
      },
      findalldevs: function() {
        return ["en0", "eth0"];
      }
    };
    var mysessionObject = {
      /* jshint ignore:start */
      open_live: function(device_name, filter, buffer_size, outfile, packet_ready, is_monitor) {
        return "LINKTYPE_ETHERNET";
      },
      open_offline: function(device_name, filter, buffer_size, outfile, packet_ready, is_monitor) {

        return "LINKTYPE_ETHERNET";
      },

      fileno: function() {
        return "123";
      },
      create_pcapDump: function(device_name, filter, buffer_size, outfile, packet_ready, is_monitor, number_of_packets_to_be_read) {
        return "LINKTYPE_ETHERNET";
      },
      stats: function() {

      },
      close: function() {

      }
        /* jshint ignore:end */
    };
    pcap_dump.__set__({
      "binding": pcapServiceMock

    });


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

    it("calls create_pcapDump when we start", function() {
      var mock = sinon.mock(this.instance.session);
      mock.expects("create_pcapDump").returns(true);
      this.instance.start();
      mock.verify();
      mock.restore();

    });

    it("calls sesssion.close on calling close", function() {
      var mock = sinon.mock(this.instance.session);
      mock.expects("close").returns(true);
      this.instance.close();
      mock.verify();
      mock.restore();

    });

    it("calls sesssion.stats on calling stats", function() {
      var mock = sinon.mock(this.instance.session);
      mock.expects("stats").returns(true);
      this.instance.stats();
      mock.verify();
      mock.restore();

    });


  });



});