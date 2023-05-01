<template>
    <div class="appContent pt-2">

        <div class="chatItem" v-for="(message, index) in messages" :key="index">
            <img src="/assets/img/sample/avatar6.jpg" alt="avatar" class="avatar">
            <div class="content">
                <div class="bubble">
                    {{ message }}
                </div>
                <footer>6 mins ago</footer>
            </div>
        </div>

        <div class="chatItem user">
            <div class="content">
                <div class="bubble">
                    Sure Will.
                </div>
            </div>
        </div>

        <div class="chatItem user">
            <div class="content">
                <div class="bubble">
                    About what?
                </div>
                <footer>5 mins ago</footer>
            </div>
        </div>

        <div class="chatItem">
            <img src="/assets/img/sample/avatar6.jpg" alt="avatar" class="avatar">
            <div class="content">
                <div class="bubble">
                    <img src="/assets/img/sample/photo3.jpg" alt="image" class="imageBlock xlarge rounded">
                </div>
                <footer>2 mins ago</footer>
            </div>
        </div>


        <div class="chatItem">
            <img src="/assets/img/sample/avatar6.jpg" alt="avatar" class="avatar">
            <div class="content">
                <div class="bubble">
                    Can you help me about photoshop?
                </div>
                <footer>1 mins ago</footer>
            </div>
        </div>

        <div class="chatItem user">
            <div class="content">
                <div class="bubble">
                    Lorem ipsum dolor sit amet
                </div>
                <footer>now</footer>
            </div>
        </div>

        <div class="chatItem">
            <img src="/assets/img/sample/avatar6.jpg" alt="avatar" class="avatar">
            <div class="content">
                <div class="bubble">
                    Phasellus maximus dui a turpis porta, maximus lobortis magna pellentesque. Vivamus et justo eget
                    augue pellentesque faucibus sed lacinia dui.
                </div>
                <footer>1 mins ago</footer>
            </div>
        </div>

        <div class="chatItem user">
            <div class="content">
                <div class="bubble">
                    Lorem ipsum dolor sit amet
                </div>
            </div>
        </div>

        <div class="chatItem user">
            <div class="content">
                <div class="bubble">
                    Nam auctor tellus a urna vestibulum molestie bibendum non neque.
                </div>
                <footer>now</footer>
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

export default {

    data() {
        return {
            messages: [],
            chatSocket: null,
            message: null,
        };
    },

    methods: {
        getChats() {
            const url = `${API_URL}chats/`;
            return axios.get(url).then(response => response.data);
        },

        createChat(chat) {
            const url = `${API_URL}chats/`;
            return axios.post(url, chat);
        },
        sendMessage() {
            this.chatSocket.send(
                JSON.stringify({
                    message: this.message
                })
            );
            this.message = null;
        }
    },
    mounted() {
        this.chatSocket = new WebSocket(
            `ws://localhost:8000/ws/chat/new/`
        );
        this.chatSocket.onmessage = e => {
            const data = JSON.parse(e.data);
            const message = data.message;
            console.log(message)
            this.messages.push(message);
        };

        this.chatSocket.onclose = e => {
            console.error("chat socket closed unexpectedly!");
        };
    },



}
</script>