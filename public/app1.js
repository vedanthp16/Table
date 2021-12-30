document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app(); 
    const db = firebase.firestore();
    const stdnt = db.collection('students');
    stdnt.onSnapshot(querySnapshot=>{
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
                                <td onclick="Showcourses('${id}')">${id}</td>  
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
                                                             <label for="name1">Name</label>
                                                             <br>
                                                             <input type="text" id="grade1" value="${dt.grade}">
                                                             <label for="grade1">Grade</label>
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

function Showcourses(Id){
     const db = firebase.firestore();
     db.collection('students').doc(Id).onSnapshot(doc =>{
        let table1 =document.getElementById('Course');
        table1.innerHTML=`<tr>
                            <th>Courses</th>
                          </tr>`;
        let dt = doc.data();
        console.log(dt.Courses)         
            
            let Courseid = doc.id;
            let len = dt['Courses'].length;
            console.log(len);
            for(let i=0;i<len;i++ ){
                        let row =    `<tr>
                            <td>${dt.Courses[i]}</td> 
                            <td><button onclick="DeleteC('${Courseid}','${i}')">Delete</button>
                            <td><button onclick="EditC('${Courseid}','${i}')">Edit</button>                           
                        </tr>`;
                        table1.innerHTML =table1.innerHTML+ row
            } 
            let cInput = document.getElementById('Coursemod');
            cInput.innerHTML=`<div>
                                <input type="text" id="Courseup" >
                                <label for="Courseup">Course</label>
                                <button onclick="UploadCourse('${Id}')">
                                 Enter
                                </button> 
                                </div>
                                <div id='editc'></div>`
           // document.getElementById('Coursemod').style.display="block";         
        })
    

}

function DeleteC(Id,x){
    const db = firebase.firestore();
    console.log(Id,x)
    db.collection('students').doc(Id).get()
        .then(doc=>{
            let dt=doc.data();
            db.collection('students').doc(Id).update({
                Courses : firebase.firestore.FieldValue.arrayRemove(dt.Courses[x])
            });
        });
    
}

function UploadCourse(Id){

    const db = firebase.firestore();
    const cs= document.getElementById('Courseup').value;
    db.collection('students').doc(Id).update({
        Courses: firebase.firestore.FieldValue.arrayUnion(cs)
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
                                                             <label for="name1">Name</label>
                                                             <br>
                                                             <input type="text" id="grade1" value="${dt.grade}">
                                                             <label for="grade1">Grade</label>
                                                             <button onclick="Edata('${ied}')">
                                                             Enter
                                                             </button> `;
         })    
}