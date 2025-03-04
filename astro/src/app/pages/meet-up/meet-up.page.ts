import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCheckbox,
  IonCol,
  IonContent, IonFab, IonFabButton,
  IonGrid,
  IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonList, IonModal,
  IonRow,
  IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {addDoc, arrayRemove, collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {environment} from "../../../environments/environment";
import {collectionGroup, deleteDoc, updateDoc} from "@angular/fire/firestore";
import {ToastService} from "../../services/toast.service";
import { Timestamp } from "firebase/firestore";
import firebase from "firebase/compat";
import { increment, arrayUnion } from "firebase/firestore";
import index from "eslint-plugin-jsdoc";

interface MeetUp {
  participants_count: number;
  participants: string[];
  userId: string;
}

@Component({
  selector: 'app-meet-up',
  templateUrl: './meet-up.page.html',
  styleUrls: ['./meet-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonModal, IonText, IonImg, IonCheckbox, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class MeetUpPage implements OnInit {

  public myMeetsBollean: boolean = false
  public allMeetsBollean: boolean = false
  @ViewChild(IonInfiniteScroll) infinite!:IonInfiniteScroll
  private readonly toast:ToastService = inject(ToastService)
  // Initialize Firebase
  app = initializeApp(environment.firebase);

  private auth = getAuth();
  currentUser: User | null = null;

// Initialize Cloud Firestore and get a reference to the service
  db = getFirestore();

  constructor() { }

  todos: any[] = [];
  visibleTodos: any[] = [];

  myMeet = {
    title: "",
    description: "",
    site: "",
    date: new Date(),
    hour: "",
    img: "",
    participants_count: 1,
    userId: ""
  };

  async ngOnInit() {

    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  //btn loads

  async btnLoadAllMeets() {

    if (!this.currentUser) return;
    console.log(this.currentUser.uid)

    this.infinite.disabled = false

    this.myMeetsBollean = false
    this.allMeetsBollean = true
    try {

      const todosRef = collectionGroup(this.db,"meets");
      const querySnapshot = await getDocs(todosRef);

      // const querySnapshot = await getDocs(collectionGroup(this.db, 'meets'));
      this.todos = [];
      this.visibleTodos = [];
      querySnapshot.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          //
          title: doc.data()['title'],
          description: doc.data()['description'],
          site: doc.data()['site'],
          date: doc.data()['date'],
          hour: doc.data()['hour'],
          img: doc.data()['img'],
          participants_count: doc.data()['participants_count'],
          participants: doc.data()['participants'] || [],
          userId: doc.data()['userId'],
          //
          // participants: doc.data()['participants'] || [],
          // userId: doc.ref.parent.parent?.id
        });
      });

      this.visibleTodos = this.todos.splice(0,6)

      console.log('muuuuaaaaa')
      this.toast.loadToast("Meet-ups cargados", 2000, 'success');
    } catch (e:any) {
      console.error("Error cargando meet-ups:", e);
      this.toast.loadToast("Error al cargar meet-ups", 2000, 'danger');
      console.log(e.message)
    }
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

    const todosRef = collection(this.db, "users", uid, "meets");
    const querySnapshot = await getDocs(todosRef);

    this.infinite.disabled = false

    this.todos = [];
    this.visibleTodos = [];

    querySnapshot.forEach((doc) => {
      this.todos.push({
        id: doc.id,
        title: doc.data()['title'],
        description: doc.data()['description'],
        site: doc.data()['site'],
        date: doc.data()['date'],
        hour: doc.data()['hour'],
        img: doc.data()['img'],
        participants_count: doc.data()['participants_count'],
        participants: doc.data()['participants'],
        userId: doc.data()['userId']
      });
    });

    this.visibleTodos = this.todos.splice(0,6)

  }

  //load logbooks////

//addtodo


  async addTodo() {
    if (!this.currentUser) return;


    if (this.myMeet.title == "" || this.myMeet.description == "" || this.myMeet.site == "" || this.myMeet.date == null || this.myMeet.hour == "" || this.myMeet.img == "" ){

      this.toast.loadToast('Empty required fields', 2000, 'danger')

    }else {

    this.infinite.disabled = false

    console.log(this.currentUser.uid)
    try {

      await addDoc(collection(this.db, "users", this.currentUser.uid, "meets"), {
        title: this.myMeet.title,
        description: this.myMeet.description,
        site: this.myMeet.site,
        date: this.myMeet.date,
        hour: this.myMeet.hour,
        img: this.myMeet.img,
        participants_count: 1,
        userId: this.currentUser.uid,
        participants: [this.currentUser.uid]
      });
      console.log(this.myMeet)
      this.myMeet.title = "",
        this.myMeet.description = "",
        this.myMeet.site = "",
        this.myMeet.date = new Date(),
        this.myMeet.hour = "",
        this.myMeet.img = "",
        // this.myMeet.participants_count = ""
        this.myMeet.participants_count = 1

      this.toast.loadToast("Tarea creada!", 2000, 'success');
      await this.loadTodoList(this.currentUser.uid);
    } catch (e: any) {
      console.error(e.message);
      this.toast.loadToast("Error al crear tarea", 2000, 'danger');
    }
    }
  }

  //////////add todoo /////////////

  //delete and update

  async updateTodo(todo: any) {
    if (!this.currentUser) return;

    if (todo.title == "" || todo.description == "" || todo.site == "" || todo.date == "" || todo.hour == "" || todo.img == ""){
      this.toast.loadToast('Empy required fields', 2000, 'danger')
    } else {



    this.infinite.disabled = false

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
      }, { merge: true });

      this.toast.loadToast("Tarea actualizada", 2000, 'success');
      await this.loadTodoList(this.currentUser.uid);
    } catch (e: any) {
      console.error("Error actualizando:", e.message);
      this.toast.loadToast("Error al actualizar", 2000, 'danger');
      }
    }
  }

  async delete(todoId: string) {
    if (!this.currentUser) return;
    console.log(todoId)
    try {
      const todoRef = doc(this.db, "users", this.currentUser.uid, "meets", todoId);
      await deleteDoc(todoRef);

      this.todos = this.todos.filter(log => log.id !== todoId);
      this.visibleTodos = this.visibleTodos.filter(log => log.id !== todoId);

      this.toast.loadToast("Tarea eliminada", 2000, 'success');
    } catch (e: any) {
      console.error("Error eliminando:", e);
      this.toast.loadToast("Error al eliminar", 2000, 'danger');
    }
  }

  async participar(all: any) {

    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });

    if (!this.currentUser) return;

    this.infinite.disabled = false

    if (this.currentUser.uid === all.userId) {
      this.toast.loadToast('Eres el creador, no puedes unirte', 2000, 'danger');
      return;
    }

    // 👇 Verificar si ya está unido (client-side)
    console.log(all.participants)
    if (all.participants?.includes(this.currentUser.uid)) {
      // this.toast.loadToast('Ya estás unido', 2000, 'warning');
      console.log('ya estas')
      this.salir(all)
      return;

    }else {

    try {
      const meetupRef = doc(this.db, "users", all.userId, "meets", all.id);
      console.log('1 mas')
      await updateDoc(meetupRef, {
        participants_count: increment(1),
        participants: arrayUnion(this.currentUser.uid)
      });

      const index = this.todos.findIndex(t => t.id === all.id);
      const index2 = this.visibleTodos.findIndex(t => t.id === all.id);

      if (index > -1) {
        this.todos[index].participants_count++;
        this.todos[index].participants = [...(this.todos[index].participants || []), this.currentUser.uid];
      }

      if (index2 > -1) {
        this.visibleTodos[index2].participants_count++;
        this.visibleTodos[index2].participants = [...(this.visibleTodos[index2].participants || []), this.currentUser.uid];
      }

      this.toast.loadToast("¡Te has unido!", 2000, 'success');
    } catch (e: any) {
      console.error("Error al unirse:", e);
      this.toast.loadToast("Error al unirse", 2000, 'danger');
      console.log(e.message)
    }
    }
  }

  //

  async salir(all: any) {
    if (!this.currentUser) return;

    try {
      const meetupRef = doc(this.db, "users", all.userId, "meets", all.id);

      await updateDoc(meetupRef, {
        participants_count: increment(-1),
        participants: arrayRemove(this.currentUser.uid)
      });

      const index = this.todos.findIndex(t => t.id === all.id);
      const index2 = this.visibleTodos.findIndex(t => t.id === all.id);

      if (index > -1) {
        this.todos[index].participants_count--;
        this.todos[index].participants = this.todos[index].participants
          .filter((uid: string) => uid !== this.currentUser?.uid);
      }

      if (index2 > -1) {
        this.visibleTodos[index2].participants_count--;
        this.visibleTodos[index2].participants = this.visibleTodos[index2].participants
          .filter((uid: string) => uid !== this.currentUser?.uid);
      }

      this.toast.loadToast("Has abandonado el meet-up", 2000, 'success');
    } catch (e: any) {
      console.error("Error al salir:", e);
      this.toast.loadToast("Error al salir", 2000, 'danger');
    }
  }

  loadData(event: any) {

    console.log('infinite meet')

    setTimeout(()=> {
      event.target.complete()
      if (this.todos.length <= 4){
        this.visibleTodos.push(...this.todos)
        event.target.disabled = true
      }else {
        this.visibleTodos.push(...this.todos.splice(0,4))
      }
    },1000)

  }
}
