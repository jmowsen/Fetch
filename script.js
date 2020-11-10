const fetchList = () => {
    // Fetch data records from url, then process and display list
    fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json').then(resp => {
        const data = resp.json();
        const processedData = processData(data);
        displayList(processedData);
    }).catch(err => console.error(err));
};

const processData = (data) => {
    // Filter out records without name
    const filteredData = data.filter(d => d.name);
    // Sort on listId, then on name
    const sortedData = filteredData.sort((a, b) => {
        const result = a.listId - b.listId;
        return (result === 0) ? a.name.substr(5) - b.name.substr(5) : result;
    });
    return sortedData;
};

const displayList = (list) => {
    list.forEach(li => {
        // Create list item with listId and name as text
        const listItem = document.createElement("LI"); 
        const textnode = document.createTextNode("listId: " + li.listId + ", name: " + li.name);  
        listItem.appendChild(textnode); 

        const list = document.getElementById(li.listId);
        if(!list) {
            // If listId changes, create the next list with new listId as element id
            const nextList = document.createElement("UL");
            nextList.setAttribute("id", li.listId);
            nextList.appendChild(listItem);
            document.getElementById('fetch-list').append(nextList);
        } else {
            // If same listId, append to same list
            list.append(listItem);
        }                         
    });
};

fetchList();