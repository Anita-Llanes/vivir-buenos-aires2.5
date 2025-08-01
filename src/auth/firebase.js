import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7YuoXGPepiLf-XdBKPWvWJlzLEmtpRl0",
  authDomain: "vivir-buenos-aires-88426.firebaseapp.com",
  projectId: "vivir-buenos-aires-88426",
  storageBucket: "vivir-buenos-aires-88426.firebasestorage.app",
  messagingSenderId: "499904911761",
  appId: "1:499904911761:web:d95fcdbc788afa091a2230"
};

const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )
}

auth.useDeviceLanguage()
export function logearG(){
    return(
        new Promise((res, rej) => {
            signInWithPopup(auth, provider)
            .then((result) => {
                console.log("test", result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log("credenciales G", credential)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User", user)
                res(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log("test error", error )
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                rej()
                // ...
            });   
        })
    )

}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}
/////////////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE  //////// ////////
////////////////////////////////////////////////////////////////

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export function crearTour(tour) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "tours"), {
            nombre: tour.nombre,
            imagen: tour.imagen,
            precio: tour.precio,
            descripcion: tour.descripcion
        });

        console.log("Document written with ID: ", docRef.id);
        res(docRef)

        } catch (e) {
        console.error("Error adding document: ", e);
        rej(e)
        }
    });
}

export function editarTourFirebase(tour){
    return(
        new Promise(async (res, rej) => {
            try{
                await setDoc(doc(db, "tours", tour.id), {
                    nombre: tour.nombre,
                    imagen: tour.imagen,
                    precio: tour.precio,
                    descripcion: tour.descripcion
                })
                console.log("Document written ");
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }
        })
    )
}

export function eliminarTourF(id){
    return(
        new Promise(async(res, rej) => {
            try{
                await deleteDoc(doc(db, "tours", id))
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }

        })
    )
}

export function obtenerToursF() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "tours"));
                    console.log(querySnapshot, "respuesta al getDocs")
                    
                    const resultados = querySnapshot.docs.map(doc => {
                        console.log(doc, "documento sin ejecutar metodo .data()")
                        const data = doc.data();
                        console.log(data, "doc con data extraida")
                        return {
                            id: doc.id,
                            nombre: data.nombre,
                            imagen: data.imagen,
                            precio: data.precio,
                            descripcion: data.descripcion
                        };
                    });

                    res (resultados);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

export function obtenerTourEnFirebase(id) {
    return(
        new Promise(async (res, rej) => {
                try {
                    const docRef = doc(db, "tours", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        const data = docSnap.data();
                        const tour = {
                            id: docSnap.id,
                            nombre: data.nombre,
                            imagen: data.imagen,
                            precio: data.precio,
                            descripcion: data.descripcion
                        }
                        console.log(tour)
                        res(tour)
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                        rej("No such document!")
                    }
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

/*crearTour("test", "url", 23, "klasjdklsajdsaldkklasdljka").then(() => {
    console.log("si")
}).catch((error) => {
    console.log(error)
})*/

/*obtenerTours().then((prod) => {
    console.log(prod)
}).catch((error) => {
    console.log(error)
})*/