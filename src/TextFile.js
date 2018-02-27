export default function getAsText(fileToRead) {
    // const reader = new FileReader();
    // // Read file into memory as UTF-8
    //
    // return new Promise((resolve, reject) => {
    //     reader.readAsText(fileToRead, "UTF-8");
    //     // Handle errors load
    //     reader.onload = (event) => {
    //         let txt = event.target.result;
    //         resolve(txt);
    //     };
    //     reader.onerror = (event) => {
    //         reject(new Error(event.target.error))
    //     }
    // });

    let rfd = new Request(fileToRead);
    return new Promise((resolve, reject) => {

        fetch(rfd).then((response) => {
            return response.text().then(
                (text) => resolve(text)
            )
        }).catch(err=>reject(err))

    });




}


//
// function processData(csv) {
//     const allTextLines = csv.split(/\r\n|\n/);
//     const lines = [];
//     for (let i=0; i<allTextLines.length; i++) {
//         let data = allTextLines[i].split(';');
//         let tarr = [];
//         for (let j=0; j<data.length; j++) {
//             tarr.push(data[j]);
//         }
//         lines.push(tarr);
//     }
//     console.log(lines);
// }
//
// function errorHandler(evt) {
//     if(evt.target.error.name == "NotReadableError") {
//         alert("Canno't read file !");
//     }
// }