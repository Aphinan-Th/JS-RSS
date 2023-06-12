function fetchRSS(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(`Failed to fetch RSS: ${xhr.status}`));
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    });
  }
  
  function parseRSS(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
  
    const result = [];
    for (let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName('title')[0].textContent;
      const link = items[i].getElementsByTagName('link')[0].textContent;
      const description = items[i].getElementsByTagName('description')[0].textContent;
  
      result.push({ title, link, description });
    }
  
    return result;
  }
  
  // Example usage
  const rssUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
  
  fetchRSS(rssUrl)
    .then(xml => {
      const items = parseRSS(xml);
      console.log(items);
      // Do something with the parsed RSS items
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  