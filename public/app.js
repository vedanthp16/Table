document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app(); 
    const db = firebase.firestore();
    const stdnt = db.collection('students');
     db.collection("students").where("id", "==", "1")
    .get()
    .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                let data = doc.data();
                let row  = `<tr>
                                <td>${data.name}</td>
                                <td>${data.grade}</td>
                          </tr>`;
                let table = document.getElementById('myTable')
                table.innerHTML += row
            })
        })
        .catch(err=>{
            console.log(`Error: ${err}`)
        });

    

});


