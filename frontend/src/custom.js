const socket = io()

let userName,
sendMessage,
appendMsg

let TextArea = document.querySelector('.chat-input');
let ChatArea = document.querySelector('.chat-messages');
let SendBtn =  document.querySelector('.message-send');
do {
    userName = prompt('what is your name');
}
while (!userName);

TextArea.addEventListener('keyup' ,(e)=>{
    e.key =='Enter' &&
    sendMessage(e.target.value);
})
SendBtn.addEventListener('click',()=>{
    sendMessage(TextArea.value);
})

sendMessage = (_msg) => {
    let msg = {
        name:userName,
        message: _msg.trim()
    }
    appendMsg(msg , 'outgoing')
    socket.emit('message' , msg);
    TextArea.value = '';
}

appendMsg =(msg,type) =>{
    let msgBoxHolder = document.createElement('div');
        msgBoxHolder.classList.add('message-box-holder');

    let Msgwrapper1 =`<div class="message-box">
                        ${msg.message}
                    </div>
                    ` ;

    let Msgwrapper2 = `<div class="message-sender">
                    ${msg.name}
                   </div>
                   <div class="message-box message-partner">
                   ${msg.message}
                   </div>`;
                 
    
    let finalMsg= type && type =='outgoing' ? Msgwrapper1 : Msgwrapper2;
    msgBoxHolder.innerHTML=finalMsg;
    msg.message.length &&
    ChatArea.appendChild(msgBoxHolder);
    ChatArea.scroll('top',TextArea.offsetTop);
    
}

socket.on('message',(msg) =>{
    appendMsg(msg , 'incoming')
})