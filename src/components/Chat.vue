<template>
    <div class="appContent pt-2">
        <a href="#" class="badge text-bg-primary" v-for="(user, index) in users" :key="index">{{ user.username }}</a>

        <div class="chatItem" v-for="(message, index) in messages" :key="index" :class="getClass(message.user)">
            <!-- <img src="/assets/img/sample/avatar6.jpg" alt="avatar" class="avatar"> -->
            <div class="content">
                <div class="bubble">
                    {{ message.message }}
                </div>
                <footer>{{ message.created_at }}</footer>
            </div>
        </div>

        

      

        <div class="chatFooter">
            <div class="leftButton">
                <button type="button" class="btn btn-secondary btn-icon">
                    <i class="icon ion-ios-camera"></i>
                </button>
            </div>
            <form class="formArea">
                <input type="text" class="form-control" v-model="message">
                <button type="button" class="btn btn-primary btn-icon" @click="sendMessage()">
                    <i class="icon ion-ios-send"></i>
                </button>
            </form>
        </div>

    </div>
</template>

<script >
import axios from "axios";
export default {

    data() {
        return {
            messages: [],
            chatSocket: null,
            message: null,
            users: [],
      
        };
    },

    methods: {
        getUsers() {
            const url = `http://localhost:8000/users/`;
            return axios.get(url).then((response) => {
                this.users = response.data;
            })
                .catch((error) => {
                    error;
                });
        },
        getChats() {
            const url = `http://localhost:8000/api/v1/chat/`;
            return axios.get(url).then((response) => {
                this.messages = response.data;
            })
                .catch((error) => {
                    error;
                });
        },

        createChat(chat) {
            const url = `${API_URL}chats/`;
            return axios.post(url, chat);
        },
        sendMessage() {
            this.data_message ={
                "message":this.message,
                "user":1
            }
            this.chatSocket.send(
                JSON.stringify(this.data_message)
            );
            this.messages.push(this.data_message);
            this.message = null;
        },
        getClass(userId) {
            return userId === 1 ? 'user' : '';
        }
    },
    mounted() {
        this.getUsers();
        this.getChats()
        this.chatSocket = new WebSocket(
            `ws://localhost:8000/ws/chat/new/`
        );
        this.chatSocket.onclose = e => {
            console.error("chat socket closed unexpectedly!");
        };
    },




}
</script>