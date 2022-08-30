import React, { useState, useEffect, useRef, createRef } from 'react';
import {alertActions} from '../../../../redux/actions';
import {postActions} from '../../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { weekdaysMin } from 'moment';

export default (props)=> {
    const [showMenu, setShowMenu] = useState(false)
    const [showInput, setShowInput] = useState(true)
    const [webSocket, reloadWebSocket] = useState(false)
    const[isHide, setIsHide] = useState(true);

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const content = useRef(null);
    const input = useRef(null);
    const ws = useRef(null);
    const menu = useRef(null);
    var myColor = false;

    
    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:2137');
        if(!ws){
            content.current.innerHTML = '<p>Sorry, but your browser doesn\'t support WebSocket.</p>';
            setShowInput(false)
            return;
        }
        ws.current.onopen = () => {
            console.log('ws opened');
            ws.current.send(user.userName);
            console.log(content)
            content.current.innerHTML = ""
        }

        ws.current.onclose = () => console.log('ws closed');
    
        ws.current.onmessage = (e) => {
            console.log("new msg")
        try {
            var json = JSON.parse(e.data);
            } catch (e) {
            console.log('Invalid JSON: ', e.data);
            return;
            }
            if (json.type === 'color') { 
            myColor = json.data;

            //input.removeAttr('disabled').focus();
            } else if (json.type === 'history') { 
                content.current.innerHTML = ""
            for (var i=0; i < json.data.length; i++)
            {
                var priv = 0 
                if(json.data[i].text.substring(0,4) == "!msg")
                {
                    let msg = json.data[i].text.split(" ");
                    if(msg[1] != user.userName && json.data[i].author != user.userName) return
                    json.data[i].text = json.data[i].text.substring(6+msg.length,json.data[i].text.length)
                    priv = msg[1] != user.userName ? msg[1] : 1
                }
                addMessage(json.data[i].author, json.data[i].text,json.data[i].color, new Date(json.data[i].time), priv);
            }
            
            } else if (json.type === 'message') {
                var priv = 0
                if(json.data.text.substring(0,4) == "!msg")
                {
                    let msg = json.data.text.split(" ");
                    if(msg[1] != user.userName && json.data.author != user.userName) return
                    json.data.text = json.data.text.substring(6+msg[1].length,json.data.text.length)
                    priv = msg[1] != user.userName ? msg[1] : 1
                }
                addMessage(json.data.author, json.data.text,json.data.color, new Date(json.data.time), priv);
            } else if (json.type === 'server') {
                dispatch(postActions.getPosts(user.id,props?.getPage||0))
            }
            else {
            console.log('JSON error: ', json);
            }
        };

        ws.current.onerror = () => ws.current.close()

        function addMessage(author, message, color, dt, msg) {
            if(color == "gold"){
                var server = message.substring(15,message.length).split(",")
                message = message.substring(0,15)
                server.forEach(element => { message+=('<a style="cursor:pointer" onClick={chatMsg("'+element+'")}>'+element+"</a> ")});
            }

            content.current.innerHTML = 
            ('<div class="d-flex justify-content-start mb-4"><div class="msg_cotainer" style="color: black; background:' + color + '">' + 
            
            (msg == 1 ? '<b style="color: gold">'+author+"</b> to You: " + message : msg == 0 ? message : 'You to <b style="color: gold">'+msg+"</b>: " + message)
            
            + '<span class="msg_time"><span class="text-dark"><b style="cursor:pointer" onClick={chatMsg("'+author+'")}>'+ author + "</b></span> "
            + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
            + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
            + '</span></div></div>')
            + content.current.innerHTML;

        }

        document.getElementById('type_msg_area').addEventListener('input', function(e){
            this.value = this.value.replace(/\n/g,'')
        });
        
        let interval = setInterval(() => {
            if (ws.current.readyState !== 1) {
              console.log("websocket disconnect")
              reloadWebSocket(!webSocket)
             // input.current.
            }
          }, 10000);

        return () => {clearInterval(interval); ws.current.close()}
    },[webSocket]);

    const handleKey = (e) => {
        if (ws.current && (e.keyCode === 13 || e === true)) {
            let msg = input.current.value
            if (msg && msg.replace( /[\r\n ]+/gm, "" ).length && ws.current)
            ws.current.send(msg);
            input.current.value = ''
        }
    }

    const menuClick = (e) => {
        setShowMenu(!showMenu)
    }

    const msgUndo = (e) => {
        if(ws)ws.current.send("!undo");
        setShowMenu(false)
    }

    const msgClear = (e) => {
        if(ws)ws.current.send("!cls");
        setShowMenu(false)
    }

    const msgUsers = (e) => {
        if(ws)ws.current.send("!users");
        setShowMenu(false)
    }

    return (
    <>
    <div className="webSocket" style={{zIndex: isHide === true ? "0" : "1" }}>
        <div style={{opacity: isHide === false ? "0" : "100%" }} className="btn-chat-cont"><button onClick={()=>setIsHide(false)} type="button" className="btn btn-chat btn-primary btn-lg p-3"><i className="far fa-comments fa-2x"></i></button></div>
        <div className="webSocketSecond" style={{transition: "all 0ms",float: "right" ,width: isHide === true ? "0" : "100%",opacity: isHide === true ? "0" : "1" }}>
            <div className="card chatCard ml-lg-0 mr-lg-0 mb-lg-0 overflow-auto mb-4 mr-4 ml-4" >
                <div className="card-header msg_head">
                    <div className="d-flex bd-highlight Montserrat text-white">
                        WierzbaChat
                    </div>
                    <span id="action_menu_btn" >
                        <i className="fas fa-arrow-right m-3 btn-chat-hide" onClick={()=>setIsHide(true)}></i>
                        <i className="fas fa-ellipsis-v m-2"onClick={menuClick}></i>
                    </span>
                    { showMenu && <div className="action_menu">
                        <ul>
                            <li onClick={msgUsers}><i className="fas fa-users"></i> All Users</li>
                            <li onClick={msgUndo}><i className="fas fa-minus"></i> Delete last</li>
                            <li onClick={msgClear}><i className="fas fa-ban"></i> Delete all</li>
                        </ul>
                    </div>}
                </div>

                <div className="card-body msg_card_body " ref={content}>Connecting...</div>

                <div className="card-footer">
                    <div className="input-group">
                        <textarea id="type_msg_area" style={{overflow: "hidden"}}type="text" onKeyDown={handleKey} ref={input} className="form-control type_msg" placeholder="Type your message..."></textarea>
                        <div className="input-group-append" onClick={()=>handleKey(true)}>
                            <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>)

}