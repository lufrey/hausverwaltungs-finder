(function() {
    const scriptNode = document.currentScript;
    const sendToRoot = new URL(scriptNode.src).origin;
    
    function send() {
      navigator.sendBeacon(sendToRoot + '/stats/collect/', JSON.stringify(packData()));
    }
  
    function convertRounded(keys, entry) {
      return keys.map(key => Math.round(entry[key] || 0));
    }
    function convertNumberAsIs(keys, entry) {
      return keys.map(key => entry[key] || 0);
    }
    function convertStringAsIs(keys, entry) {
      return keys.map(key => entry[key] || '');
    }
  
    /**
     * @return {function(*): any[]}
     */
    function packEntry(props) {
      return function(entry) {
        const numbers = convertRounded(props.toBeRounded, entry);
        numbers.push(...convertNumberAsIs(props.numberAsIs, entry));
        const data = [numbers.map(value => value === 0 ? '' : value).join(',')];
        data.push(...convertStringAsIs(props.stringAsIs, entry));
        return data;
      }
    }
    
    /**
     * @return {[{domain: string}, ...Array<any[]>]}
     */
    function packData() {
      const metadata = {
        domain: scriptNode.getAttribute('data-domain'),
        protocolVersion,
      };
      const data = [packEntry(metadataProps)(metadata)]; // This could be simpler, but to keep using the pattern as below we do it like this.
      data.push(...(performance.getEntriesByType('navigation').map(packEntry(navigationProps))));
      data.push(...(performance.getEntriesByType('resource').map(packEntry(resourceProps))));
      return data;
    }
  
    // The lines below are being read by python, so they need to be in a specific format!
    // START
    const protocolVersion = 4; // This is the version of the protocol, if we change the format of the data we send, we increase this number to detect that the data is in a different format.
    // Make sure the lines below are proper JSON after the =, and only on one line! We read it from python and expect it to be real JSON!!!!
    const metadataProps = {"toBeRounded":[],"numberAsIs":["protocolVersion"],"stringAsIs":["domain"]};
    const navigationProps = {"toBeRounded":["startTime","duration","responseEnd"],"numberAsIs":["responseStatus","transferSize","decodedBodySize"],"stringAsIs":["name","entryType","deliveryType"]};
    const resourceProps = {"toBeRounded":["startTime","duration","responseEnd","responseStart"],"numberAsIs":["responseStatus","transferSize","decodedBodySize"],"stringAsIs":["contentType","entryType","initiatorType","name","deliveryType"]};
    // END
    
    window.addEventListener('beforeunload', send);
  
    // Hook into history API to detect SPA navigations
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = function() {
        originalPushState.apply(this, arguments);
        send();
      }
      window.addEventListener('popstate', send)
    }
  })();