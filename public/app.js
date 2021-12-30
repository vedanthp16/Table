document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app(); 
    const db = firebase.firestore();
    const stdnt = db.collection('students');
     db.collection("students").onSnapshot(querySnapshot=>{
        let table = document.getElementById('myTable')    
        table.innerHTML=`<tr>
                           <th>DocId</th>
                           <th>Name</th>
                           <th>Grade</th>
                         </tr>`;
            querySnapshot.forEach(doc=>{
                let data = doc.data();
                let id = doc.id;
                let row  = `<tr>
                                <td onclick="Showcol('${id}')">${id}</td>  
                                <td>${data.name}</td>
                                <td>${data.grade}</td>
                                <td><button onclick="Deletedata('${id}')">Delete</button>
                                <td><button onclick="Editdata('${id}')">Edit</button>
                          </tr>`;
                
                table.innerHTML =table.innerHTML+ row
            })
        });

    

});

function Uploadata(){

    const db = firebase.firestore();
    db.collection('students').add({
        name: document.getElementById('name').value,
        grade: document.getElementById('grade').value
    });
   
}

function Editdata(qwe){
    const db= firebase.firestore();
    db.collection("students").doc(qwe).get()
       .then(doc=>{
                let dt= doc.data();
                let ied=doc.id;
            console.log(dt)    
document.getElementById('edit').innerHTML = `<input type="text" id="name1" value="${dt.name}" >
                                             <label for="name">Name</label>
                                             <br>
                                             <input type="text" id="grade1" value="${dt.grade}">
                                             <label for="grade">Grade</label>
                                             <button onclick="Edata('${ied}')">
                                             Enter
                                             </button> `;
                    })    
        }

function Edata(abc){

    const db = firebase.firestore();
    db.collection('students').doc(abc).update({
        name: document.getElementById('name1').value,
        grade: document.getElementById('grade1').value
        
    });
    const x = document.getElementById('edit');
    x.style.display = "none";
}

function Deletedata(Id){

    const db = firebase.firestore();
    db.collection('students').doc(Id).delete();
}

function Showcol(Idd){
    const db = firebase.firestore();
    db.collection("students").doc(Idd).collection('Books').onSnapshot(querySnapshot=>{
        let table1 = document.getElementById('table2')    
        table1.innerHTML=`<tr>
                           <th>Book Name</th>
                           <th>Author</th>
                         </tr>`;
            querySnapshot.forEach(doc=>{
                let dataa = doc.data();
                let cid = doc.id;
                let row  = `<tr>
                                <td>${dataa.BName}</td>
                                <td>${dataa.Author}</td>
                                <td><button onclick="Deletedata1('${cid}')">Delete</button>
                                <td><button onclick="Editdata1('${cid}')">Edit</button>
                          </tr>`;
                
                table1.innerHTML =table1.innerHTML+ row
            })
        });

}

function Uploadata1(){

    const db = firebase.firestore();
    const st = db.collection('students').doc('6fIuDsfACUfYanOiMTJw').collection('Books').add({
        BName: document.getElementById('bname').value,
        Author: document.getElementById('author').value
    });
}
function Editdata1(qwe){
    const db= firebase.firestore();
    db.collection("students").doc('6fIuDsfACUfYanOiMTJw').collection('Books').doc(qwe).get()
       .then(doc=>{
                let dt= doc.data();
                let ied=doc.id;
            console.log(dt)    
document.getElementById('edit1').innerHTML = `<input type="text" id="name2" value="${dt.BName}" >
                                                <label for="name2">Book Name</label>
                                                <br>
                                                <input type="text" id="grade2" value="${dt.Author}">
                                                <label for="grade2">Author</label>
                                                <button onclick="Edata1('${ied}')">
                                                Enter
                                                </button> `;
                 })    
        }

function Edata1(abc){

    const db = firebase.firestore();
    db.collection('students').doc('6fIuDsfACUfYanOiMTJw').collection('Books').doc(abc).update({
        BName: document.getElementById('name2').value,
        Author: document.getElementById('grade2').value
        
    });
    const x = document.getElementById('edit1');
    x.style.display = "none";
}

function Deletedata1(Id){

    const db = firebase.firestore();
    db.collection('students').doc('6fIuDsfACUfYanOiMTJw').collection('Books').doc(Id).delete();
}