/* Keeps content closed until the activities placed before it on the page are done.
   What opened stays open while the session is loaded; nothing is saved, so reloading closes it again. */
(function (OVA) {
  "use strict";

  function create() {
    var opened = {};
    var page = { holds: [], waiters: [] };

    function settle(current) {
      current.waiters = current.waiters.filter(function (waiter) {
        var ready = waiter.holds.every(function (hold) { return hold.released; });
        if (ready) {
          waiter.open();
          opened[current.id] = true;
        }
        return !ready;
      });
    }

    return {
      /* Starts a page. With alwaysOpen (teacher mode) nothing is held. */
      begin: function (id, alwaysOpen) {
        page = { id: id, holds: [], waiters: [], open: alwaysOpen || opened[id] === true };
      },
      /* An activity announces itself and gets back the function to call when it is done. */
      hold: function () {
        var current = page;
        var hold = { released: false };
        current.holds.push(hold);
        return function () {
          hold.released = true;
          settle(current);
        };
      },
      /* Waits only for the activities that already exist, that is, the ones above on the page. */
      whenOpen: function (open) {
        var pending = page.holds.filter(function (hold) { return !hold.released; });
        if (page.open || !pending.length) {
          open();
          return true;
        }
        page.waiters.push({ holds: pending, open: open });
        return false;
      }
    };
  }

  OVA.gate = { create: create };
})(window.OVA);
