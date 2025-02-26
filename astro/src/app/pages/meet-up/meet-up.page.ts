import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader,
  IonCol,
  IonContent, IonFab, IonFabButton,
  IonGrid,
  IonHeader, IonIcon, IonImg, IonInput, IonItem, IonList, IonModal,
  IonRow,
  IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {addDoc, collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {environment} from "../../../environments/environment";
import {deleteDoc} from "@angular/fire/firestore";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-meet-up',
  templateUrl: './meet-up.page.html',
  styleUrls: ['./meet-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonModal, IonText, IonImg]
})
export class MeetUpPage implements OnInit {

  public myMeetsBollean: boolean = false
  public allMeetsBollean: boolean = false

  private readonly toast:ToastService = inject(ToastService)
  // Initialize Firebase
  app = initializeApp(environment.firebase);

  private auth = getAuth();
  currentUser: User | null = null;

// Initialize Cloud Firestore and get a reference to the service
  db = getFirestore();

  constructor() { }

  todos: any[] = [];

  myMeet = {
    title: "",
    description: "",
    site: "",
    date: new Date(),
    hour: "",
    img: "",
    participants_count: 1,
  };

  async ngOnInit() {


  }

  //btn loads

  async btnLoadAllMeets() {

  }

  async btnLoadMyMeets() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.allMeetsBollean = false
        this.myMeetsBollean = true
        console.log('my meets')
        this.currentUser = user;
        // await this.loadUserProfile(user.uid);
        await this.loadTodoList(user.uid)
      } else {
      }
    });
  }

  //btn loads

  //load logbooks////

  private async loadTodoList(uid: string) {
    // Referencia a la subcolección 'todos' del usuario
    const todosRef = collection(this.db, "users", uid, "meets");
    const querySnapshot = await getDocs(todosRef);

    this.todos = []; // Limpiar array antes de cargar
    querySnapshot.forEach((doc) => {
      this.todos.push({
        id: doc.id, // 🔥 ¡Este es el ID del documento en Firestore!
        title: doc.data()['title'],
        description: doc.data()['description'],
        site: doc.data()['site'],
        date: doc.data()['date'],
        hour: doc.data()['hour'],
        img: doc.data()['img'],
        participants_count: doc.data()['participants_count'],
      });
    });
  }

  //load logbooks////

//addtodo


  async addTodo() {
    if (!this.currentUser) return;

    try {
      // Añadir nueva tarea a la subcolección
      await addDoc(collection(this.db, "users", this.currentUser.uid, "meets"), {
        title: this.myMeet.title,
        description: this.myMeet.description,
        site: this.myMeet.site,
        date: this.myMeet.date,
        hour: this.myMeet.hour,
        img: this.myMeet.img,
        participants_count: 1
      });
      console.log(this.myMeet)
      this.myMeet.title = "",
        this.myMeet.description = "",
        this.myMeet.site = "",
        this.myMeet.date = new Date(),
        this.myMeet.hour = "",
        this.myMeet.img = "",
        // this.myMeet.participants_count = ""

      this.toast.loadToast("Tarea creada!", 2000, 'success');
      await this.loadTodoList(this.currentUser.uid); // Recargar lista
    } catch (e: any) {
      console.error(e.message);
      this.toast.loadToast("Error al crear tarea", 2000, 'danger');
    }
  }

  //////////add todoo /////////////


  //delete and update

  async updateTodo(todo: any) {
    if (!this.currentUser) return;

    try {
      const todoRef = doc(this.db, "users", this.currentUser.uid, "meets", todo.id);
      await setDoc(todoRef, {
        title: todo.title,
        description: todo.description,
        site: todo.site,
        date: todo.date,
        hour: todo.hour,
        img: todo.img,
        participants_count: todo.participants_count,
      }, { merge: true }); // Usar merge para actualizar parcialmente

      this.toast.loadToast("Tarea actualizada", 2000, 'success');
      await this.loadTodoList(this.currentUser.uid); // Recargar lista
    } catch (e: any) {
      console.error("Error actualizando:", e.message);
      this.toast.loadToast("Error al actualizar", 2000, 'danger');
    }
  }

  async delete(todoId: string) {
    if (!this.currentUser) return;
    console.log(todoId)
    try {
      const todoRef = doc(this.db, "users", this.currentUser.uid, "meets", todoId);
      await deleteDoc(todoRef);

      // Actualizar la lista sin recargar desde Firestore (más eficiente)
      this.todos = this.todos.filter(log => log.id !== todoId);

      this.toast.loadToast("Tarea eliminada", 2000, 'success');
    } catch (e: any) {
      console.error("Error eliminando:", e);
      this.toast.loadToast("Error al eliminar", 2000, 'danger');
    }
  }


}
